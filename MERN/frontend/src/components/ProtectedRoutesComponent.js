import { Outlet, Navigate } from "react-router-dom"
import AdminAnalyticsPage from "../pages/admin/AdminAnalyticsPage";
import UserChatComponent from "./user/UserChatComponent";

const ProtectedRoutesComponent = ({ admin }) => {
    // let auth = false;
    if (admin) {
        let adminAuth = true;
        // if (adminAuth) auth = true;
        return adminAuth ? <Outlet /> : <Navigate to="/login" />;
    } else {
        let userAuth = true;
        // if (userAuth) auth = true;
        return userAuth ?
            <>
                <UserChatComponent />
                <Outlet />
            </> : <Navigate to="/login" />
    }
    // return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutesComponent;