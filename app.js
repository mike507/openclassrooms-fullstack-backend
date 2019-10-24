const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.post('/api/stuff',(req,res,next)=>{
    console.log(req.body);
    res.status(201).json({
        message:'Thing created successfully!'
    });
    });
    
app.use('/api/stuff',(req,res,next)=>{
    const stuff =[
        {
            _id:'thing001',
            title:'First thing',
            description:'All of the info about it',
            imageUrl:'',
            price:400,
            userId:'2003',
        },
        {
            _id:'thing002',
            title:'Second thing',
            description:'All of the info about it',
            imageUrl:'',
            price:500,
            userId:'2003',
        },
    ];

    res.status(200).json(stuff);

});


module.exports = app;