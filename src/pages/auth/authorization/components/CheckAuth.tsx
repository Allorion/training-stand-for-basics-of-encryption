import React, {FC, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchCheckAuthUser} from "../api/ACCheckAuthUser";


const CheckAuth: FC = () => {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        fetchCheckAuthUser().then((status) => {
            if (status === 401) {
                navigate(`/auth`)
            }
        })
    }, [location.pathname])

    return <React.Fragment/>;

}

export default CheckAuth
