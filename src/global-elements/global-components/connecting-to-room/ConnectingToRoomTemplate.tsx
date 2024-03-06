import React, {FC, useEffect, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {CircularProgress, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {fetchJoinToRoom} from "./api/ACJoinToRoom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/redux";

interface IProps {
    button: 'desktop' | 'phone'
}

const ConnectingToRoomTemplate: FC<IProps> = ({button}) => {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState<{ url: string, error: boolean }>({url: '', error: false})

    const {noData, loading, dataRoom} = useAppSelector(state => state.dataRoomReducer)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditUrl = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({url: e.target.value, error: false})
    }

    const handleCheckUrl = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const splitUrl = data.url.split('/')
        if (splitUrl[2] !== window.location.host && data.url !== '') {
            setData({url: data.url, error: true})
        }
    }

    const handleConnectToRoom = () => {

        const error: string[] = []

        if (data.url === '') {
            error.push('- Не добавлена ссылка на комнату')
        }

        if (data.error) {
            error.push('- В ссылке допущена ошибка')
        }

        if (loading === 'pending') {
            error.push('- В ссылке допущена ошибка')
        }

        if (error.length > 0) {
            alert(error.join('\n'))
        } else {
            const splitUrl = data.url.split('token=')[1]
            dispatch(fetchJoinToRoom(splitUrl))
        }

    }

    useEffect(() => {
        if (noData !== null) {
            alert(noData)
        }
    }, [noData]);

    useEffect(() => {
        if (dataRoom !== null) {
            navigate(`/room/join?token=${dataRoom.token}`)
            setOpen(false)
        }
    }, [dataRoom]);

    useEffect(() => {
        return function cleanup() {
            setData({url: '', error: false})
        }
    }, []);

    return (
        <React.Fragment>
            {button === 'desktop' ?
                <Button
                    onClick={handleClickOpen}
                    sx={{my: 2, color: 'white', display: 'block'}}
                >
                    Подключиться к комнате
                </Button>
                :
                <MenuItem onClick={handleClickOpen}>
                    <Typography textAlign="center">Подключиться к комнате</Typography>
                </MenuItem>
            }
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Подключится к комнате по ссылке-приглашение</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Получите ссылку-приглашение от хоста (создателя закрытой комнаты) и добавьте ее в поле снизу
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        margin={'dense'}
                        label={"Ссылка-приглашение"}
                        type={"text"}
                        variant={'standard'}
                        value={data.url}
                        onChange={handleEditUrl}
                        onBlur={handleCheckUrl}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color={'error'} onClick={handleClose}>Отмена</Button>
                    <Button disabled={data.url === '' || data.error || loading === 'pending'} type="submit"
                            color={'success'}
                            onClick={handleConnectToRoom}>Подключиться {loading === 'pending' &&
                        <CircularProgress/>}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};

export default ConnectingToRoomTemplate;