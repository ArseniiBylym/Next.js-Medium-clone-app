import axios from 'axios';

const handleResponse = response => {
    const {data, status} = response;
    return {data, status};
}

const API = {
    GET: async(url) => {
        try {
            const response = await axios.get(url);
            return handleResponse(response);
        } catch (error) {
            return handleResponse(error.response);
        }
    },
    POST: async(url, payloads) => {
        try {
            const response = await axios.post(url, payloads);
            return handleResponse(response);
        } catch (error) {
            return handleResponse(error.response);
        }
    },
    PUT: async(url, payloads) => {
        try {
            const response = await axios.put(url, payloads);
            return handleResponse(response);
        } catch (error) {
            return handleResponse(error.response);
        }
    },
    DELETE: async(url) => {
        try {
            const response = await axios.get(url);
            return handleResponse(response);
        } catch (error) {
            return handleResponse(error.response);
        }
    },
}

module.exports = API;