import axios from "axios";

// export const Api_url = 'http://localhost:8000';

const instace = axios.create({
    baseURL:"http://localhost:8000/"
})

export default instace;