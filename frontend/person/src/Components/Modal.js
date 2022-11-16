import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPerson } from '../Actions/Actions';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './styles/Modal.scss'
import { TagsInput } from "react-tag-input-component";

function ModalComponent() {

    const initialPersonState = {
        name: "",
        email: "",
        mobile_number: "",
        address: ""
    }

    const [person, setPerson] = useState(initialPersonState)
    const [friend, setFriend] = useState([])
    const [submitted, setSubmitted] = useState(false)

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target
        setPerson({...person, [name]: value})
    }

    const savePerson = (e) => {
        e.preventDefault()
        const data = {...person, friends: friend}
        const {name, email, mobile_number, address, age, about, friends} = data

        dispatch(createPerson(name, email, mobile_number, address, age, about, friends))
            .then((data) => {
                setPerson({
                    name: "",
                    email: "",
                    mobile_number: "",
                    address: "",
                    age: "",
                    about: ""
                })
                setFriend([])
                setShow(false)
                setSubmitted(true)
                console.log(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const newPerson = () => {
        setPerson(initialPersonState)
        setSubmitted(false)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button variant="primary" onClick={handleShow} className="add_people">
            Add people
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Person</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={savePerson}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter name" 
                        value={person.name}
                        onChange={handleInputChange}
                        name="name"
                    /> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={person.email}
                        onChange={handleInputChange}
                        name="email"
                    /> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="mobile_number">
                    <Form.Label>Mobile number</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter mobile number" 
                        value={person.mobile_number}
                        onChange={handleInputChange}
                        name="mobile_number"
                    /> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter address" 
                        value={person.address}
                        onChange={handleInputChange}
                        name="address"
                    /> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter age" 
                        value={person.age}
                        onChange={handleInputChange}
                        name="age"
                    /> 
                </Form.Group>

                <Form.Group className="mb-3" controlId="about">
                    <Form.Label>About</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter about" 
                        value={person.about}
                        onChange={handleInputChange}
                        name="about"
                    /> 
                </Form.Group>
                

                <TagsInput
                    name="friends"
                    placeHolder="Enter friends"
                    value={friend}
                    onChange={setFriend}
                />
                <em>press enter to add new friend</em>
                
                <Button variant="primary" type="submit" className='modal-btn'>
                    Submit
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default ModalComponent