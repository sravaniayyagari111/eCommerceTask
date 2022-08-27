const express = require('express');
const Orders = require('../models/model');
const router = express.Router();


const id = Math.floor(100 + Math.random() * 900);

//Creating a new order
router.post('/orders/create', async (req, res) => {
    const query={
        order_id:id,
        item_name:req.body.item_name,
        cost:req.body.cost,
        order_date:req.body.order_date,
        delivery_date:req.body.delivery_date
    }
    
    try {
        const dataToSave = await Orders.create(query);
        if(dataToSave){
            res.status(200).json(dataToSave)
        } else {
            res.status(404).send({message:'...'})
        }
        
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Listing all order for a given date
router.get('/orders/list/:order_date', async (req, res) => {
    console.log(req)
    const query = {}
    query.order_date=req.params.order_date
    console.log(query)
    try {
        const data = await Orders.find(query);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Specific order by order_id
router.get('/orders/search/:order_id', async (req, res) => {
    try {
        const data = await Orders.findOne({order_id:req.params.order_id});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update the order by specific order_id
router.put('/orders/update/:order_id', async (req, res) => {
    try {
        const query = {}
        query.order_id = req.params.order_id;
        const updateQuery = {
        $set: {
        cost: req.body.cost,
        delivery_date: req.body.delivery_date,
      },
    };
        const result = await Orders.update(
            query,updateQuery
        )
        res.json(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete order by order_id
router.delete('/orders/delete/:order_id', async (req, res) => {
    try {
        const query ={}
        query.order_id = req.params.order_id;
        const data = await Orders.findOneAndRemove(query)
        res.send(`Order with ${data.item_name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;