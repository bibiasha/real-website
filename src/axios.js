import axios from "./axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/mr-signboards/us-central1/api'//the api {cloud function} url
});

export default instance;







//Axios is a popular JavaScript library used for making HTTP requests from a web browser or Node.js server.

//The create() method of the Axios library creates a new instance of the Axios object with default configuration settings. 
// the baseURL option is set to 'http://127.0.0.1:5001/mr-signboards/us-central1/api', which is the URL of an API endpoint hosted on a local server