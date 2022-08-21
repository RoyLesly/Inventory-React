import { notification } from 'antd';
import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthComponent from '../Components/AuthComponent';
import { LoginUrl } from '../Utils/Config';
import { useAuthHook } from '../Utils/customHooks';
import { axiosRequest } from '../Utils/functions';
import { store } from '../Utils/store';
import { ActionTypes, DataProps } from '../Utils/types';


interface CheckUserProps {
    user_id: number
}


const CheckUser: FC = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const { dispatch } = useContext(store)

    useAuthHook({
        successCallBack: () => { navigate("/") }
    })

    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        console.log(values)
        const response = await axiosRequest<CheckUserProps>({
            method: 'post',
            url: LoginUrl,
            payload: { ...values, is_new_user: true }
        })
        if (response) {
            console.log({ payload: response.data.user_id })
            dispatch({
                type: ActionTypes.UPDATE_USER_PASSWORD,
                payload: response.data.user_id
            })
            notification.error({
                message: "User Has No Password",
                description: "CREATE PASSWORD",
            })
            navigate('/create-password')
        }
        setLoading(false)
    }

    return <AuthComponent
        titleText='VERIFY USER'
        buttonText='Check User'
        linkName='Back To Login'
        linkPath='/login'
        isCheckUser
        loading={loading}
        onSubmit={onSubmit}
    />
}

export default CheckUser;