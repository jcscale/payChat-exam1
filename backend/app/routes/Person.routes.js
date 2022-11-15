module.exports = (app) => {
    const Person = require('../controllers/Person.controllers')

    app.post("/create", Person.create);
    app.get('/get-all', Person.findAll)
    app.get('/person/:personId', Person.findOne)
    app.put('/person/:personId', Person.update)
    app.delete('/person/:personId', Person.delete)
    
}