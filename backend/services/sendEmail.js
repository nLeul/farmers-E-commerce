const nodemailer = require('nodemailer');
exports.sendEmailToCustomer = (customerEmail,pickup_date) => {     // email to customer 
    let mailOptions = {
        from: process.env.EMAIL,
        to: customerEmail,
        subject: "Confirmation Number",
        text: `Dear Customer,your order by ${customerEmail} is ready at ${pickup_date} `
    }

    // console.log(mailOptions);

    let transporter = nodemailer.createTransport({
        service:  process.env.EMAIL_SERVICE,
        auth:{
            user:process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    transporter.sendMail(mailOptions,function(error,info){
        // console.log(mailOptions);
        if(e){
            console.log(error);
        }else{
            console.log("email sent: "+info.response);
        }
  });
}