import React, {FC} from "react";
import {Button, Container, Paper, Typography} from "@mui/material";

interface IProps {

}

const ListRoomsTemplate: FC<IProps> = ({}) => {

    return (
        <React.Fragment>
            <Container className={'list-rooms-container'}>
                <header>
                    <Typography variant={'h1'} className={'title'}>Список активных открытых комнат</Typography>
                </header>
                <main>
                    <div className={'list-rooms'}>
                        <Paper className={'room-card'}>
                            <div className={'header'}>
                                <Typography variant={'h5'}>Название комнаты</Typography>
                            </div>
                            <div className={'main'}>
                                <p>Количество клиентов: <span>2</span></p>
                                <p>Создатель комнаты: <span>Иван Иванов</span></p>
                                <p>Клиенты: <span>Дмитрий Иванов, Илья Иванов</span></p>
                            </div>
                            <div className={'footer'}>
                                <Button color={'primary'}>Войти</Button>
                            </div>
                        </Paper>
                        <Paper className={'room-card'}>
                            <div className={'header'}>
                                <Typography variant={'h5'}>Название комнаты</Typography>
                            </div>
                            <div className={'main'}>
                                <p>Количество клиентов: <span>2</span></p>
                                <p>Создатель комнаты: <span>Иван Иванов</span></p>
                                <p>Клиенты: <span>Дмитрий Иванов, Илья Иванов</span></p>
                            </div>
                            <div className={'footer'}>
                                <Button color={'primary'}>Войти</Button>
                            </div>
                        </Paper>
                        <Paper className={'room-card'}>
                            <div className={'header'}>
                                <Typography variant={'h5'}>Название комнаты</Typography>
                            </div>
                            <div className={'main'}>
                                <p>Количество клиентов: <span>2</span></p>
                                <p>Создатель комнаты: <span>Иван Иванов</span></p>
                                <p>Клиенты: <span>Дмитрий Иванов, Илья Иванов</span></p>
                            </div>
                            <div className={'footer'}>
                                <Button color={'primary'}>Войти</Button>
                            </div>
                        </Paper>
                    </div>
                </main>
            </Container>
        </React.Fragment>
    )
};

export default ListRoomsTemplate;