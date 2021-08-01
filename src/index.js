console.clear()
const express = require('express')
const chalk = require('chalk');
const cors=require('cors');
const routes = require('./api/router')
require('dotenv').config();
const app = express();


const DB = require('./db');
DB().catch(err=>console.log(err.message));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/hell',(req,res)=>{
    console.log("hell");
    res.send("jgg")
})
app.use(routes);


try{
    let port = process.env.PORT || 5000;
    app.listen(port,()=>{
        console.log(chalk.magenta(`listening on port ${port}`))
    });
}
catch(err){
    console.log(err.message);
}