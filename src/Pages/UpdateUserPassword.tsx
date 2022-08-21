import { notification } from 'antd';
import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthComponent from '../Components/AuthComponent';
import { UpdatePasswordUrl } from '../Utils/Config';
import { useAuthHook } from '../Utils/customHooks';
import { axiosRequest } from '../Utils/functions';
import { store } from '../Utils/store';
import { ActionTypes, DataProps } from '../Utils/types';


const UpdateUserPassword: FC = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { state: { updatePasswordUserId }, dispatch } = useContext(store)

    useEffect(() => {
        if (!updatePasswordUserId) {
            navigate("/check-user")
        }
    }, [])

    useAuthHook({
        successCallBack: () => { navigate("/") }
    })

    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        if (values["password"] !== values["confirm_password"]) {
            notification.error({
                message: "Invalid Password",
                description: "Password Do Not Match",
            })
            setLoading(false)
            return
        }
        // } else if ((values["password"]).length 4) {
        //     notification.error({
        //         message: "Operation Error",
        //         description: "Password Do Not Match",
        //     })
        //     setLoading(false)
        //     return
        // }
        const response = await axiosRequest({
            method: 'post',
            url: UpdatePasswordUrl,
            payload: { ...values, user_id: updatePasswordUserId }
        })

        if (response) {
            console.log(response.data)
            dispatch({
                type: ActionTypes.UPDATE_USER_PASSWORD,
                payload: null
            })
            notification.success({
                message: "Creation Successfully",
                description: "PASSWORD CREATED SUCCESSFULLY"
            })

            navigate("/login")
        }

        setLoading(false)
    }

    return <AuthComponent
        titleText='CREATE PASSWORD'
        buttonText='Submit'
        linkName='Go Back'
        linkPath='/check-user'
        isLogin={true}
        isUpdatePassword={true}
        loading={loading}
        onSubmit={onSubmit}
    />
}

export default UpdateUserPassword;