import Item from 'antd/lib/list/Item';
import { FC, useEffect, useState } from 'react';
import { InvoiceCreationProps } from '../Utils/types';


interface PrintOutItems {
    first_name: string
    email: string
    id: number
    created_at: string
    role: string
    last_login: string
}


const PrintOut: FC<{ data: any, date: string }> = ({ data, date }) => {

    const [printItems, setPrintItems] = useState([])

    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        setPrintItems(data)
        console.log(data)
        let sum = 0
        for (let i = 0; i < data.length; i++) {
            sum += data[i].total
        }
        setTotal(sum)
    }, [printItems])
    const stars = <div>
        {Array.of(10).map((_, index) => <div key={index}>******************************</div>)}
    </div>

    return (
        <div>
            {stars}
            <h2>INVOICE</h2>
            {stars}
            <div>
                <div>
                    TERMINAL #!
                </div>

                <div>
                    <div>
                        {date.slice(0, 10)}
                    </div>
                </div>
                <div>
                    <div>
                        {date.slice(11, 16)}
                    </div>
                </div>
            </div>
            <div>
                {
                    data.map((item: any, index: number) => <div key={index}>
                        <div>
                            {item.qty} X {item.item} = {item.total}
                        </div>
                    </div>)
                }
                <br />
                {total}
            </div>
        </div>)
}

export default PrintOut;