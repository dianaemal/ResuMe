import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({children}){
    const {isAuthenticated} = useContext(AuthContext)
   
    return isAuthenticated? children : <Navigate to="/login"></Navigate>



}
export default ProtectedRoute;