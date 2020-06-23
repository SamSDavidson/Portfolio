import axios from 'axios';

const API = axios.create({
 baseURL: process.env.API_URL || 'https://private-52fbf1-ssdevelops.apiary-mock.com/'
});

export default API;