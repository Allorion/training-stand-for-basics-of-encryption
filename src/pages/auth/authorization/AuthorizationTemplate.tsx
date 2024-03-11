import React, {FC, useEffect, useState} from "react";
import {Button, Container, Paper, Stack, TextField} from "@mui/material";
import {fetchCheckAuthUser} from "./api/ACCheckAuthUser";
import {useNavigate} from "react-router-dom";
import {fetchAuthorization} from "./api/ACAuthorization";
import {useAppDispatch} from "../../../store/hooks/redux";
import {editAuthUser} from "./reducers/AuthUserSlice";

interface IProps {

}

const AuthorizationTemplate: FC<IProps> = ({}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handelEditLogin = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLogin(e.target.value)
    }

    const handelEditPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        fetchCheckAuthUser()
            .then(res => {
                if (res.status === 200) {
                    navigate('/')
                }
            })
    }, []);

    const handleAuth = () => {
        fetchAuthorization({name: login, password})
            .then(resp => {
                if (resp.status === 200) {
                    navigate('/')
                    dispatch(editAuthUser({ authUser: {token: localStorage.getItem('x-auth-token'), valid: true}, userInfo: resp.data }))
                }
            })
    }

    return (
        <React.Fragment>
            <Container>
                <Stack className={'auth-block'} justifyContent={"center"} alignItems={'center'}>
                    <Paper className={'auth-paper'}>
                        <h1>Авторизация</h1>
                        <TextField
                            fullWidth={true}
                            type={'text'}
                            label={'Логин'}
                            value={login}
                            onChange={handelEditLogin}
                        />
                        <TextField
                            fullWidth={true}
                            type={'password'}
                            label={'Пароль'}
                            value={password}
                            onChange={handelEditPassword}
                        />
                        <Button
                            onClick={handleAuth}
                            variant={'contained'}
                        >
                            Авторизоваться
                        </Button>
                    </Paper>
                </Stack>
            </Container>
        </React.Fragment>
    )
};

export default AuthorizationTemplate;