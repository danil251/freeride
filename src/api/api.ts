import axios from "axios";

const instance = axios.create({
    baseURL: 'http://test-alpha.reestrdoma.ru/api/',

    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`}
})
export const API = {
    getUser(username: string, password: string){
        return axios.post('http://test-alpha.reestrdoma.ru/api/login/', {username, password})
    },
    getCompanies() {
        return instance.get('reestrdoma/companies/')
    },
    getHouse(id: string | undefined, page: number, perPage: number) {
        return instance.get(`reestrdoma/company/houses/${id}/?page=${page}&perPage=${perPage}`)
    }

}
