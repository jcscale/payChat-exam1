import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import Services from "../Services/Services";

const PersonDetails = () => {
    const {personId} = useParams()

    const initialPersonState = {
        name: "",
        email: "",
        mobile_number: "",
        address: ""
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
                address: response.data.address
            })
        })
        .catch((err) => {
            err = new Error()
        })
    }
    
    useEffect(() => {
        getPerson()
    }, [])

    return (
        <>
            <p>{person.name}</p>
            <p>{person.email}</p>
            <p>{person.mobile_number}</p>
            <p>{person.address}</p>
            
        </>
    )
}

export default PersonDetails