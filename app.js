const express = require('express');
const app = express();



app.use((req,res, next)=>{
    console.log('This is my super response!');
    next();
});

app.use((req,res, next)=>{
   res.status(201);
    next();
});


app.use((req,res, next)=>{
    res.json({message:'You gef up early!'});
     next();
 });

 app.use((req,res,next)=>{
console.log('Successfully.')
 });
module.exports = app;