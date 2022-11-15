const Person = require('../models/Person.models')

//create and save new person
exports.create = (req, res) => {
    const person = new Person({
        name: req.body.name,
        email: req.body.email,
        mobile_number: req.body.mobile_number,
        address: req.body.address
    })

    person
    .save()
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        res.status(500).send({
            message: err.person || "Some error occured"
        })
    })
    
}

// retrieve all persons from the database
exports.findAll = (req, res) => {
    Person.find()
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        res.status(500).send({
            message: err.person || "Some error occured while retrieving"
        })
    })
}

//find a person with the persons id
exports.findOne = (req, res) => {
    Person.findById(req.params.personId)
    .then((data) => {
        if(!data) {
            return res.status(404).send({
                message: "Person not found with id "+ req.params.personId
            })
        }
        res.send(data)
    })
    .catch((err) => {
        if(err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Person not found with id of " + req.params.personId
            })
        }
        return res.status(500).send({
            message: "Error retrieving person with id "+ req.params.personId
        })
    })
}

// update person's details
exports.update = (req, res) => {
    Person.findByIdAndUpdate(
        req.params.personId, {
            name: req.body.name,
            email: req.body.email,
            mobile_number: req.body.mobile_number,
            email: req.body.email,
            address: req.body.address
        },
        { new: true}
    )
    .then((data) => {
        if(!data) {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            })
        }
        res.send(data)
    })
    .catch((err) => {
        if(err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            })
        }
        return res.status(500).send({
            message: "Error updating person with id "+ req.params.personId
        })
    })
}

//delete person from the list
exports.delete = (req, res) => {
    Person.findByIdAndRemove(req.params.personId)
    .then((data) => {
        if(!data) {
            return res.status(404).send({
                message: "Person not found with id "+ req.params.personId
            })
        }
        res.send({
            message: "Person deleted successfully"
        })
    })
    .catch((err) => {
        if(err.kind === "ObjectId" || err.name === "NotFound") {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            })
        }
        return res.status(500).send({
            message: "Could not delete person with id " + req.params.personId
        })
    })
}