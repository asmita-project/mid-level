const express = require('express')
const db = require('../db')
const bodyParser = require('body-parser')

const app = express();
const router = express.Router();



router.post('/',((req,res)=>{
    const name = req.body.name;
   let query = "INSERT INTO category(name)VALUES(?)";
   db.query(query,[name],((err,result)=>{
    if (err){
        return res.status(500).json({ error: err.sqlMessage});
    };
    db.query('select * from category where id=?',[result.insertId],function(err,result2){
        // res.json({ message: 'added successfully',result2});
        res.send(result2[0])
    })
    
    console.log("1 record inserted");
   }))
}))

module.exports =  router