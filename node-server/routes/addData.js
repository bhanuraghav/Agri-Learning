const express= require("express"),
    router = express.Router();
var connection = require('./../config/connection');
var dbconfig = require('./../config/database'); 
connection.query('USE ' + dbconfig.database);

router.get('/' ,(req,res)=>{
    res.render('add-disease');
})

module.exports = router;