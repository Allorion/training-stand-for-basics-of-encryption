import React, {FC, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Container, Paper, Stack, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {encryptionGost} from "../../global-elements/functions/gost/encryptionGost";
import {decryptionGost} from "../../global-elements/functions/gost/decryptionGost";

interface IProps {

}

const RoomTemplate: FC<IProps> = ({}) => {

    const location = useLocation()

    const [textMessage, setTextMessage] = useState<string>('')
    const [listMessage, setListMessage] = useState<{ authorId: number, text: string }[]>([])

    const USER_ID = 1

    useEffect(() => {
        if (location.search.split('=')[1] !== '') {
            console.log('Токен верный')
        }
    }, []);

    const handleEditTextMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <=1000) {
            setTextMessage(e.target.value)
        }
    }

    const handleSendMessage = () => {

        const encryptedHex: string = encryptionGost("a3f9c6e8b72d4a5c1e6f3a9b8c7d2e5f6e3a1b9c8d7e2f5f4a3b9c8d7e2f5f4a", textMessage)
        const decryptedText: string = decryptionGost("a3f9c6e8b72d4a5c1e6f3a9b8c7d2e5f6e3a1b9c8d7e2f5f4a3b9c8d7e2f5f4a", encryptedHex)

        if (textMessage !== '') {
            setListMessage([...listMessage, {authorId: 1, text: encryptedHex}, {authorId: 2, text: decryptedText}])
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
                                    className={`message-item ${opt.authorId === USER_ID ? 'user' : 'interlocutor'}`}
                                >
                                    {opt.text}
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