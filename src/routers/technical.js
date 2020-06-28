const express = require('express');
const Technical = require('../models/Technical');
// 


const router = express.Router();
// Create Technical 
router.post('/technical', async(req, res) => {
    try {
        const technical = new Technical();
        technical.subject = req.body.subject;
        technical.message = req.body.message;
        technical.save();
        return res.send({ message: 'Technical is Created', technical });
    } catch (error) {
        res.status(400).send(error)
    }
});
//============================
// List All Technical
router.get('/technical', async(req, res) => {
    Technical.find(function(err, technical) {
        if (!err) {
            return res.send({ message: 'Technical List', technical });
        } else {
            res.status(400).send(error);
        }
    });
});
//============================
// Retrieve Single Technical
router.get('/technical/:id', async(req, res) => {
    Technical.findById(req.params.id, function(err, technical) {
        if (!err) {
            return res.send({ message: 'Technical is existed', technical });
        } else {
            res.status(400).send(error);
        }
    });
});
//============================
// Update Single Technical
router.put('/technical/:id', async(req, res) => {
    Technical.findById(req.params.id, function(err, technical) {
        technical.subject = req.body.subject;
        technical.message = req.body.message;
        technical.publishedAt = new Date();
        // Save Updated

        return technical.save(function(err) {
            if (!err) {
                return res.send({ message: 'Technical is updated', technical });
            } else {
                res.status(400).send(error);
            }
            return res.send(technical);
        });

    });
});
//============================
module.exports = router