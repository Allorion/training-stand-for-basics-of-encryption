import React, {FC, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Stack, TextField} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {encryptionRSA} from "../../../functions/rsa/encryptionRSA";
import FileChange from "../../FileChange";

interface IProps {

}

const EncryptionPanel: FC<IProps> = ({}) => {

    const [publicKey, setPublicKey] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const handleFileChange = (event: string) => {
        setPublicKey(event)
    };

    const handleEncryptedData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const handleEncrypted = () => {
        if (message !== '' && publicKey !== '') {
            encryptionRSA(publicKey, message)
        }
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="creating-room-template-encryption-panel-header"
                id="creating-room-template-encryption-panel-header"
            >
                Шифрование
            </AccordionSummary>
            <AccordionDetails className={'bloc-gost'}>
                <Stack spacing={2} direction={'column'}>
                    <Stack>
                        <FileChange
                            label={'Добавить открытый ключ клиента'}
                            onChange={handleFileChange}
                            accept={'.pem'}
                        />
                    </Stack>
                    <TextField
                        required={true}
                        disabled={publicKey === ''}
                        label={'Данные для шифрования'}
                        value={message}
                        onChange={handleEncryptedData}
                    />
                    <Button
                        disabled={publicKey === '' || message === ''}
                        color={'success'}
                        onClick={handleEncrypted}
                    >
                        Зашифровать
                    </Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
};

export default EncryptionPanel;