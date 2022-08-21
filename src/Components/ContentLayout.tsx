import { Table } from 'antd';
import { FC, useState, ReactElement } from 'react';
import { DataProps, InventoryProps } from '../Utils/types';

interface ContentLayoutProps {
    pageTitle: string
    pageTitlePlural?: string
    setModalState?: (val: boolean) => void
    dataSource: DataProps[]
    columns: DataProps[]
    fetching: boolean
    children: React.ReactNode
    customName?: string
    extraButton?: ReactElement
    disableAddButton?: boolean
    onRowClick?: (record: InventoryProps[]) => void
    setRecord?: (record: InventoryProps[]) => void
}


const ContentLayout: FC<ContentLayoutProps> = ({
    pageTitle, dataSource, columns, fetching, setModalState, children, customName, pageTitlePlural, extraButton,
    disableAddButton = false, onRowClick, setRecord
}) => {

    // console.log(onRowClick)
    // console.log(setRecord)

    const [users, setUsers] = useState<any | null>(null)


    return (
        <>
            <div className="card">
                <div className='cardHeader'>
                    <h1 className="headContent">{customName ? customName : pageTitlePlural ? pageTitlePlural : `${pageTitle}s`}</h1>
                    <div className="rightContent">
                        <div className="searchInput">
                            <input type="text" />
                        </div>
                        {
                            !disableAddButton && <button onClick={() => setModalState && setModalState(true)} >
                                Add {pageTitlePlural ? pageTitlePlural : pageTitle}
                            </button>
                        }

                        {extraButton}
                    </div>
                </div>

                <br />

                <Table
                    dataSource={dataSource}
                    columns={columns}
                    loading={fetching}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (e) => {

                                if (setRecord) {
                                    console.log("Record Set")
                                    setRecord(record as InventoryProps[])
                                }
                                // console.log(record)
                                // console.log(rowIndex)
                            }
                        }
                    }}
                />

            </div>

            <div className='content-layout-children'>
                {children}
            </div>

        </>

    )
}

export default ContentLayout;