import axios from 'axios';
import {BASE_URI} from '../config';

const handleResponse = response => {
    const {data, status} = response;
    return {data, status};
}

const API = {
    GET: async(url) => {
        try {
            const response = await axios.get(BASE_URI + url);
            return handleResponse(response);
        } catch (error) {
            console.log(error)
            return handleResponse(error.response);
        }
    },
    POST: async(url, payloads) => {
        try {
            const response = await axios.post(BASE_URI + url, payloads);
            return handleResponse(response);
        } catch (error) {
            console.log(error)
            return handleResponse(error.response);
        }
    },
    PUT: async(url, payloads) => {
        try {
            const response = await axios.put(BASE_URI + url, payloads);
            return handleResponse(response);
        } catch (error) {
            return handleResponse(error.response);
        }
    },
    DELETE: async(url) => {
        try {
            const response = await axios.get(BASE_URI + url);
            return handleResponse(response);
        } catch (error) {
            return handleResponse(error.response);
        }
    },
}

module.exports = API;