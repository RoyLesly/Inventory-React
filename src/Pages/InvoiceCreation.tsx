import '../styles/style.scss';
import { ChangeEvent, FC, useState, useRef } from "react";
import { DataProps, InventoryProps, InvoiceCreationAddRemoveProps, InvoiceCreationProps, ShopProps } from '../Utils/types';
import { useGetInventories, useGetShops } from '../Utils/customHooks';
import SelectShop from '../Components/forms/SelectShop';
import { formatInventoryPhoto } from './Inventories';
import { Table, Button, notification } from 'antd';
import { axiosRequest } from '../Utils/functions';
import { InvoiceUrl } from '../Utils/Config';
import { useReactToPrint } from 'react-to-print';
import PrintOut from '../Components/PrintOut';


const formatInventoryAction = (
    inventories: DataProps[],
    onAddItem: (InventoryData: InventoryProps) => void,
    onChangeQty: (val: number, inventory_id: number) => void
) => {

    return inventories.map(item => (
        {
            ...item,
            key: item.id,
            action: <div>
                <input
                    type="number"
                    min={1}
                    max={(item.remaining as number)}
                    defaultValue={1}
                    onChange={
                        (e: ChangeEvent<HTMLInputElement>) => onChangeQty(parseInt(e.target.value), item.id as number)
                    }
                />
                <Button onClick={() => onAddItem((item as unknown) as InventoryProps)}>Add</Button>
            </div>
        }
    ))
}

const formatInvoiceDataAction = (
    invoiceData: InvoiceCreationProps[],
    onRemoveItem: (InventoryId: number) => void,
    onChangeQty: (val: number, inventory_id: number) => void,
) => {

    return invoiceData.map(item => (
        {
            ...item,
            key: item.id,
            total: item.price * item.qty,
            action: <div>
                <input
                    type="number"
                    min={1}
                    max={item.qty}
                    defaultValue={1}
                    onChange={
                        (e: ChangeEvent<HTMLInputElement>) => onChangeQty(parseInt(e.target.value), (item.id))
                    }
                />
                <Button onClick={() => onRemoveItem(item.id)}>Remove</Button>
            </div>
        }
    ))
}

