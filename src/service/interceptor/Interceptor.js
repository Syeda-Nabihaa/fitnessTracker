import axios  from "axios";
import Helper from "../../helper/Helper";
import { environment } from "../../environment/environment";


const helpers = new Helper();

const axiosInstance = axios.create({
    baseURL: environment.baseURL,
});

axiosInstance.interceptors.request.use(
    (config)=> {
        const token = helpers.getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`
            config.headers.Accept = 'application/json'

        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)
export default axiosInstance;