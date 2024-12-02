const express = require('express');
const Hobbies = require('../models/hobbies');
const router = express.Router();

// Create Hobbies
router.post('/', async (req, res) => {
    try {
        const hobbies = new Hobbies(req.body);
        await hobbies.save();
        res.status(201).send(hobbies);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update Hobbies by ID
router.put('/:id', async (req, res) => {
    try {
        const hobbies = await Hobbies.findByIdAndUpdate( req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        });
        
        if (!hobbies) {
            return res.status(404).send({ message: 'Hobbies not found' });
        }
        res.send(hobbies);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete Hobbies by ID
router.delete('/:id', async (req, res) => {
    try {
        const hobbies = await Hobbies.findByIdAndDelete(req.params.id); 
        
        if (!hobbies) {
            return res.status(404).send({ message: 'Hobbies not found' });
        }
        res.send(hobbies);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