const InvoiceCreation: FC = () => {

    const [fetching, setFetching] = useState(true)

    const [inventories, setInventories] = useState<InventoryProps[]>([])

    const [invoiceData, setInvoiceData] = useState<InvoiceCreationProps[]>([])

    const [invoiceItemQty, setInvoiceItemQty] = useState<InvoiceCreationAddRemoveProps>({})

    const [invoiceItemDataQty, setInvoiceItemDataQty] = useState<InvoiceCreationAddRemoveProps>({})

    const [shops, setShops] = useState<ShopProps[]>([])

    const [selectShopVisible, setSelectShopVisible] = useState(false)

    const [canPrintOut, setCanPrintOut] = useState(false)

    const [loading, setLoading] = useState(false)

    const printOutToRef = useRef<any>()

    useGetShops(setShops, () => null)


    const inventory_columns = [
        //{ title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Code', dataIndex: 'code', key: 'code' },
        { title: 'Photo', dataIndex: 'photoInfo', key: 'photoInfo' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Remaining', dataIndex: 'remaining', key: 'remaining' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Actions', dataIndex: 'action', key: 'action' },
    ]

    const invoice_columns = [
        { title: 'Item', dataIndex: 'item', key: 'item' },
        { title: 'Qty', dataIndex: 'qty', key: 'qty' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Total', dataIndex: 'total', key: 'total' },
        { title: 'Action', dataIndex: 'action', key: 'action' },
    ]

    useGetInventories(setInventories, setFetching)

    const addItemToInvoiceData = (InventoryData: DataProps) => {
        const qty = invoiceItemQty[InventoryData.id] || 1
        let _invoiceData: InvoiceCreationProps[] = []
        let qtyFlag = false;

        const item = invoiceData.filter(item => item.id === InventoryData.id)

        if (item.length > 0) {
            _invoiceData = invoiceData.map(item => {
                if (item.id === InventoryData.id) {
                    const _qty = item.qty + qty
                    if (_qty > InventoryData.remaining) {
                        qtyFlag = true
                    }
                    return {
                        ...item,
                        qty: _qty
                    }
                }
                return item
            })
        }
        else {
            const _tempInvoiceData: InvoiceCreationProps = {
                id: InventoryData.id,
                item: InventoryData.name,
                qty,
                price: InventoryData.price,
                total: InventoryData.price * qty,
            }
            if (qty > InventoryData.remaining) {
                qtyFlag = true
            }
            _invoiceData = [...invoiceData, _tempInvoiceData]
        }
        if (qtyFlag) {
            notification.error({
                message: "Not Enough Items Remaining"
            })
            return
        }
        setInvoiceData(_invoiceData)
    }

    const removeItemFromInvoiceData = (inventoryId: number) => {
        const qty = invoiceItemQty[inventoryId] || 1
        let _invoiceData: InvoiceCreationProps[] = []

        const item = invoiceData.filter(item => item.id === inventoryId)[0]
        if (qty >= item.qty) {
            _invoiceData = invoiceData.filter(item => item.id !== inventoryId)
        }
        else {
            _invoiceData = invoiceData.map(item => {
                if (item.id === inventoryId) {
                    return {
                        ...item,
                        qty: item.qty - qty
                    }
                }
                return item
            })
        }
        setInvoiceData(_invoiceData)
    }

    const changeInventoryAddQty = (val: number, inventory_id: number) => {
        setInvoiceItemDataQty({
            ...invoiceItemQty,
            [inventory_id]: val
        })
    }

    const changeInventoryRemoveQty = (val: number, inventory_id: number) => {
        setInvoiceItemQty({
            ...invoiceItemQty,
            [inventory_id]: val
        })
    }

    const handlePrint = useReactToPrint({
        content: () => printOutToRef.current,
    })

    const clearInvoiceData = () => {
        setInvoiceData([])
        setInvoiceItemDataQty({})
    }

    const submitInvoice = async (data?: number) => {
        setSelectShopVisible(false)
        const dataToSend = {
            shop_id: data,
            invoice_item_data: invoiceData.map(item => ({
                item_id: item.id,
                quantity: item.qty
            }))
        }
        setLoading(true)

        const response = await axiosRequest({
            method: "post",
            url: InvoiceUrl,
            payload: dataToSend,
            hasAuth: true,
            //headers: {...headers}
        })

        setLoading(false)
        if (response) {
            notification.success({
                message: "Operation Successful",
                description: "Invoice Created Successfully"
            })
        }
        // handlePrint()
    }
    const getShopId = () => {
        if (invoiceData.length < 1) {
            notification.error({
                message: "You need to have an Invoice Item First"
            })
            return
        }
        setSelectShopVisible(true)
    }

    const getTotal = () => {
        return invoiceData.reduce((sum: number, item: InvoiceCreationProps) =>
            sum += item.price * item.qty, 0
        )
    }

    const getDate = () => {
        const date = new Date()
        console.log(date.getMonth())
        let x = date.getFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getDate()
        return x
    }

    return (
        <div className='invoice-creation'>
            <div className="invoice-card-body-table">

                <div className="card">
                    <div className='invoice-card-header'>
                        <h1 className="invoice-card-header-title">Inventory Management</h1>
                        <div className="rightContent">
                            <div className="searchInput">
                                <input type="text" />
                            </div>
                        </div>
                    </div>

                    <br />

                    <Table
                        dataSource={formatInventoryAction(
                            formatInventoryPhoto(inventories, ""),
                            addItemToInvoiceData,
                            changeInventoryAddQty
                        )}
                        columns={inventory_columns}
                        loading={fetching}
                    />
                </div>

            </div>

            <div className="invoice-card-body-invoice">
                <div className="card">
                    <Table
                        dataSource={formatInvoiceDataAction(
                            invoiceData,
                            removeItemFromInvoiceData,
                            changeInventoryRemoveQty,
                        )}
                        columns={invoice_columns}
                        pagination={false}
                    />
                    <div className='contentContainer'>
                        <div className="contentHolder">
                            <div className="info">Date</div>
                            <div className="content">{getDate()}</div>
                        </div>

                        <div className="contentHolder">
                            <div className="info">Total </div>
                            <div className="content">{getTotal()}</div>
                        </div>
                    </div>
                </div>
                <br />
                {/* <div className='card'> */}
                <div>
                    <Button type='primary' onClick={getShopId} loading={loading} >Save & Print</Button> &nbsp;&nbsp;
                    <Button danger onClick={clearInvoiceData}>Clear</Button>
                </div>
            </div>

            <SelectShop
                isVisible={selectShopVisible}
                onSuccessCallBack={submitInvoice}
                onClose={() => setSelectShopVisible(false)}
                shops={shops}
            />

            <div ref={printOutToRef}>
                {canPrintOut && <PrintOut data={invoiceData} date={""} />}
            </div>
        </div>
    )
}

export default InvoiceCreation;