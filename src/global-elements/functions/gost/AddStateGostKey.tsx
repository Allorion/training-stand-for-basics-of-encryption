import React, {FC, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Stack,
    FormControlLabel,
    Checkbox,
    FormGroup, TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FileChange from "../../global-components/FileChange";
import {decryptionRSA} from "../rsa/decryptionRSA";

interface IProps {

}

const AddStateGostKey: FC<IProps> = ({}) => {

    const [open, setOpen] = React.useState(false);

    const [privateKeyRsa, setPrivateKeyRsa] = useState<string>('')
    const [privatecKeyGost, setPrivateKeyGost] = useState<string>('')
    const [urlToRoom, setUrlToRoom] = useState<string>('')
    const [flagUrlToRoomFile, setFlagUrlToRoomFile] = useState<boolean>(false)
    const [listKeyGost, setListKeyGost] = useState<{url: string, key: string}[]>([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChangeRsa = (event: string) => {
        setPrivateKeyRsa(event)
    };

    const handleFileChangeGost = (event: string) => {
        setPrivateKeyGost(event)
    };

    const handleUrlToRoom = (event: string) => {
        if (privateKeyRsa !== '') {
            setUrlToRoom(decryptionRSA(event, privateKeyRsa))
        } else {
            alert('Сначала добавьте закрытый ключ RSA')
        }
    };

    const handleAddGostKey = () => {

        const newKeyGost: string = decryptionRSA(privatecKeyGost, privateKeyRsa)

        const duplicate = listKeyGost.filter(opt => opt.key === newKeyGost || opt.url === urlToRoom)

        const warning: string[] = []

        if (privatecKeyGost === '') {
            warning.push('- Добавьте приватный ключ ГОСТ')
        }
        if (privateKeyRsa === '') {
            warning.push('- Добавьте приватный ключ RSA')
        }
        if (duplicate.length > 0) {
            warning.push('- Данный ключ или ссылка-приглашение уже добавлены')
        }
        if (urlToRoom === '') {
            warning.push('- Добавьте ссылку-приглашение')
        }

        if (warning.length > 0) {
            alert(warning.join('\n'))
        } else {
            setListKeyGost([...listKeyGost, { url: urlToRoom, key: newKeyGost }])
        }
    }

    const handleFlagUrlToRoomFile = () => {
        setUrlToRoom('')
        setFlagUrlToRoomFile(!flagUrlToRoomFile)
    }

    const handleTextUrlToRoom = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUrlToRoom(event.target.value)
    }

    return (
        <React.Fragment>
            <MenuItem onClick={handleClickOpen}>
                <Typography textAlign="center">Добавит закрытый ключ ГОСТ 28147-89</Typography>
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Добавит закрытый ключ ГОСТ 28147-89</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} direction={'column'}>
                        <Typography sx={{textIndent: '30px'}}>
                            * Добавленные ключи имеют срок жизни до момента перезапуска страницы или сброса сессии
                        </Typography>
                        <Typography sx={{textIndent: '30px'}}>
                            В программу можно добавить несколько закрытых ключей. Ключ ГОСТ 28147-89 буден добавлен
                            только к той ссылке-приглашение которая будет указана в форме
                        </Typography>
                        <FileChange
                            label={'Закрытый ключ RSA'}
                            onChange={handleFileChangeRsa}
                            accept={'.pem'}
                        />
                        <FileChange
                            label={'Зашифрованный ключ ГОСТ 28147-89'}
                            onChange={handleFileChangeGost}
                            accept={'.rsa'}
                        />
                        {privateKeyRsa !== '' &&
                            <>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={flagUrlToRoomFile}
                                                onClick={handleFlagUrlToRoomFile}
                                            />
                                        }
                                        label="Зашифрованная ссылка-приглашение"
                                    />
                                </FormGroup>
                                {flagUrlToRoomFile ?
                                    <FileChange
                                        label={'Зашифрованная ссылка-приглашение'}
                                        onChange={handleUrlToRoom}
                                        accept={'.rsa'}
                                    />
                                    :
                                    <TextField
                                        fullWidth={true}
                                        label={'Ссылка-приглашение'}
                                        value={urlToRoom}
                                        onChange={handleTextUrlToRoom}
                                    />
                                }
                            </>
                        }
                        {urlToRoom !== '' &&
                            <Paper sx={{width: '100%', padding: '8px'}}>
                                <Typography variant={'body1'} sx={{wordBreak: 'break-all'}}>
                                    {urlToRoom}
                                </Typography>
                            </Paper>
                        }
                        <List sx={{width: '100%', maxHeight: 300, overflowY: 'auto', bgcolor: 'background.paper'}}>
                            {listKeyGost.map((opt, index) => {
                                return (
                                    <ListItem key={index}>
                                        <Paper sx={{width: '100%', padding: '8px', wordBreak: 'break-all'}}>
                                            <ListItemText primary={<>Ключ для комнаты:<b>{opt.url}</b></>}
                                                          secondary={`${opt.key.slice(0, 5)}...................${opt.key.slice(59, 64)}`}/>
                                        </Paper>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color={'error'} onClick={handleClose}>Закрыть</Button>
                    <Button disabled={privatecKeyGost === '' && privateKeyRsa === ''} color={'success'}
                            onClick={handleAddGostKey}>Добавить</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};

export default AddStateGostKey;