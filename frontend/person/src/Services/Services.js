import BaseUrl from "../API/BaseUrl";

const getAll = () => {
    return BaseUrl.get('get-all')
}

const get = (id) => {
    return BaseUrl.get('person/'+id)
}

const create = data => {
    return BaseUrl.post('create', data)
}

const update = (id, data) => {
    return BaseUrl.put('person/'+id, data)
}

const remove = (id) => {
    return BaseUrl.delete('person/'+id)
}

const Services = {
    getAll,
    get,
    create,
    update,
    remove
}

export default Services;