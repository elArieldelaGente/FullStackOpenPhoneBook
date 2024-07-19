import axios from "axios"

const url = '/api/persons'

const getAll = () => {
      return axios
                        .get(url)
                        .then( response => response.data)
}

const getOne = (id) => {
      return axios
                        .get(`${url}/${id}`)
                        .then(response => response.data)
}

const removePerson = (id) => {
      return axios
                        .delete(`${url}/${id}`)
                        .then(response => response.data) 
}

 const updatePerson = (id, updatedPerson)=>{
      return axios
                        .put(`${url}/${id}`, updatedPerson)
                        .then(response => response.data) 
}

const createPerson = (newPerson) => {
      return axios
                        .post(`${url}`, newPerson)
                        .then(response => response.data) 
}

export default {
      getAll,
      removePerson,
      updatePerson,
      createPerson,
      getOne
}