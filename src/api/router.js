const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const DB = require('../db');
const controller = require('./controller');
const ObjectId = require('mongodb').ObjectId;

router.get('/:code', (req, res) => {
    controller.getUrl(req.params.code.toString())
        .then((link) => {
            res.redirect(link);
        })
        .catch((err) => {
            res.status(404).json({ code: err.code, message: err.message, success: false })
        })
})

router.get('/',(req,res)=>{
res.render('index.ejs')
})


router.post('/create/link', (req, res) => {
    controller.createCode(req.body.link.toString())
        .then((code) => {
           // res.status(203).json({ link: `localhost:3000/${code}` })
           res.status(203).render('result.ejs',{link:`www.shrinkky.herokuapp.com/${code}`})
        })
        .catch((err) => {
            res.status(404).json({ code: err.code, message: err.message, success: false })
        })

})





module.exports = router;