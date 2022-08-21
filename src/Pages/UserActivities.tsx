import '../styles/user.scss';
import { FC, useEffect, useState } from "react";
import { axiosRequest } from '../Utils/functions';
import { UserActivitiesUrl } from '../Utils/Config';
import ContentLayout from '../Components/ContentLayout';
import { DataProps } from '../Utils/types';


interface UserActivitiesProps {
    key: number
    id: number
    first_name: string
    email: string
    action: string
    created_at: string
}

const UserActivities: FC = () => {

    const [modalState, setModalState] = useState(false)

    const [fetching, setFetching] = useState(true)

    const [userActivities, setUserActivities] = useState<UserActivitiesProps[]>([])

    const columns = [
        //{ title: 'ID', dataIndex: 'key', key: 'key' },
        { title: 'ACTIONS', dataIndex: 'actions', key: 'actions' },
        { title: 'PERFORMED BY', dataIndex: 'first_name', key: 'first_name' },
        { title: 'EMAIL', dataIndex: 'email', key: 'email' },
        { title: 'PERFORMED AT', dataIndex: 'created_at', key: 'created_at' },

    ]

    const getUserActivities = async () => {

        const response = await axiosRequest<UserActivitiesProps[]>({
            // method: "get",               // Optional
            url: UserActivitiesUrl,
            hasAuth: true,
            showError: false,
        })
        if (response) {
            console.log(response.data)
            const data = response.data.map(
                (item): any => ({
                    ...item,
                    key: item.id,           // Comment out and change key value in columns to id
                    created_at: (item.created_at)?.toString().slice(0, 17),
                })
            )
            setUserActivities(data)
            setFetching(false)
        }
    }

    useEffect(() => {
        getUserActivities()
    }, [])

    return (
        <>
            <ContentLayout
                pageTitle='User Activity'
                setModalState={setModalState}
                dataSource={(userActivities as unknown) as DataProps[]}
                columns={columns}
                fetching={fetching}
                pageTitlePlural='User Activities'
                disableAddButton={true}
            >
                <></>
            </ContentLayout>
        </>

    )

}

export default UserActivities;