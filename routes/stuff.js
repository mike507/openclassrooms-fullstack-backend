const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

router.use('/',stuffCtrl.getAllStuff);// Retrieving the list of Things for sale  
router.get('/:id',stuffCtrl.getOneThing);//Retrieving a specific Thing
router.post('/',stuffCtrl.createThing);//Saving Things to the database
router.put('/:id', stuffCtrl.modifyThing);//Update an existing Thing
router.delete('/:id',stuffCtrl.deleteThing);//Delete a thing

module.exports = router;