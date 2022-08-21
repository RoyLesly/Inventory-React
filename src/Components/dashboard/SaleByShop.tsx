import { Spin } from "antd"
import { useEffect } from "react"
import { ReactElement, useState } from "react"
import { SaleByShopUrl, SummaryUrl, TopSellingUrl } from "../../Utils/Config"
import { axiosRequest } from "../../Utils/functions"
import SvgFemaleCompUser from '../../assets/SvgFemaleCompUser.svg';
import { Pie } from 'recharts'
import { PieChart } from 'recharts'


interface SaleByProps {
    amount_total: number
    name: string
}

const SaleByShop = () => {

    const [data, setData] = useState<SaleByProps[]>([])

    const [fetching, setFetching] = useState(true)

    const getTopSellData = async () => {

        const response = await axiosRequest<SaleByProps[]>({
            method: "get",
            url: SaleByShopUrl,
            hasAuth: true
        })
        setFetching(false)

        if (response) {
            console.log(response.data)
            setData(response.data)
        }
    }

    useEffect(() => {
        getTopSellData()
    }, [])

    const getChartData = () => {
        return {
            labels: ['Green', 'Red', 'Brown', 'Yellow', 'Orange', 'Blue'],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: 20,
                    backgroundColor: Object.values('Red'),
                }
            ],
        }
    }

    return (<div className="card">
        <h3>Sale By Shop</h3>
        <div className="topSellContainer">
            {
                fetching ? <Spin /> : <p>Pie Chart Here</p>
                // <Pie data={getChartData} options={pieOptions} />
            }
        </div>
    </div>
    )
}

export default SaleByShop;