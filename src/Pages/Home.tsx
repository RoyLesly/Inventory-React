import { FC, useContext, useState } from "react";
import { store } from "../Utils/store";
import SummaryData from '../Components/dashboard/SummaryData';
import TopSellData from '../Components/dashboard/TopSellData';
import SaleByShop from '../Components/dashboard/SaleByShop';
import Purchases from '../Components/dashboard/Purchases';


const Home: FC = () => {

    const { state } = useContext(store)

    return <div className="home">
        <SummaryData />
        <br />
        <div className="dashboard-ui-st">
            <TopSellData />
            <div>
                <SaleByShop />
                <br />
                <Purchases />
            </div>
        </div>

    </div>
}

export default Home;