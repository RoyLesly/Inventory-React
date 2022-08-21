import '../styles/user.scss';
import { FC, useEffect, useState } from "react";
import AddUserForm from '../Components/forms/AddUserForm';
import { axiosRequest } from '../Utils/functions';
import { UsersUrl } from '../Utils/Config';
import ContentLayout from '../Components/ContentLayout';
import { DataProps } from '../Utils/types';


export const formatUserActions = (users: UserProps[]) => {
    return users.map(item => (
        {
            ...item,
            actions: <div className='action-buttons'>
                <button className='user-edit edit'>EDIT</button>
                <button className='user-delete delete'>DELETE</button>
            </div>
        }
    ))
}

interface UserProps {
    key: number
    id: number
    first_name: string
    last_name: string
    created_at: string
    email: string
    role: string
    is_active: string
    last_login: string
}

const User: FC = () => {

    const [modalState, setModalState] = useState(false)

    const [fetching, setFetching] = useState(true)

    const [users, setUsers] = useState<UserProps[]>([])

    const columns = [
        { title: 'ID', dataIndex: 'key', key: 'key' },
        { title: 'FIRST NAME', dataIndex: 'first_name', key: 'first_name' },
        { title: 'LAST NAME', dataIndex: 'last_name', key: 'last_name' },
        { title: 'EMAIL', dataIndex: 'email', key: 'email' },
        { title: 'ROLE', dataIndex: 'role', key: 'role' },
        { title: 'IS ACTIVE', dataIndex: 'is_active', key: 'is_active' },
        { title: 'LAST LOGIN', dataIndex: 'last_login', key: 'last_login' },
        { title: 'CREATED AT', dataIndex: 'created_at', key: 'created_at' },
        { title: 'ACTIONS', dataIndex: 'actions', key: 'actions' },
    ]

    const getUsers = async () => {

        const response = await axiosRequest<UserProps[]>({
            // method: "get",               // Optional
            url: UsersUrl,
            hasAuth: true,
            showError: false,
        })
        if (response) {
            console.log(response.data)
            const data = response.data.map(
                (item) => ({
                    ...item,
                    key: item.id,           // Comment out and change key value in columns to id
                    is_active: item.is_active.toString(),
                    created_at: (item.created_at)?.toString().slice(0, 10),
                    last_login: (item.last_login)?.toString().slice(0, 10),
                })
            )
            setUsers(data)
            setFetching(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const onCreateUser = () => {
        setModalState(false)
        setFetching(true)
        getUsers()
    }

    return (
        <>
            <ContentLayout
                pageTitle='User'
                setModalState={setModalState}
                //dataSource={(users as unknown) as DataProps[]}
                dataSource={(formatUserActions(users) as unknown) as DataProps[]}
                columns={columns}
                fetching={fetching}
            >
                <AddUserForm
                    onSuccessCallBack={onCreateUser}
                    isVisible={modalState}
                    onClose={() => setModalState(false)}
                />
            </ContentLayout>
        </>

    )

}

export default User;