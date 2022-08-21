import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SvgFemaleCompUser from '../assets/SvgFemaleCompUser.svg';
import SvgMaleCompUser from '../assets/SvgMaleCompUser.svg';
import { userName } from '../Utils/data';
import { logout } from '../Utils/functions';


const Header = () => {
    const [user, setUser] = useState<string | null>(null)

    useEffect(() => {
        const user_name = localStorage.getItem(userName)
        setUser(user_name)
    }, [user])

    return <>
        <div className="brand">
            <img src={SvgFemaleCompUser} alt="logo" />
        </div>
        <div className="rightNav">
            <div className="userAvatar">
                <img src={SvgMaleCompUser} className="user" />
                <div className="text">Logged In As :<code> {user}</code></div>
            </div>

            <div className="rightItem">
                <Link to="/invoice-section">
                    <div className="newInvoiceButton">
                        New Invoice
                    </div>
                </Link>

                <div className="logoutButton">
                    <div className="text" onClick={logout}>Logout</div>
                </div>
            </div>

        </div>
    </>
}

export default Header;