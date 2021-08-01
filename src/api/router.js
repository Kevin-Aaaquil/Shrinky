const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const DB = require('../db');
const controller = require('./controller');
const ObjectId = require('mongodb').ObjectId;

// http://localhost:3000/   is the frontend

router.post('/fetch/link/', (req, res) => {
    controller.getUrl(req.body.code.toString())
        .then((link) => {
            res.status(203).json({link : link})
        })
        .catch((err) => {
            res.status(404).json({ code: err.code, message: err.message, success: false })
        })
})



router.post('/create/link', (req, res) => {
    controller.createCode(req.body.link.toString())
        .then((code) => {
            res.status(203).json({ link: `http://localhost:3000/${code}` })        // this link is frontend link
        })
        .catch((err) => {
            res.status(404).json({ code: err.code, message: err.message, success: false })
        })

})

// get to backend will send you to frontend
router.get('/',(req,res)=>{
    res.redirect('http://localhost:3000')
})

router.get('/:code',(req,res)=>{
    res.redirect(`http://localhost:3000/${req.params.code}`)
})





module.exports = router;