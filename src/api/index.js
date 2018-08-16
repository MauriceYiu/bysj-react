import axios from "axios";

let instance = axios.create({
    // baseURL: "http://127.0.0.1:3009/"
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.timeout = 5000;


export default instance;