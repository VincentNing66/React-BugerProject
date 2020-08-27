import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://burgerbuilder-9a993.firebaseio.com/'
    }
)
export default instance;