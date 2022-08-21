import { Button, Input, Space, Table } from 'antd';
import { type } from 'os';
import { FC, useState, ReactElement, useEffect } from 'react';
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
    onSorted?: (record: any) => void
}


const ContentLayout: FC<ContentLayoutProps> = ({
    pageTitle, dataSource, columns, fetching, setModalState, children, customName, pageTitlePlural, extraButton,
    disableAddButton = false, setRecord, onSorted
}) => {

    const [users, setUsers] = useState<any | null>(null)

    const [data, setData] = useState<any>(dataSource)

    const [searchData, setSearchData] = useState("")

    let [filteredData] = useState<any>();

    const reset = () => {
        setData(dataSource)
    }

    const handleSearch = (e: any) => {
        if (e.target.value === "") { setSearchData("") }
        else { setSearchData(e.target.value) }
    }
    console.log(searchData)

    useEffect(() => {
        setData(dataSource)
    }, [dataSource])

    useEffect(() => {
        if (searchData.length >= 3) { globalSearch() }
        else { reset() }
    }, [searchData])

    const globalSearch = () => {
        filteredData = dataSource.filter((value) => {
            return (
                value.name.toLowerCase().includes(searchData.toLowerCase()) ||
                value.groupInfo.toLowerCase().includes(searchData.toLowerCase()) ||
                value.code.toLowerCase().includes(searchData.toLowerCase()) ||
                value.code.includes(searchData)
            );
        })
        setData(filteredData)
        console.log("searching ...")
    }


    return (
        <>
            <div className="card">
                <div className='cardHeader'>
                    <h1 className="headContent">{customName ? customName : pageTitlePlural ? pageTitlePlural : `${pageTitle}s`}</h1>
                    <div className="rightContent">
                        <Space style={{ marginBottom: 0, marginRight: 5 }}>
                            <Button onClick={reset} type="primary">Reset Table</Button>
                            <Input placeholder='Enter Search Here ...' type="text" allowClear
                                onChange={handleSearch}
                                value={searchData}
                            />
                        </Space>
                        {/* <div className="searchInput">
                            <input type="text" />
                        </div> */}
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
                    dataSource={data}
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
                    onChange={onSorted}
                />

            </div>

            <div className='content-layout-children'>
                {children}
            </div>

        </>

    )
}

export default ContentLayout;