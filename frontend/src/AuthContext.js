import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setAuthenticated] = useState(!!localStorage.getItem('access_token'))
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      }, []); 
      console.log(isAuthenticated)
    
    return (
        <AuthContext.Provider value={{isAuthenticated, setAuthenticated}}>{children}
        </AuthContext.Provider>
    )
}