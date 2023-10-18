import axios from "axios";


// TODO amine review this
axios.interceptors.response.use(function (response) {
    // Optional: Do something with response data
    return response;
}, function (error) {
    console.log("=>",error);
    return Promise.reject(error);
});