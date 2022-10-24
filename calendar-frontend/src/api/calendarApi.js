import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

// Todo: interceptar peticiones, las que van al back o las que regresan (req o res)
calendarApi.interceptors.request.use( config => {

    //* ya aqui puedo añadir, modificar headers

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;

})


export default calendarApi;
