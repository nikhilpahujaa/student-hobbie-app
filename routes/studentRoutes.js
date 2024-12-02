const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Hobbies = require('../models/hobbies');

// Create new student
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//students with their hobbies
router.get('/with-hobbies', async (req, res) => {
    try {
        const studentsWithHobbies = await Student.aggregate([
            {
                $lookup: {from: 'hobbies', localField: 'email', foreignField: 'email', as: 'hobbies'}
            },
            {
                $unwind: {path: '$hobbies', preserveNullAndEmptyArrays: true}
            },
            {
                $project: {_id: 0, name: 1, email: 1, address: 1, rollNum: 1, hobbies: '$hobbies.hobbies'}
            }
        ]);

        res.json(studentsWithHobbies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update student by ID
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete student by ID
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (student) {
            res.json({ message: 'Student deleted' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
