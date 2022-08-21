import '../styles/user.scss';
import { FC, useState, useEffect } from "react";
import { getShops } from '../Utils/functions';
import ContentLayoutShop from '../Components/ContentLayoutShop';
import { DataProps, ShopProps } from '../Utils/types';
import AddShopForm from '../Components/forms/AddShopForm';
import UpdateShopForm from '../Components/forms/UpdateShopForm';
import DeleteShopForm from '../Components/forms/DeleteShopForm';
import { Button } from 'antd';
import { useGetShops } from '../Utils/customHooks';
import { userRole } from '../Utils/data';
import NotAuthorized from '../Components/forms/NotAuthorized';


enum ModalState {
    addShop,
    updateShop,
    deleteShop,
    off
}

export const formatShopActions = (shops: ShopProps[], setModalState: any) => {
    return shops.map(item => (
        {
            ...item,
            actions: <div className='action-buttons'>
                <Button
                    className='inventory-edit edit'
                    onClick={() => setModalState(ModalState.updateShop)}
                >
                    EDIT
                </Button>
                <Button
                    className='inventory-delete delete'
                    onClick={() => setModalState(ModalState.deleteShop)}
                >
                    DELETE
                </Button>
            </div>

        }
    ))
}


const Shop: FC = () => {

    const [modalState, setModalState] = useState<ModalState>(ModalState.off)

    const [fetching, setFetching] = useState(true)

    const [record, setRecord] = useState<ShopProps[]>([])

    const [shops, setShops] = useState<ShopProps[]>([])

    const [role, setRole] = useState(false)

    const callBack = (record: any) => {
        setRecord(record)
    }

    useEffect(() => {
        if (localStorage.getItem(userRole) === "admin")
            setRole(true)
    }, [record, role])

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'SHOP NAME', dataIndex: 'name', key: 'name' },
        //{ title: 'CREATED BY', dataIndex: 'created_by', key: 'created_by' },
        { title: 'CREATED AT', dataIndex: 'created_at', key: 'created_at' },
        { title: 'ACTIONS', dataIndex: 'actions', key: 'actions' },
    ]

    useGetShops(setShops, setFetching)
    console.log(shops)

    const onCreateShop = () => {
        setModalState(ModalState.off)
        setFetching(true)
        getShops(setShops, setFetching)
    }

    const onDeleteShop = () => {
    }

    return (
        <>
            <ContentLayoutShop
                pageTitle='Shop'
                pageTitlePlural='Shops'
                setModalState={() => setModalState(ModalState.addShop)}
                dataSource={(formatShopActions(shops, setModalState) as unknown) as DataProps[]}
                columns={columns}
                fetching={fetching}
                onRowClick={callBack}
                setRecord={setRecord}
            >
                {role ? <AddShopForm
                    onSuccessCallBack={onCreateShop}
                    isVisible={modalState === ModalState.addShop}
                    onClose={() => setModalState(ModalState.off)}
                /> : <NotAuthorized
                    isVisible={modalState === ModalState.addShop}
                    onClose={() => setModalState(ModalState.off)}
                />}

                <UpdateShopForm
                    onSuccessCallBack={onCreateShop}
                    isVisible={modalState === ModalState.updateShop}
                    onClose={() => { setModalState(ModalState.off); setRecord([]); }} //; window.location.reload() }}
                    record={record}
                    onRowClick={callBack}
                    setRecord={setRecord}
                />

                {role ? <DeleteShopForm
                    onSuccessCallBack={onDeleteShop}
                    isVisible={modalState === ModalState.deleteShop}
                    onClose={() => setModalState(ModalState.off)}
                    record={record}
                /> : <NotAuthorized
                    isVisible={modalState === ModalState.deleteShop}
                    onClose={() => setModalState(ModalState.off)}
                />}
            </ContentLayoutShop>
        </>

    )

}

export default Shop;