import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';


const Layout = ({ children }: { children: React.ReactNode }) => {

    return <div className='layout'>
        <div className='header'>
            <Header />
        </div>

        <div className="bodyHolder">

            <div className='sideBar'>
                <SideBar />
            </div>

            <div className='mainContent'>
                {children}
            </div>

        </div>

    </div>
}

export default Layout;