import axios from 'axios'

const axiosApi = axios.create({
    baseURL:process.env.REACT_APP_SERVER_DOMAIN
})

export default axiosApi