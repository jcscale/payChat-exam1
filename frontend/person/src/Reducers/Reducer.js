import {
    CREATE_PERSON,
    RETRIEVE_PERSONS,
    UPDATE_PERSON,
    DELETE_PERSON
} from '../Actions/Types'

const initialState = []

const personReducer = (persons = initialState, action) => {
    const {type, payload} = action

    switch(type) {
        case CREATE_PERSON:
            return [...persons, payload]

        case RETRIEVE_PERSONS:
            return payload;
        
        case UPDATE_PERSON:
            return persons.map((person) => {
                if(person._id === payload.id) {
                    return {
                        ...person,
                        ...payload
                    }
                }
                else {
                    return person
                }
            })
        
        case DELETE_PERSON:
            return persons.filter(({_id}) => _id !== payload.id)
        
        default:
            return persons
    }
}

export default personReducer