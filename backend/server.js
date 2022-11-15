const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const url = 'mongodb://localhost/PeopleDb'

mongoose.Promise = global.Promise;

mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to the database')
}).catch((err) => {
    console.log(err)
    process.exit();
})

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message":"Server is running"})
})

require('./app/routes/Person.routes')(app);

app.listen(8000, () => {
    console.log('Server listening on port 8000')
})