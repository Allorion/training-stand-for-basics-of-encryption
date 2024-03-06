import React, {FC, useReducer} from "react";
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {MenuItem} from "@mui/material";
import InfoPanel from "./components/InfoPanel";
import CreatePanel from "./components/CreatePanel";
import EncryptionPanel from "./components/EncryptionPanel";

interface IProps {
    button: 'desktop' | 'phone'
}

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const CreatingRoomTemplate: FC<IProps> = ({button}) => {

    const [open, toggleOpen] = useReducer((v) => !v, false);

    return (
        <React.Fragment>
            {button === 'desktop' ?
                <Button
                    onClick={toggleOpen}
                    sx={{my: 2, color: 'white', display: 'block'}}
                >
                    Создать комнату
                </Button>
                :
                <MenuItem onClick={toggleOpen}>
                    <Typography textAlign="center">Создать комнату</Typography>
                </MenuItem>
            }
            <BootstrapDialog
                onClose={toggleOpen}
                aria-labelledby="creating-room-template"
                open={open}
            >
                <DialogTitle sx={{m: 0, p: 2}} id="creating-room-template">
                    Окно создания комнаты для обмена зашифрованной информацией
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={toggleOpen}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <InfoPanel/>
                    <CreatePanel/>
                    <EncryptionPanel/>
                </DialogContent>
                <DialogActions>
                    <Button color={'error'} autoFocus onClick={toggleOpen}>
                        Закрыть
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    )
};

export default CreatingRoomTemplate;