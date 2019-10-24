const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const dotenv = require('dotenv');
dotenv.config();

const DB_USER = process.env.DB_USER;
const PASSWORD = process.env.PASSWORD;
const DB_URL = `mongodb+srv://${DB_USER}:${PASSWORD}@cluster0-fgx5h.mongodb.net/test?retryWrites=true&w=majority`;

console.log(DB_URL);

mongoose.connect(DB_URL).then(()=>{
    console.log('Successfully connected to MongoDB Atlas!');
})
.catch((error)=>{
    console.log('Unable to connect to MongoBD Atlas!');
    console.error(error);
});

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  //Saving Things to the database
  app.post('/api/stuff',(req,res,next)=>{
    const thing = new Thing({
        title:req.body.title,
        description:req.body.description,
        imageUrl:req.body.imageUrl,
        price:req.body.price,
        userId:req.body.userId
    });

    thing.save().then(
        ()=>{
            res.json({
                message:'Post saved successfully'
            })
        }
    ).catch(
        (error)=>{
            res.status(400).json({
                error:error
            })
        }
    )
    });

    // Retrieving the list of Things for sale
app.use('/api/stuff',(req,res,next)=>{
Thing.find().then(
    (things)=>{
        res.status(200).json(things);
    }
).catch(
    (error)=>{
        res.status(400).json({
            error:error
        })
    }
)
});

//Retrieving a specific Thing
app.get('/api/stuff/:id',(req,res,next)=>{
    Thing.findOne({
        _id:req.params.id
    }).then(
        (thing)=>{
            res.status(200).json(thing);
        }
    ).catch(
        (error)=>{
            res.status(404).json({
                error:error
            })
        }
    )
});

//Update an existing Thing
app.put('/api/stuffs/:id', (req, res, next) => {
    const thing = new Thing({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

//Delete a thing
app.delete('/api/stuffz/:id',(req,res,next)=>{
    Thing.deleteOne({_id:req.params.id}).then(
        ()=>{
            res.status(200).json({
                message:'Deleted'
            })
        }
    ).catch(
        (error)=>{
            res.status(400).json({
                error:error
            })
        }
    )
})

module.exports = app;