import React, {FC, useEffect} from "react";
import {Button, CircularProgress, Container, Paper, Stack, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {fetchListRooms} from "./api/ACListRooms";
import {selectAllListRooms} from "./reducers/ListRoomsSlice";
import {fetchJoinToRoom} from "../../global-elements/global-components/connecting-to-room/api/ACJoinToRoom";
import {useNavigate} from "react-router-dom";

interface IProps {

}

const ListRoomsTemplate: FC<IProps> = ({}) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const allListRooms = useAppSelector(selectAllListRooms)

    const {loading, dataRoom} = useAppSelector(state => state.dataRoomReducer)

    const {noData} = useAppSelector(state => state.listRoomsReducer)

    useEffect(() => {
        dispatch(fetchListRooms())
    }, []);

    useEffect(() => {
        if (dataRoom !== null) {
            navigate(`/room/join?token=${dataRoom.token}`)
        }
    }, [dataRoom]);

    useEffect(() => {
        if (noData) {
            alert('Открытых комнат нет')
        }
    }, [noData]);

    const handleJoinRoom = (token: string) => {
        dispatch(fetchJoinToRoom(token))
    }

    return (
        <React.Fragment>
            <Container className={'list-rooms-container'}>
                <div className={'list-rooms-block'}>
                    <header>
                        <Typography variant={'h1'} className={'title'}>Список активных открытых комнат</Typography>
                    </header>
                    <main>
                        <div className={'list-rooms'}>
                            {allListRooms.map((opt, index) => {
                                return (
                                    <Paper className={'room-card'} key={index}>
                                        <div className={'header'}>
                                            <Typography variant={'h5'}>{opt.name}</Typography>
                                        </div>
                                        {/*<div className={'main'}>*/}
                                        {/*    /!*<p>Количество клиентов: <span>2</span></p>*!/*/}
                                        {/*    /!*<p>Создатель комнаты: <span>{opt.}</span></p>*!/*/}
                                        {/*    /!*<p>Клиенты: <span>Дмитрий Иванов, Илья Иванов</span></p>*!/*/}
                                        {/*</div>*/}
                                        <div className={'footer'}>
                                            <Button disabled={loading === 'pending'} color={'primary'}
                                                    onClick={() => handleJoinRoom(opt.token)}>
                                                <Stack direction={'row'} spacing={1}>
                                                    Войти
                                                    {loading === 'pending' && <CircularProgress/>}
                                                </Stack>
                                            </Button>
                                        </div>
                                    </Paper>
                                )
                            })}
                        </div>
                    </main>
                </div>
            </Container>
        </React.Fragment>
    )
};

export default ListRoomsTemplate;