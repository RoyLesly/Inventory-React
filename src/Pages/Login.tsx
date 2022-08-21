import { FC, useState } from 'react';
import AuthComponent from '../Components/AuthComponent';
import { DataProps } from '../Utils/types';
import { LoginUrl } from '../Utils/Config';
import { tokenName, userName, userRole } from '../Utils/data';
import { useNavigate } from 'react-router-dom';
import { useAuthHook } from '../Utils/customHooks';
import { axiosRequest } from '../Utils/functions';


interface LoginDataProps {
    access: string
    user_name: string
    user_role: string
}

const Login: FC = () => {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useAuthHook({
        successCallBack: () => { navigate("/") }
    })

    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        console.log(values)
        const response = await axiosRequest<LoginDataProps>({
            method: "post",
            url: LoginUrl,
            payload: values,
            errorObject: {
                message: "Login Error"
            }
        })

        if (response) {
            localStorage.setItem(tokenName, response.data.access)
            localStorage.setItem(userName, response.data.user_name)
            localStorage.setItem(userRole, response.data.user_role)
            console.log(response)
            navigate("/")
        }
        setLoading(false)
    }

    return <AuthComponent
        titleText='LOGIN PAGE'
        buttonText='LOGIN'
        linkName='Check User !'
        linkPath='/check-user'
        isLogin
        onSubmit={onSubmit}
        loading={loading}
    />
}

export default Login;