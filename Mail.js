const express=require('express');
const app=express();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv').parse;


// Function to read HTML template and replace placeholders with data
// function generateEmailContent(userName, buttonLink) {
//     const emailTemplatePath = path.join(__dirname,'./client.html');
//     let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');

//     // Replace placeholders with dynamic data
//     emailTemplate = emailTemplate.replace('{{ userName }}', userName);
//     emailTemplate = emailTemplate.replace('{{ buttonLink }}', buttonLink);

//     return emailTemplate; 
// }

// // Example dynamic data (replace with your actual data)
// const userName = 'Rahul Sharma Sab Ki Gand Main Warma';
// const buttonLink = 'https://hdhub4u.boston/';

// // Create a transporter using SMTP transport
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'rahul658541@gmail.com', // Your email address
//         pass: 'idfskxacuqckqulw' // Your email password (for Gmail, you may need an app-specific password)
//     }
// });

// // Generate dynamic email content
// const emailContent = generateEmailContent(userName, buttonLink);

// // Email content with headers, footers, and buttons
// let mailOptions = {
//     from: 'your_email@gmail.com',
//     to: 'recipient_email@example.com',
//     subject: 'Dynamic Email with Nodemailer',
//     html: emailContent // Use the dynamically generated HTML content
// };

// Send email
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.error('Error sending email:', error);
//     } else {
//         console.log('Email sent:', info.response);
//     } 
// });



// Example JSON data
const jsonData = [
  { name: 'John Doe', age: 30, city: 'New York' },
  { name: 'Jane Smith', age: 25, city: 'San Francisco' },
  { name: 'Tom Jones', age: 40, city: 'Seattle' }
];

// Convert JSON to CSV
const csv = json2csv(jsonData);

// Save CSV to a file and trigger download
fs.writeFile('data.csv', csv, (err) => {
  if (err) throw err;
  console.log('CSV file saved.');

  // Trigger download
  const filePath = `${__dirname}/data.csv`;
  const fileName = 'data.csv';
  
  // Example of sending the file as response in a HTTP request
  app.get('/download',(req,res)=>{
    res.download(filePath, fileName, (err) => {
        if (err) {
          console.error('Error downloading file:', err);
        } else {
          console.log('File downloaded successfully.');
        }
      });
  })
 
});


app.listen(4000,()=>{
    console.log("Server Start 4000 Port No")
})