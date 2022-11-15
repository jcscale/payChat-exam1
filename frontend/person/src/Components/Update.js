import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from "react-redux";
import { updatePerson } from "../Actions/Actions";
import Services from "../Services/Services";

const Update = (props) => {
    const dispatch = useDispatch()
    const initialPersonState = {
        name: "",
        email: "",
        mobile_number: "",
        address: ""
    }

    const [person, setPerson] = useState(initialPersonState)
    const [submitted, setSubmitted] = useState(false)

    const getPerson = () => {
        Services.get(props.personId)
        .then((response) => {
            setPerson({
                id: response.data._id,
                name: response.data.name,
                email: response.data.email,
                mobile_number: response.data.mobile_number,
                address: response.data.address
            })
        })
        .catch((err) => {
            err = new Error()
        })
    }

    useEffect(() => {
        if(props.personId) {
            getPerson(props.personId)
        }
    },[props.personId])

    const handleInputChange = event => {
        const {name, value} = event.target
        setPerson({...person, [name]: value})
    }

    const updatePersonHandler = (e) => {
        e.preventDefault()
        dispatch(updatePerson(person.id, person))
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            error = new Error();
        });

    }

    return (
        <>
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
            <Modal.Title>Add Person</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={(e)=>updatePersonHandler(e)}>
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
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
        </>
    );

}

export default Update
