import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";
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

// Use a new axios instance for refersh token which does not have an interceptor attached to it. if we use axiosInstance 
// It will get caught in an infinite loop 
const refreshAxios = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type' : 'application/json',
         accept :  'application/json'
    }
});


axiosInstance.interceptors.response.use(
    function (response) {
        return response;

    },
    async function(error){
        console.log('Interceptor caught:', error.response?.status);
        /* Axios will have the origional request in error.config object*/
        const originalRequest = error.config
        
        // Check if this is a login request that failed
        const isLoginRequest = originalRequest.url && originalRequest.url.includes('/auth/jwt/create/');

        
        /* To avoid infinite loop, we add a flag _retry to our object*/
        if (!originalRequest._retry && error.response?.status === 401) {
            /* If we get a 401 error, we will try to refresh the token*/
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token')
            if(refreshToken){
                console.log('refreshing....')
                try {
                    const res = await refreshAxios.post('/auth/jwt/refresh/', {
                        refresh: refreshToken
                    });
                    
                    if (res.status === 201 || res.status === 200){
                        const newAccessToken = res.data.access
                        localStorage.setItem('access_token',newAccessToken )
                        // Update header
                        axiosInstance.defaults.headers['Authorization'] = 'JWT ' + newAccessToken;
                        originalRequest.headers['Authorization'] = 'JWT ' + newAccessToken;

                        // Retry the original request
                        return axiosInstance(originalRequest);
    
                        }
    
                    
                }
                catch (err){
                    console.log(err)
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('refresh_token')
                    // Only redirect if it's not a login request
                    if (!isLoginRequest) {
                        window.location.href = '/login';
                    }
                
            }}
            else {
                // No refresh token available, redirect to login only if not a login request
                console.error('No refresh token available');
                if (!isLoginRequest) {
                    window.location.href = '/login';
                }
            }

        

        }

        
        return Promise.reject(error);


    }
    

)


export default axiosInstance;
