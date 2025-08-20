import axios from 'axios';

const API_URL = 'http://localhost:5000/api';


//Employee API

export const getEmployees = () => axios.get(`${API_URL}/employees`);
export const getEmployeById = (id) => axios.get(`${API_URL}/employees/${id}`);
export const createEmployee = (data) => axios.post(`${API_URL}/employees`, data);
export const updateEmployee = (id, data) => axios.put(`${API_URL}/employees/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/employees/${id}`);




//Company API

export const getCompanies = () => axios.get(`${API_URL}/companies`);
export const getCompaniesById = (id) => axios.get(`${API_URL}/companies/${id}`);

export const createCompanies = (data) => axios.post(`${API_URL}/companies`, data);
export const updateCompanies = (id, data) => axios.put(`${API_URL}/companies/${id}`, data);
export const deleteCompanies = (id) => axios.delete(`${API_URL}/companies/${id}`);