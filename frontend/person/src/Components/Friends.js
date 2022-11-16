import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import Services from "../Services/Services";
import './styles/Friends.scss'
import Container from 'react-bootstrap/Container';

const Friends = () => {
    const {personId} = useParams()

    const initialPersonState = {
       friends: []
    }

    const [person, setPerson] = useState(initialPersonState)

    const getPerson = () => {
        Services.get(personId)
        .then((response) => {
            setPerson({
                friends: response.data.friends
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
        <div className="friends">
            <div className="friend_list">
                <h2>Friend Lists</h2>
            </div>

            <Container>
                {
                    person.friends.map((friend, index) => (
                        <p key={index}>{friend}</p>
                    ))
                }
            </Container>
            

        </div>
    )
}

export default Friends;