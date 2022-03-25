import axios from 'axios'
const api = axios.create({
    baseURL: "https://httpbin.org/anything",
})

const testAnything = data => api.post('', data)



const testApis = {
    testAnything
}

export default testApis