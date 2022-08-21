import React, { useState } from "react";
import { useAuthHook } from "../Utils/customHooks";
import { logout } from "../Utils/functions";
import Layout from "./Layout";



const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true)

    useAuthHook({
        errorCallBack: () => { logout() },
        successCallBack: () => { setLoading(false) }
    })

    return (loading) ?
        <div>
            <h1>Loading ...</h1>
        </div>
        :
        <Layout>
            {children}
        </Layout>
}

export default AuthRoute;
