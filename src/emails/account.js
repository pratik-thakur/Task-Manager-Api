const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'pratikthakur421@gmail.com',
        subject:'Thanks for joining in!',
        text:`Welcome to the app, ${name} . Let me know how you get along with the app.`
    }).then()
    .catch(e=>console.log(e))
}

const sendCancelationEmail =(email,name)=>{
    sgMail.send({
        to:email,
        from:'pratikthakur421@gmail.com',
        subject:'Sorry to see you go!',
        text:`Goodbye, ${name} . I hope to see you back Sometime soon.`
    }).then()
    .catch(e=>console.log(e))

}

module.exports={
    sendWelcomeEmail,
    sendCancelationEmail
}
