import { createContext, useState } from "react";

export const AuthContext = createContext({
    user: null,
    setUser: () => {}
})

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;