import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/"
const publicUrl = 'http://127.0.0.1:8000'
const token = localStorage.getItem('token')
export default {
    publicUrl() {
        return publicUrl
    },
    baseURL() {
        return baseURL
    },
    buildFormData(form) {
        let data = new FormData();
        var form = Object.entries(form)
        form.forEach(e => {
            data.append(e[0], e[1])
        });
        return data;
    },

    auth(url, data) {
        return axios.post(baseURL + url, this.buildFormData(data))
    },
    async get(url) {

        let config = {
            method: "get",
            url: baseURL + url,
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
            },
        };

        return await axios(config)

    },
    async post(url, data) {

        let config = {
            method: "post",
            url: baseURL + url,
            data: this.buildFormData(data),
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
            },
        };

        return await axios(config)

    },
    async delete(url) {

        let config = {
            method: "delete",
            url: baseURL + url,
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
            },
        };

        return await axios(config)

    },
   async getDefaul(url) {
        let config = {
            method: "get",
            url: baseURL + url,
        };

        return await axios(config)
    }









}