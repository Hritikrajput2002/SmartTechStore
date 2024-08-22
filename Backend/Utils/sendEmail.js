require('dotenv').config({path:'./Config/.env'});
const nodemailer=require('nodemailer');



const sendEmail=async(object)=>{
   
    const transporter=nodemailer.createTransport({
         service:process.env.SMTP_Service,
         port:465,
         host:"smtp.gmail.com",
         secure:true,
         auth:{
            user:process.env.SMTP_Mail,
            pass:process.env.SMTP_Password
         }
    })

    const mailObject={
        from:process.env.SMTP_Mail,
        to:object.email,
        subject:object.subject,
        text:object.message
    }

        await transporter.sendMail(mailObject);   

}
module.exports=sendEmail;