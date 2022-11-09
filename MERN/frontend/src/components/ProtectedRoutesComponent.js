import { Outlet, Navigate} from "react-router-dom"

const ProtectedRoutesComponent = ({admin}) => {
    let auth = false;
    if (admin) {
        let adminAuth = false
        if (adminAuth) auth = true
    } else {
        let userAuth = true
        if (userAuth) auth = true
    }
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutesComponent