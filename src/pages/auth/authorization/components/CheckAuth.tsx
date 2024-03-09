import React, {FC, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchCheckAuthUser} from "../api/ACCheckAuthUser";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {clearAuthUser, editAuthUser} from "../reducers/AuthUserSlice";


const CheckAuth: FC = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchCheckAuthUser().then((status) => {
            if (status === 401) {
                dispatch(clearAuthUser())
                navigate(`/auth`)
            } else {
                dispatch(editAuthUser({ token: localStorage.getItem('x-auth-token'), valid: true }))
            }
        })
    }, [location.pathname])

    return <React.Fragment/>;

}

export default CheckAuth
