const express = require('express')
const bodyParser = require('body-parser')
const category = require('./category/category')
const question = require('./question/question')
const cors = require('cors'); 
const app = express();
const db = require('./db')
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/category',category)
app.use('/question',question)

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});