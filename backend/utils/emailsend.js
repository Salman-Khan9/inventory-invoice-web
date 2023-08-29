const nodemailer = require("nodemailer")

const sendMail = async(sent_from,send_to,message,subject,reply_to)=>{
   console.log(sent_from,send_to,message,subject)
try {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        secureConnection: false,
        port:587,
        auth: {
            user : 'fsdsalman12.sk@gmail.com',
            pass : "ieliixvaslogqpah"
        },
       tls:{
        rejectUnauthorized: false
       }
    })
    const options = {
     from:sent_from,
     to:send_to,
     html:message,
     subject:subject,
     reply:reply_to
     
    }
    
   await transporter.sendMail(options,function (err,info){
        if(err){
            console.log('error sending email: ' + err);
        }else{
            console.log('email sent' + info.response);

        }
    
    })

} catch (error) {
    console.log(error)
}
}
module.exports = sendMail