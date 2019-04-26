import axios from 'axios';
const CONFIG = require('../config/env');

const handleResponse = response => {
    const {data, status} = response;
    return {data, status};
}

const API = {
    GET: async(url) => {
        try {
            const response = await axios.get(CONFIG.base_uri + url);
            return handleResponse(response);
        } catch (error) {
            console.log(error)
            return handleResponse(error.response);
        }
    },
    POST: async(url, payloads) => {
        try {
            const response = await axios.post(CONFIG.base_uri + url, payloads);
            return handleResponse(response);
        } catch (error) {
            console.log(error)
            return handleResponse(error.response);
        }
    },
    PUT: async(url, payloads) => {
        try {
            const response = await axios.put(CONFIG.base_uri + url, payloads);
            return handleResponse(response);
        } catch (error) {
            return handleResponse(error.response);
        }
    },
    DELETE: async(url) => {
        try {
            const response = await axios.get(CONFIG.base_uri + url);
            return handleResponse(response);
        } catch (error) {
            return handleResponse(error.response);
        }
    },
}

module.exports = API;