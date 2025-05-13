import axios from 'axios';

const baseURL = "http://127.0.0.1:8000";
const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'JWT ' + localStorage.getItem('access_token')
            : null,
        'Content-Type' : 'application/json',
        accept :  'application/json'
    }
})
axiosInstance.interceptors.response.use(
    function (response) {
        return response;

    },
    function(error){
        console.log('Interceptor caught:', error.response?.status);
        /* Axios will have the origional request in error.config object*/
        const origionalRequest = error.config
        /* To avoid infinite loop, we add a flag _retry to our object*/
        if (!origionalRequest._retry && error.response.status === 401) {
            /* If we get a 401 error, we will try to refresh the token*/
            origionalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token')
            if(refreshToken){
                console.log('refreshing....')
                return axiosInstance.post('/auth/jwt/refresh/',{
                    refresh: refreshToken
                })
                .then((res)=>{
                    if (res.status === 201 || res.status === 200){
                        localStorage.setItem('access_token',res.data.access)
                        axiosInstance.defaults.headers['Authorization'] =
                        'JWT ' + localStorage.getItem('access_token');
                        origionalRequest.headers['Authorization'] =
                        'JWT ' + localStorage.getItem('access_token');
                        return axiosInstance(origionalRequest)

                    }

                })
                .catch((err)=>{
                    console.log(err)
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('refresh_token')
                    window.location.href = '/login';

                    



                })
            }
            else {
                // No refresh token available, redirect to login
                console.error('No refresh token available');
                window.location.href = '/login';
            }

        

        }

        
        return Promise.reject(error);


    }
    

)


export default axiosInstance;
