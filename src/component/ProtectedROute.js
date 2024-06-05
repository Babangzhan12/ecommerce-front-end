import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth"


export const ProtectedRoute = ({children}) => {
    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/signin" replace={true} />
    }

    return children;
}