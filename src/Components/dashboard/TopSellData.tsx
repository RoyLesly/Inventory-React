import { Spin } from "antd"
import { useEffect } from "react"
import { ReactElement, useState } from "react"
import { TopSellingUrl } from "../../Utils/Config"
import { axiosRequest } from "../../Utils/functions"
import { InventoryProps } from "../../Utils/types"


interface TopSellProps {
    [key: string]: {
        title: string
        count: number
        icon: ReactElement
    }
}

const TopSell = () => {

    const [data, setData] = useState<InventoryProps[]>([])

    const [fetching, setFetching] = useState(true)

    const getTopSellData = async () => {

        const response = await axiosRequest<InventoryProps[]>({
            method: "get",
            url: TopSellingUrl,
            hasAuth: true
        })
        setFetching(false)

        if (response) {
            console.log(response.data)
            const data = response.data.map(item => ({
                ...item,
                groupInfo: item.group?.name,
                created_at: (item.created_at)?.toString().slice(0, 10),
                updated_at: (item.updated_at)?.toString().slice(0, 10),
                photoInfo: <img src={item.photo} alt="Photo" />
            }))
            setData(data)
            setFetching(false)
            console.log(data)
        }
    }

    useEffect(() => {
        getTopSellData()
    }, [])

    console.log(data)

    return (<div className="card">
        <h3>Top Selling Items</h3>
        <div className="topSellContainer">
            {
                fetching ? <Spin /> :
                    data.map((item, index) => <div key={index} className="topSellItem">
                        <div className="imageCon">
                            <div
                                className='imageView'
                                style={{
                                    backgroundImage: `url(${item.photo})`,
                                    width: "50px",
                                    height: "50px",
                                }}
                            />
                        </div>
                        <h3>{item.name}</h3>
                        <h4><span>Total Sold: </span>{item.sum_of_item}</h4>
                    </div>)
            }
        </div>
    </div>
    )
}

export default TopSell;