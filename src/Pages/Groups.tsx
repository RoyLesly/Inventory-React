import '../styles/user.scss';
import { FC, useEffect, useState } from "react";
import ContentLayoutGroup from '../Components/ContentLayoutGroup';
import { DataProps, GroupProps } from '../Utils/types';
import AddGroupForm from '../Components/forms/AddGroupForm';
import UpdateGroupForm from '../Components/forms/UpdateGroupForm';
import DeleteGroupForm from '../Components/forms/DeleteGroupForm';
import { useGetGroups } from '../Utils/customHooks';
import { getGroups } from '../Utils/functions';
import { Button } from 'antd';
import { userRole } from '../Utils/data';
import NotAuthorized from '../Components/forms/NotAuthorized';


enum ModalState {
    addGroup,
    updateGroup,
    deleteGroup,
    off
}

export const formatGroupActions = (groups: GroupProps[], setModalState: any) => {
    return groups.map(item => (
        {
            ...item,
            actions: <div className='action-buttons'>
                <Button
                    className='inventory-edit edit'
                    onClick={() => setModalState(ModalState.updateGroup)}
                >
                    EDIT
                </Button>
                <Button
                    className='inventory-delete delete'
                    onClick={() => setModalState(ModalState.deleteGroup)}
                >
                    DELETE
                </Button>
            </div>
        }
    ))
}

const Group: FC = () => {

    const [modalState, setModalState] = useState<ModalState>(ModalState.off)

    const [role, setRole] = useState(false)

    const [fetching, setFetching] = useState(true)

    const [record, setRecord] = useState<GroupProps[]>([])

    const [groups, setGroups] = useState<GroupProps[]>([])

    const callBack = (record: any) => {
        setRecord(record)
        console.log(record)
    }

    useEffect(() => {
        if (localStorage.getItem(userRole) === "admin")
            setRole(true)
    }, [role])

    useGetGroups(setGroups, setFetching)

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'NAME', dataIndex: 'name', key: 'name' },
        { title: 'BELONGS TO (Another Group)', dataIndex: 'belongsTo', key: 'belongsTo' },
        { title: 'TOTAL ITEMS', dataIndex: 'total_items', key: 'total_items' },
        { title: 'CREATED AT', dataIndex: 'created_at', key: 'created_at' },
        { title: 'ACTIONS', dataIndex: 'actions', key: 'actions' },
    ]


    const onCreateGroup = () => {
        setModalState(ModalState.off)
        setFetching(true)
        getGroups(setGroups, setFetching)
    }

    return (
        <>
            <ContentLayoutGroup
                pageTitle='Group'
                setModalState={() => setModalState(ModalState.addGroup)}
                dataSource={(formatGroupActions(groups, setModalState) as unknown) as DataProps[]}
                columns={columns}
                fetching={fetching}
                onRowClick={callBack}
                setRecord={setRecord}
            >
                <AddGroupForm
                    onSuccessCallBack={onCreateGroup}
                    isVisible={modalState === ModalState.addGroup}
                    onClose={() => setModalState(ModalState.off)}
                    groups={groups}
                />
                <UpdateGroupForm
                    onSuccessCallBack={onCreateGroup}
                    isVisible={modalState === ModalState.updateGroup}
                    onClose={() => { setModalState(ModalState.off); setRecord([]); }} //; window.location.reload() }}
                    record={record}
                    onRowClick={callBack}
                    setRecord={setRecord}
                    groups={groups}
                />
                {role ? <DeleteGroupForm
                    onSuccessCallBack={onCreateGroup}
                    isVisible={modalState === ModalState.deleteGroup}
                    onClose={() => setModalState(ModalState.off)}
                    record={record}
                /> : <NotAuthorized
                    isVisible={modalState === ModalState.deleteGroup}
                    onClose={() => setModalState(ModalState.off)}
                />}
            </ContentLayoutGroup>
        </>

    )

}

export default Group;