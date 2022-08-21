import '../styles/user.scss';
import { FC, useEffect, useRef, useState } from "react";
import ContentLayoutInvoice from '../Components/ContentLayoutInvoice';
import { DataProps, InvoiceCreationProps, InvoiceType } from '../Utils/types';
import { useGetInvoice } from '../Utils/customHooks';
import { Button } from 'antd';
import PrintOut from '../Components/PrintOut';
import ReactToPrint, { useReactToPrint } from 'react-to-print';


const Invoice: FC = () => {

    const [fetching, setFetching] = useState(true)

    const [invoices, setInvoices] = useState<InvoiceType[]>([])

    const [invoiceData, setInvoiceData] = useState<InvoiceCreationProps[]>([])

    const [canPrintOut, setCanPrintOut] = useState(false)

    const [date, setDate] = useState('')

    const printOutToRef = useRef<any>()

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'SHOP', dataIndex: 'shop_name', key: 'shop_name' },
        { title: 'CREATED BY', dataIndex: 'created_by', key: 'created_by' },
        { title: 'CREATED AT', dataIndex: 'created_at', key: 'created_at' },
        { title: 'ACTION', dataIndex: 'action', key: 'action' },
    ]

    useGetInvoice(setInvoices, setFetching)

    const handlePrint = useReactToPrint({
        content: () => printOutToRef.current,
    })

    const printData = (i: InvoiceCreationProps[], j: any) => {
        setInvoiceData(i)
        setCanPrintOut(true)
        setDate(j.created_at)
    }

    useEffect(() => {
        if (canPrintOut) {
            handlePrint()
            setCanPrintOut(false)
        }
    }, [canPrintOut])

    const pushActionToList = () => {
        let gtotal = 0
        for (let i = 0; i < invoices.length; i++) {
            let total = 0
            console.log(invoices[i])
            for (let j = 0; j < invoices[i].invoice_items.length; j++) {
                gtotal += invoices[i].invoice_items[j].total
                total += invoices[i].invoice_items[j].total
            }
        }
        invoices.map(item => ({
            ...item,

        }))

        return invoices.map(item => ({
            ...item,
            action: <div className='action-buttons'>
                <Button className='invoice-print edit' onClick={() => printData(item.invoice_items, item)}>PRINT</Button>
                <Button className='invoice-view delete'>VIEW </Button>
            </div>,

        }))
    }

    return (
        <>
            <ContentLayoutInvoice
                pageTitle='Invoice'
                pageTitlePlural="Invoices"
                dataSource={(pushActionToList() as unknown) as DataProps[]}
                columns={columns}
                fetching={fetching}
                disableAddButton
            />
            <div ref={printOutToRef}>
                {canPrintOut && <PrintOut data={invoiceData} date={date} />}
            </div>
        </>
    )

}

export default Invoice;