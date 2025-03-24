'use client';

import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loginAuth, setLoginAuth] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.token) {
                setIsAuth(true);
                setUser(parsedUser);
            }
        }
    }, []);

    function login(userData) {
        setIsAuth(true);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);
    }

    function logout() {
        setUser(null);
        setIsAuth(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{user, login, logout, loginAuth, setLoginAuth, isAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}