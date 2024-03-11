import React, {FC, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchCheckAuthUser} from "../api/ACCheckAuthUser";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks/redux";
import {clearAuthUser, editAuthUser} from "../reducers/AuthUserSlice";


const CheckAuth: FC = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()

    const {userInfo, authUser} = useAppSelector(state => state.authUserReducer)

    useEffect(() => {
        fetchCheckAuthUser().then((resp) => {
            if (resp.status === 401 || resp.status === 500) {
                dispatch(clearAuthUser())
                navigate(`/auth`)
            } else {
                if (userInfo === null || authUser.token === null || !authUser.valid) {
                    dispatch(editAuthUser({ authUser: {token: localStorage.getItem('x-auth-token'), valid: true}, userInfo: resp.data }))
                }
            }
        })
    }, [location.pathname])

    return <React.Fragment/>;

}

export default CheckAuth
