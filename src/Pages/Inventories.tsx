import '../styles/user.scss';
import { FC, useEffect, useState } from "react";
import ContentLayoutInventory from '../Components/ContentLayoutInventory';
import { DataProps, GroupProps, InventoryProps } from '../Utils/types';
import AddInventoryForm from '../Components/forms/AddInventoryForm';
import UpdateInventoryForm from '../Components/forms/UpdateInventoryForm';
import DeleteInventoryForm from '../Components/forms/DeleteInventoryForm';
import { useGetGroups, useGetInventories } from '../Utils/customHooks';
import { getInventories } from '../Utils/functions';
import { Button, Form } from 'antd';
import AddInventoryFormCSV from '../Components/forms/AddInventoryFormCSV';
import { tokenName, userRole, userName } from '../Utils/data';
import NotAuthorized from '../Components/forms/NotAuthorized';


enum ModalState {
    addInventory,
    updateInventory,
    deleteInventory,
    addInventoryCSV,
    off
}

export const formatInventoryPhoto = (inventories: InventoryProps[], setModalState: any) => {
    return inventories.map(item => (
        {
            ...item,
            photoInfo: <div
                className='imageView'
                style={{
                    backgroundImage: `url(${item.photo})`,
                    width: "70px",
                    height: "70px",
                }}
            />,
            actions: <div className='action-buttons'>
                <Button
                    className='inventory-edit edit'
                    onClick={() => {
                        setModalState(ModalState.updateInventory);
                    }}
                >
                    EDIT
                </Button>
                <Button
                    className='inventory-delete delete'
                    onClick={() => setModalState(ModalState.deleteInventory)}
                >
                    DELETE
                </Button>
            </div>

        }
    ))
}

const Inventories: FC = () => {

    const [form] = Form.useForm();

    const [modalState, setModalState] = useState<ModalState>(ModalState.off)

    const [role, setRole] = useState(false)

    const [fetching, setFetching] = useState(true)

    const [inventories, setInventories] = useState<InventoryProps[]>([])

    const [groups, setGroups] = useState<GroupProps[]>([])

    const [record, setRecord] = useState<InventoryProps[]>([])

    const callBack = (record: any) => {
        setRecord(record)
    }

    useEffect(() => {
        if (localStorage.getItem(userRole) === "admin")
            setRole(true)
    }, [record, role])

    useGetGroups(setGroups, () => null)

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'CODE', dataIndex: 'code', key: 'code', sorter: (a: any, b: any) => a.code - b.code },
        { title: 'PHOTO', dataIndex: 'photoInfo', key: 'photoInfo' },
        { title: 'NAME', dataIndex: 'name', key: 'name', sorter: (a: any, b: any) => a.name.length - b.name.length },
        { title: 'CATEGORY', dataIndex: 'groupInfo', key: 'groupInfo', sorter: (a: any, b: any) => a.groupInfo.length - b.groupInfo.length },
        { title: 'Total', dataIndex: 'total', key: 'total' },
        { title: 'Remaining', dataIndex: 'remaining', key: 'remaining', sorter: (a: any, b: any) => a.remaining - b.remaining },
        { title: 'PRICE', dataIndex: 'price', key: 'price', sorter: (a: any, b: any) => a.price - b.price },
        //{ title: 'Created By', dataIndex: 'created_by', key: 'created_by' },
        { title: 'Updated On', dataIndex: 'updated_at', key: 'updated_at' },
        { title: 'ACTIONS', dataIndex: 'actions', key: 'actions' },
    ]

    useGetInventories(setInventories, setFetching)

    const onCreateInventory = () => {
        setModalState(ModalState.off)
        setFetching(true)
        getInventories(setInventories, setFetching)
    }

    const onDeleteInventory = () => {

    }

    const handleSorted = (...sorter: any) => {
        const { order, field } = sorter[2];
    }

    return (
        <>
            <ContentLayoutInventory
                pageTitle='Inventory'
                pageTitlePlural='Inventories'
                setModalState={() => setModalState(ModalState.addInventory)}
                dataSource={(formatInventoryPhoto(inventories, setModalState) as unknown) as DataProps[]}
                columns={columns}
                fetching={fetching}
                customName="Inventory Management"
                extraButton={
                    <Button
                        type='primary'
                        onClick={() => {
                            setModalState(ModalState.addInventoryCSV);
                        }}
                    >
                        Add Items (CSV)
                    </Button>
                }
                onRowClick={callBack}
                setRecord={setRecord}
                onSorted={handleSorted}
            >
                <AddInventoryForm
                    onSuccessCallBack={onCreateInventory}
                    isVisible={modalState === ModalState.addInventory}
                    onClose={() => setModalState(ModalState.off)}
                    groups={groups}
                />
                <UpdateInventoryForm
                    onSuccessCallBack={onCreateInventory}
                    isVisible={modalState === ModalState.updateInventory}
                    onClose={() => { setModalState(ModalState.off); setRecord([]); form.resetFields() }}
                    groups={groups}
                    record={record}
                    onRowClick={callBack}
                    setRecord={setRecord}
                />

                {role ? <DeleteInventoryForm
                    onSuccessCallBack={onDeleteInventory}
                    isVisible={modalState === ModalState.deleteInventory}
                    onClose={() => setModalState(ModalState.off)}
                    record={record}
                /> : <NotAuthorized
                    isVisible={modalState === ModalState.deleteInventory}
                    onClose={() => setModalState(ModalState.off)}
                />}

                {role ? <AddInventoryFormCSV
                    onSuccessCallBack={onCreateInventory}
                    isVisible={modalState === ModalState.addInventoryCSV}
                    onClose={() => setModalState(ModalState.off)}
                /> : <NotAuthorized
                    isVisible={modalState === ModalState.addInventoryCSV}
                    onClose={() => setModalState(ModalState.off)}
                />}
            </ContentLayoutInventory>
        </>

    )

}

export default Inventories;