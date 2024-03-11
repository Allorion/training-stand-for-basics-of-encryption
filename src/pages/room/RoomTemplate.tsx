import React, {FC, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {encryptionGost} from "../../global-elements/functions/gost/encryptionGost";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {clearDataRoom} from "./reducer/DataRoomSlice";
import {fetchJoinToRoom} from "../../global-elements/global-components/connecting-to-room/api/ACJoinToRoom";
import {SOCKET} from "../../global-elements/CONSTANTS";
import {decryptionGost} from "../../global-elements/functions/gost/decryptionGost";

interface IProps {

}

// http://localhost:3000/#/room/join?token=e1c51a482af2a757ae0c579ca93f5e49c527608c189198eba122aad235cb26a7

const RoomTemplate: FC<IProps> = ({}) => {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [textMessage, setTextMessage] = useState<string>('')
    const [listMessage, setListMessage] = useState<{ authorId: number, text: string }[]>([])

    const {dataConnectRoom, userInfo} = useAppSelector(state => state.authUserReducer)

    const {dataRoom} = useAppSelector(state => state.dataRoomReducer)

    useEffect(() => {

        if (location.search.split('=')[1] === '') {
            navigate('/')
        }

        const connectToRoom = async () => {
            await dispatch(fetchJoinToRoom(location.search.split('=')[1])).then((e) => {
                if (typeof e.payload !== 'object') {
                    //@ts-ignore
                    navigate(`/`)
                }
            })
        }

        connectToRoom()

        return function cleanup() {
            dispatch(clearDataRoom());
            setListMessage([])
            setTextMessage('')
        }
    }, []);

    const handleEditTextMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= 1000) {
            setTextMessage(e.target.value)
        }
    }

    const handleSendMessage = () => {

        const infoRoom = dataConnectRoom.filter(opt => opt.linkToConnect.split('=')[1] === location.search.split('=')[1])

        if (infoRoom.length > 0) {
            const encryptedHex: string = encryptionGost(infoRoom[0].privateKey, textMessage)
            if (userInfo !== null) {
                SOCKET.emit('sendMessage', {authorId: userInfo.id, text: encryptedHex})
                setTextMessage('')
            }
        }
        // const encryptedHex: string = encryptionGost("a3f9c6e8b72d4a5c1e6f3a9b8c7d2e5f6e3a1b9c8d7e2f5f4a3b9c8d7e2f5f4a", textMessage)
        // const decryptedText: string = decryptionGost("a3f9c6e8b72d4a5c1e6f3a9b8c7d2e5f6e3a1b9c8d7e2f5f4a3b9c8d7e2f5f4a", encryptedHex)
    }

    useEffect(() => {
        const handleMessage = (msg: { authorId: number, text: string }) => {
            setListMessage((prevChat) => [...prevChat, msg])
        };

        SOCKET.on('sendMessage', handleMessage);

        return () => {
            SOCKET.off('sendMessage', handleMessage);
        };
    }, []);

    const decrText = (text: string): string => {

        const infoRoom = dataConnectRoom.filter(opt => opt.linkToConnect.split('=')[1] === location.search.split('=')[1])

        if (infoRoom.length > 0) {
            return decryptionGost(infoRoom[0].privateKey, text)
        } else {
            return text
        }

    }

    return (
        <React.Fragment>

            <div className="container-message">
                <div className="messages">
                    <ul className="message-list">
                        {listMessage.map((opt, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`message-item ${userInfo !== null && (opt.authorId === userInfo.id ? 'user' : 'interlocutor')}`}
                                >
                                    {decrText(opt.text)}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className={'input-message'}>
                    <textarea
                        onChange={handleEditTextMessage}
                        value={textMessage}
                        maxLength={1000}
                        rows={10}
                    />
                    <div className={'send-block'}>
                        <Typography className={'counter'}>{textMessage.length}/1000</Typography>
                        <SendIcon className={'ico-send'} fontSize={'medium'} onClick={handleSendMessage}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default RoomTemplate;