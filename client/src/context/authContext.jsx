import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    //USER DATA
    const [logger, setLogger] = useState(() => {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token")
            
            return jwt_decode(token).user;
        }
        return null;
    })

    //LOGIN STATUS
    const [isLoggedIn, setIsLoggedIn] = useState(()=>{
        if(logger==null){
            return false;
        }
        return true;
    })
    // LOGIN FUNCTION
    const login = (user) => {
        setLogger(user);
        setIsLoggedIn(true);
    }

    const logout = () => {
       setLogger(null);
       setIsLoggedIn(false)
       localStorage.clear()
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, logger, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
