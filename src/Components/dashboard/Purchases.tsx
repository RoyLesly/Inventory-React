import { Spin } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { PurchaseSummaryUrl } from "../../Utils/Config"
import { axiosRequest } from "../../Utils/functions"


interface PurchaseSummaryProps {
    price: number
    count: number
}

const Purchases = () => {

    const [data, setData] = useState<PurchaseSummaryProps>()

    const [fetching, setFetching] = useState(true)

    const getPurchaseData = async () => {

        const response = await axiosRequest<PurchaseSummaryProps>({
            method: "get",
            url: PurchaseSummaryUrl,
            hasAuth: true
        })
        setFetching(false)

        if (response) {
            console.log(response.data)
            setData(response.data)
            setFetching(false)
        }
    }

    useEffect(() => {
        getPurchaseData()
    }, [])

    return (<div className="card">
        <h3>Purchase</h3>
        <div className="purchaseSummary">
            <div className="content">
                <div className="title"><span>Price: </span>{fetching ? <Spin /> : <p>Pie Chart Here</p>}</div>
                <div className="info"><span>Count: </span>{data?.count}</div>
            </div>

            {
                fetching ? <Spin /> : <p>Pie Chart Here</p>
                // <Pie data={getChartData} options={pieOptions} />
            }
        </div>
    </div>
    )
}

export default Purchases;