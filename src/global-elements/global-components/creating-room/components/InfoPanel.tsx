import React, {FC} from "react";
import {Accordion, AccordionDetails, AccordionSummary, ListItem} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

interface IProps {

}

const InfoPanel: FC<IProps> = ({}) => {

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="creating-room-template-info-panel-header"
                id="creating-room-template-info-panel-header"
            >
                Общая информация
            </AccordionSummary>
            <AccordionDetails className={'bloc-info'}>
                <Typography gutterBottom>
                    Созданные комнат разделяется на два вида
                    <ul>
                        <li><ListItem>- Открытая</ListItem></li>
                        <li><ListItem>- Закрытая</ListItem></li>
                    </ul>
                </Typography>
                <Typography sx={{textIndent: '30px'}}>
                    Открытые комнаты видны в списке комнат, любой пользователь приложения может посетить
                    такую комнату.
                    В случае отсутствия закрытого ключа, зашедший пользователь будет наблюдать лишь
                    зашифрованные сообщения
                </Typography>
                <Typography sx={{textIndent: '30px'}}>
                    Доступ к закрытой комнате производится по приглашению (комната не отслеживается в списке
                    комнат). Для создания такой комнаты необходимо поставить отметку в пункте "Закрытая
                    комната", далее необходимо сгенерировать ссылку-приглашение и передать ее клиенту.
                </Typography>
                <Typography fontWeight={800} sx={{textIndent: '30px'}}>
                    * В разделе "Шифрование", ссылку-приглашение можно зашифровать с помощью
                    открытого ключа клиента
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
};

export default InfoPanel;