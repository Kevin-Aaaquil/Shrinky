const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const DB = require('../db');
const controller = require('./controller');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

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

router.get('/create/link',(req,res)=>{
    res.redirect('/');
})

let link ; 
router.post('/create/link', (req, res) => {
    controller.createCode(req.body.link.toString())
        .then((code) => {
           // res.status(203).json({ link: `localhost:3000/${code}` })
           link = code;
           res.redirect('/result')
           
          // res.status(203).render('result.ejs',{link:`shrinkky.herokuapp.com/${code}`})
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

router.get('/result',(req,res)=>{
if(link){
    res.status(203).render('result.ejs',{link:`shrinkky.herokuapp.com/${link}`})
    link = 0;
}
else{
    res.redirect('/')
}
})



module.exports = router;