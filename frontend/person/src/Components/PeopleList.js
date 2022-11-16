import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { retrievePersons, deletePerson } from "../Actions/Actions";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ModalComponent from "./Modal";
import Dropdown from 'react-bootstrap/Dropdown';
import Update from "./Update";
import './styles/PeopleList.scss'

const PeopleList = () => {
    const allPersons = useSelector(state => state.persons)
    const dispatch = useDispatch();

    // Update Modal State
    const [showUpdate, setShowUpdate] = useState(false);
    const [personId, setPersonId] = useState("");

    useEffect(() => {
        dispatch(retrievePersons())
    }, [])

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <div
          ref={ref}
          onClick={e => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
          <span className="threedots" />
        </div>
    ));

    const handleUpdate = (id) => {
        setShowUpdate(true)
        setPersonId(id)
    }

    const handleDelete = ( id ) => {
       dispatch(deletePerson(id))
       .then(() => {
        console.log('project with id of' +id + "has been deleted")
       })
       .catch((err) => {
        console.log(err)
       })
    }

    return (
        <>
            <div className="people_list">
                <h2>People List</h2>
            </div>
            <Container>
                <ModalComponent/>
                {allPersons.map((person) => (
                    <Card key={person._id} className="people_card">
                        <Card.Header>
                        <Dropdown drop="start">
                            <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
                            <Dropdown.Menu size="sm" title="">
                                <Dropdown.Item onClick={(e) => handleUpdate(person._id)}>update</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => handleDelete(person._id)}>delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Card.Header>
                        <Card.Body>
                            <Link to={`/${person._id}`} >
                                <Card.Title>{person.name}</Card.Title>
                            </Link>
                            <Card.Text>
                            {person.email}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
                <Update show={showUpdate} close={() => setShowUpdate(false)} personId={personId}/>
            </Container> 
        </>
    )
}

export default PeopleList