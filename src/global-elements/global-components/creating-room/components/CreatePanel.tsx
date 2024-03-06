import React, {FC, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Paper,
    Stack,
    TextField
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import {generateToken} from "../../../functions/generateToken";
import {generateGostKey} from "../../../functions/gost/generateGostKey";
import {fetchCreateRoom} from "../api/ACCreateRoom";

interface IProps {

}

const CreatePanel: FC<IProps> = ({}) => {

    const [invitationLink, setInvitationLink] = useState<string>('')
    const [nameRoom, setNameRoom] = useState<string>('')
    const [flagCloseRoom, setFlagCloseRoom] = useState<boolean>(false)
    const [keyRoom, setKeyRoom] = useState<string>('')

    const handleNameRoom = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNameRoom(e.target.value)
    }

    const handleFlagCloseRoom = () => {
        setFlagCloseRoom(!flagCloseRoom)
    }

    const createKeyGost = () => {
        // Пример использования функции
        // Генерируем ключ
        setKeyRoom(generateGostKey())
    }

    const createInvitationLink: React.MouseEventHandler<HTMLButtonElement> | undefined = () => {

        const warning: string[] = []

        if (nameRoom === '') {
            warning.push('- Введите название комнаты')
        }
        if (keyRoom === '') {
            warning.push('- Сгенерируйте закрытый ключ ГОСТ 28147-89')
        }

        if (warning.length > 0) {
            alert(warning.join('\n'))
        } else {
            // Создаем ссылку-приглашение с уникальным токеном из библиотеки jsonwebtoken
            setInvitationLink(`${window.location.href}#/room/join?token=${generateToken(nameRoom, keyRoom).token}`)
        }
    }

    const handleCreateRoom = () => {

        const warning: string[] = []

        if (nameRoom === '') {
            warning.push('- Введите название комнаты')
        }
        if (keyRoom === '') {
            warning.push('- Сгенерируйте закрытый ключ ГОСТ 28147-89')
        }
        if (invitationLink === '') {
            warning.push('- Введите название комнаты')
        }

        if (warning.length > 0) {
            alert(warning.join('\n'))
        } else {
            fetchCreateRoom({token: invitationLink.split('token=')[1], closed: flagCloseRoom, name: nameRoom})
        }
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="creating-room-template-create-panel-header"
                id="creating-room-template-create-panel-header"
            >
                Создание комнаты
            </AccordionSummary>
            <AccordionDetails className={'bloc-create'}>
                <Stack spacing={2} direction={'column'}>
                    <TextField
                        required={true}
                        label={'Название комнаты'}
                        value={nameRoom}
                        onChange={handleNameRoom}
                    />
                    <FormGroup>
                        <FormControlLabel control={
                            <Checkbox
                                checked={flagCloseRoom}
                                onClick={handleFlagCloseRoom}
                            />
                        } label="Закрытая комната"/>
                    </FormGroup>
                    <Button
                        onClick={createKeyGost}
                    >
                        Сгенерировать закрытый ключ ГОСТ 28147-89
                    </Button>
                    {keyRoom !== '' &&
                        <Paper sx={{padding: '16px'}}>
                            <p>Закрытый ключ:</p>
                            <p style={{fontWeight: 700, marginTop: '8px'}}>{keyRoom}</p>
                        </Paper>
                    }
                    <Button
                        disabled={nameRoom === '' || keyRoom === ''}
                        onClick={createInvitationLink}
                    >
                        Сгенерировать ссылку приглашение
                    </Button>
                    {invitationLink !== '' &&
                        <Paper sx={{padding: '16px'}}>
                            <p>Ссылка-приглашение:</p>
                            <p style={{fontWeight: 700, marginTop: '8px', wordBreak: 'break-all'}}>{invitationLink}</p>
                        </Paper>
                    }
                    <Button
                        color={'success'}
                        variant={'outlined'}
                        disabled={invitationLink === '' || nameRoom === '' || keyRoom === ''}
                        onClick={handleCreateRoom}
                    >
                        Создать комнату
                    </Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
};

export default CreatePanel;