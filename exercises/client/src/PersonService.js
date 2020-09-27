import axios from 'axios';

const baseUrl = '/api/persons';

const getAllPersons = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const addPerson = (person) => {
  return axios.post(baseUrl, person).then((res) => res.data);
};

const updatePerson = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person).then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAllPersons,
  addPerson,
  updatePerson,
  deletePerson,
};
