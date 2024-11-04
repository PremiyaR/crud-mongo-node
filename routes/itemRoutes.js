const Item = require('../models/Item');
const express = require('express');
const router = express.Router();

//POST CALL
router.post('/',async(req,res)=>{
    try{
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    }catch(err){
        res.status(400).json({error: err.message})
    }
})

//GET CALL
router.get('/', async(req,res)=>{
    try{
        const items = await Item.find();
        res.json(items);
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

//GET CALL by id
router.get('/:id', async(req, res)=>{
    try{
        const item = await Item.findById(req.params.id)
        if(!item){
            return res.status(404).json({message: 'Item not found'});
        }
        res.json(item);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
})

//PUT call
router.put('/:id', async(req, res)=>{
    try{
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


//DELETE CALL
router.delete('/:id', async (req, res) => {
    try {
      const item = await Item.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json({ message: 'Item deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;

