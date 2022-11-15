import {
    CREATE_PERSON,
    RETRIEVE_PERSONS,
    GET_PERSON,
    UPDATE_PERSON,
    DELETE_PERSON
} from './Types'

import Services from '../Services/Services'

export const createPerson = (name, email, mobile_number, address) => async(dispatch) => {
    try {
        const res = await Services.create({name, email, mobile_number, address})

        dispatch({
            type: CREATE_PERSON,
            payload: res.data
        })

        return Promise.resolve(res.data)
    } catch(err) {
        return Promise.reject(err)
    }
}

export const retrievePersons = () => async(dispatch) => {
    try {
        const res = await Services.getAll()
        dispatch({
            type: RETRIEVE_PERSONS,
            payload: res.data
        })
    }
    catch(err) {
        console.log(err)
    }
}

export const updatePerson = (id, data) => async(dispatch) => {
    try {
        const res = await Services.update(id, data);

        dispatch({
            type: UPDATE_PERSON,
            payload: data
        })
        return Promise.resolve(res.data)
    }
    catch(err) {
        return Promise.reject(err)
    }
}

export const deletePerson = (id) => async(dispatch) => {
    try {
        await Services.remove(id)

        dispatch({
            type: DELETE_PERSON,
            payload: {id}
        })
    }
    catch(err) {
        console.log(err)
    }
}