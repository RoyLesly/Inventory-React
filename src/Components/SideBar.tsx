import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SvgFemaleCompUser from '../assets/SvgFemaleCompUser.svg';
import SvgMaleCompUser from '../assets/SvgMaleCompUser.svg';
import group from '../assets/group.svg';
import groupP from '../assets/group.png';
import { userRole } from '../Utils/data';
import NotAuthorized from './forms/NotAuthorized';


const SideBar = () => {

    const navigate = useNavigate()

    const [role, setRole] = useState(false)

    const [activePath, setActivePath] = useState<string>("/")

    useEffect(() => {
        if (localStorage.getItem(userRole) === "admin")
            setRole(true)
        setActivePath(window.location.pathname)
    }, [navigate, role])

    const isActive = (path: string): string => {
        switch (activePath) {
            case path:
                return "active"
            default:
                return ""
        }
    }

    return <>
        <ul>
            <Link to="/">
                {/* <li className={isActive("/")} > */}
                <li className={isActive("/")} >
                    <img src={SvgMaleCompUser} alt="Dashboard" className='linkIcon' />
                    <div className="text">DASHBOARD</div>
                </li>
            </Link>

            <Link to="/groups">
                <li className={isActive("/groups")}>
                    <img src={group} alt="Link3" className='linkIcon' />
                    <div className="text">GROUPS</div>
                </li>
            </Link>

            <Link to="/inventories">
                <li className={isActive("/inventories")}>
                    <img src={SvgMaleCompUser} alt="Inventory" className='linkIcon' />
                    <div className="text">INVENTORY</div>
                </li>
            </Link>

            <Link to="/shops">
                <li className={isActive("/shops")}>
                    <img src={SvgMaleCompUser} alt="Inventory" className='linkIcon' />
                    <div className="text">SHOPS</div>
                </li>
            </Link>

            <Link to="/invoices">
                <li className={isActive("/invoices")}>
                    <img src={SvgMaleCompUser} alt="Inventory" className='linkIcon' />
                    <div className="text">INVOICES</div>
                </li>
            </Link>

            {role ? <><Link to="/users">
                <li className={isActive("/users")}>
                    <img src={SvgFemaleCompUser} alt="user-group" className='linkIcon' />
                    <div className="text">USERS</div>
                </li>
            </Link>

                <Link to="/user-activities">
                    <li className={isActive("/user-activities")}>
                        <img src={SvgMaleCompUser} alt="Inventory" className='linkIcon' />
                        <div className="text">USER ACTIVITIES</div>
                    </li>
                </Link></> : <></>}
        </ul>
    </>
}

export default SideBar;