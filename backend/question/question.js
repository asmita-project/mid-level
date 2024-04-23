const express = require('express')
const db = require('../db')
const bodyParser = require('body-parser')

const app = express();
const router = express.Router();



router.post('/', ((req, res) => {
    const name = req.body.question;
    const optiondata = req.body.optiondata
    const category = req.body.category
    const options = JSON.stringify(optiondata);
    let query = "INSERT INTO question(question,optiondata,category)VALUES(?,?,?)";
    db.query(query, [name, options, category], ((err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: err.sqlMessage });
        };
        db.query('select * from question where id=?', [result.insertId], function (err, result2) {
            // res.json({ message: 'added successfully',result2});
            if (err) {
                return res.status(500).json({ error: err.sqlMessage });
            }
            res.send({
                id: result2[0].id,
                question: result2[0].question,
                optiondata: JSON.parse(result2[0].optiondata),
                category: result2[0].category
            })
        })

    }))
}))

router.get('/all', function (req, res) {
    db.query('SELECT q.question,q.id,q.optiondata,q.category,c.id as categoryid,c.name FROM question q JOIN category c on q.category = c.id', function (err, result) {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        const filterdata = result.map((item) => {
           let objectdata = {
                id:item.id,
                question:item.question,
                optiondata:JSON.parse(item.optiondata),
                category:{
                    name:item.name,
                    id:item.categoryid
                }
            }
            return objectdata       
        })
        res.send(filterdata)
    })
})

router.put('/update', ((req, res) => {
    const name = req.body.question;
    const optiondata = req.body.optiondata
    const category = req.body.category
    const options = JSON.stringify(optiondata);
    let query = "INSERT INTO question(question,optiondata,category)VALUES(?,?,?)";
    db.query(query, [name, options, category], ((err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: err.sqlMessage });
        };
        db.query('select * from question where id=?', [result.insertId], function (err, result2) {
            // res.json({ message: 'added successfully',result2});
            if (err) {
                return res.status(500).json({ error: err.sqlMessage });
            }
            res.send({
                id: result2[0].id,
                question: result2[0].question,
                optiondata: JSON.parse(result2[0].optiondata),
                category: result2[0].category
            })
        })

    }))
}))
module.exports = router