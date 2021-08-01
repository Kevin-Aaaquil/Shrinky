const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const DB = require('../db');
const controller = require('./controller');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

router.post('/fetch/link', (req, res) => {
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
           res.status(203).json({link:`https://shrinkky.herokuapp.com/${code}`})            //later change to frontend link
        })
        .catch((err) => {
            res.status(404).json({ code: err.code, message: err.message, success: false })
        })

})

router.delete(`/delete/${process.env.password}`,async (req,res)=>{
   try {await (await DB()).collection('shorten').remove({},()=>{
        res.send("Deleted");
    });}
    catch(err){
        res.send(err);
    }
})

// to be enabled after publishing of frontend

// // redirects backend gets to frontend
// router.get('/',(req,res)=>{
//     res.redirect("https://shrinkky.vercel.com") 
// })

// router.get('/:code',(req,res)=>{
//     res.redirect(`https://shrinkky.vercel.com/${req.params.code}`)
// })


module.exports = router;