const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

//express middleware
// app.use((req,res,next)=>{
//     if(req.method === 'GET')
//     {
//         res.send('get request disabled')
//     }else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Site is currently down')
// })


// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         //if(!file.originalname.endsWith('.pdf'))
//         //below is the reguar expression inside match its a complete different topic used for string matching by google and most of the fasmous code editors and many more
//         if(!file.originalname.match(/\.(doc|docx)$/))
//         {
//             return cb(new Error('Please upload a word document'))
//         }
//         // cb(new Error('file must be a pdf'))
//         cb(undefined,true)
//         // cb(undefined,false)
//     }
// })

// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

// const bcrypt = require('bcryptjs')
// const myFunction = async ()=>{
//     const password = 'red1234'
//     const hashedPassword = await bcrypt.hash(password,8)
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('re1234',hashedPassword)
//     console.log(isMatch)
// }

//myFunction()

// const jwt = require('jsonwebtoken')
// const myFunction = async()=>{
//     const token = jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'1 second'})
//     console.log(token)
//     const data=jwt.verify(token,'thisismynewcourse')
//     console.log(data)
// }
// myFunction()

// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async ()=>{
//     // const task = await Task.findById('600fd56e2697ab2138d1011c')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     const user = await User.findById('600fd4ab8766ee3a3cb48ba5')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()

