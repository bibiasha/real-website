import axios from "./axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/mr-signboards/us-central1/api'//the api {cloud function} url
});

export default instance;