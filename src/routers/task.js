const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')
//create a task
router.post('/task',auth,async(req,res)=>{
   // const task = new Task(req.body)
   const task = new Task({
       ...req.body,
       owner:req.user._id
   })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send()
    }

    // task.save().then(()=>res.status(201).send(task))
    // .catch((e)=>{res.status(400).send(e)})
})

//read all task
//GET /task?complted=true
//GET/task?limit=10&skip=20
//Get/tasks?sortBy=cretedAt_asc
router.get('/task',auth,async(req,res)=>{
    const match ={ }
    const sort={}
    if(req.query.completed){
        match.completed = req.query.completed==='true'
    }

    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1:1
    }

    try{
       // const tasks=await Task.find({owner:req.user._id})
       await req.user.populate({
           path:'tasks',
           match,
           options:{
              limit:parseInt(req.query.limit),
              skip:parseInt(req.query.skip),
              sort

           }
    }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})

// read task by id
router.get('/task/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
       //const task = await Task.findById(_id)
       const task = await Task.findOne({_id,owner:req.user._id})

       if(!task)
       return res.status(404).send()
       res.send(task)

    }catch(e){
        res.status(500).send()
    }
})

router.patch('/task/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates =['description','completed']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation)
    return res.status(400).send({error:'Invalid Updates!'})
    try{
        const task = await Task.findOne({ _id:req.params.id ,owner:req.user._id})
        //const task = await Task.findById(req.params.id)
        //const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach(update=>task[update]=req.body[update])
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)

    }
})

router.delete('/task/:id',auth,async(req,res)=>{
    try{
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id:req.params.id , owner:req.user._id})
        if(!task)
        return res.status(404).send()
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router