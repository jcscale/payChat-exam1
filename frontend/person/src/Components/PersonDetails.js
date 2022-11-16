import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import { Link, Route, Routes, useParams  } from "react-router-dom";
import Services from "../Services/Services";
import './styles/PersonDetails.scss'

const PersonDetails = () => {
    const {personId} = useParams()

    const initialPersonState = {
        name: "",
        email: "",
        mobile_number: "",
        address: "",
        age: "",
        about: ""
    }

    const [person, setPerson] = useState(initialPersonState)

    const getPerson = () => {
        Services.get(personId)
        .then((response) => {
            setPerson({
                id: response.data._id,
                name: response.data.name,
                email: response.data.email,
                mobile_number: response.data.mobile_number,
                address: response.data.address,
                age: response.data.age,
                about: response.data.about
            })
        })
        .catch((err) => {
            err = new Error()
        })
    }
    
    useEffect(() => {
        getPerson()
        console.log(person)
    }, [])

    return (
        <div className="details">
            <div className="person_details">
                <h2>Person Details</h2> 
                <Link to={`/friends/${person.id}`} >
                    View Friends
                </Link>
            </div>  

            <Container>

                <p className="data">{person.name}</p>
                <p className="label">Name</p>
                <p className="data">{person.email}</p>
                <p className="label">Email</p>
                <p className="data">{person.mobile_number}</p>
                <p className="label">Mobile number</p>
                <p className="data">{person.address}</p>
                <p className="label">Address</p>
                <p className="data">{person.age}</p>
                <p className="label">Age</p>
                <p className="data">{person.about}</p>
                <p className="label">About</p>
            </Container>
            
            
        </div>
    )
}

export default PersonDetails