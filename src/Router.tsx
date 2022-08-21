import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FC } from 'react';
import Login from './Pages/Login';
import CheckUser from './Pages/CheckUser';
import AuthRoute from './Components/AuthRoute';
import Home from './Pages/Home';
import User from './Pages/User';
import Groups from './Pages/Groups';
import UpdateUserPassword from './Pages/UpdateUserPassword';
import Inventories from './Pages/Inventories';
import Shop from './Pages/Shop';
import UserActivities from './Pages/UserActivities';
import InvoiceCreation from './Pages/InvoiceCreation';
import Invoice from './Pages/Invoice';
//import AuthRoute from './Components/AuthRoute';

const Router: FC = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/check-user" element={<CheckUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-password" element={<UpdateUserPassword />} />
            <Route path="/" element={<AuthRoute><Home /></AuthRoute>} />
            <Route path="/users" element={<AuthRoute><User /></AuthRoute>} />
            <Route path="/groups" element={<AuthRoute><Groups /></AuthRoute>} />
            <Route path="/inventories" element={<AuthRoute><Inventories /></AuthRoute>} />
            <Route path="/shops" element={<AuthRoute><Shop /></AuthRoute>} />
            <Route path="/user-activities" element={<AuthRoute><UserActivities /></AuthRoute>} />
            <Route path="/invoice-section" element={<AuthRoute><InvoiceCreation /></AuthRoute>} />
            <Route path="/invoices" element={<AuthRoute><Invoice /></AuthRoute>} />
        </Routes>
    </BrowserRouter>
}

export default Router;
