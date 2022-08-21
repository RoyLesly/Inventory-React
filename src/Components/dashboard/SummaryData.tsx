import { Spin } from "antd"
import { useEffect } from "react"
import { ReactElement, useState } from "react"
import { SummaryUrl } from "../../Utils/Config"
import { axiosRequest } from "../../Utils/functions"
import SvgFemaleCompUser from '../../assets/SvgFemaleCompUser.svg';
import group from '../../assets/group.svg';




interface SummaryDataProps {
    [key: string]: {
        title: string
        count: number
        icon: ReactElement
    }
}

const tempSummary: SummaryDataProps = {
    "total_inventory": { title: "Total Items", count: 0, icon: <span><img src={SvgFemaleCompUser} alt="Dashboard" className='cardIcon' /></span> },
    "total_group": { title: "Total Groups", count: 0, icon: <span><img src={group} alt="Group" className='cardIcon' /></span> },
    "total_shop": { title: "Total Shops", count: 0, icon: <span><img src={group} alt="Group" className='cardIcon' /></span> },
    "total_users": { title: "Total Users", count: 0, icon: <span><img src={group} alt="Group" className='cardIcon' /></span> },
}

const SummaryData = () => {

    const [summaryData, setSummaryData] = useState(tempSummary)

    const [loading, setLoading] = useState(true)

    const getSummaryData = async () => {

        const response = await axiosRequest({
            method: "get",
            url: SummaryUrl,
            hasAuth: true
        })
        setLoading(false)

        if (response) {
            console.log(response)
            const result = response.data as { [key: string]: number }
            const _tempData = { ...summaryData }
            Object.keys(result).map(item => {
                _tempData[item].count = result[item]
                return null
            })
            setSummaryData(_tempData)
        }
    }

    useEffect(() => {
        getSummaryData()
    }, [])

    return <div className="summaryContainer">
        {Object.values(summaryData).map((item, index) => <div key={index} className="summaryContent card">
            <div className="info">
                <div className="title">{item.title}</div>
                <div className="count">{loading ? <Spin /> : item.count}</div>
            </div>
            <div className="cardIcon">{item.icon}</div>
        </div>)
        }
    </div>
}

export default SummaryData;