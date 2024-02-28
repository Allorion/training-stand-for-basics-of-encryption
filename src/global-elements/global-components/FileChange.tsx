import React, {FC} from "react";
import Typography from "@mui/material/Typography";

interface IProps {
    accept: string,
    onChange: (e: string) => void,
    label :string
}

const FileChange: FC<IProps> = ({onChange, accept, label}) => {

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Получаем файл из события
        const file = event.target.files?.[0];
        if (file) {
            // Создаем объект FileReader для чтения файла
            const reader = new FileReader();
            // Устанавливаем обработчик для события загрузки
            reader.onload = () => {
                // Получаем данные из файла в виде строки
                const fileString = reader.result as string;
                // Возвращаем содержимое файла как строку
                onChange(fileString)
            };
            // Читаем файл как текст
            reader.readAsText(file);
        }
    };

    return (
        <React.Fragment>
            <Typography>{label}</Typography>
            <div className={'key-block'}>
                <input
                    type={'file'}
                    accept={accept}
                    onChange={handleFileChange}
                />
            </div>
        </React.Fragment>
    )
};

export default FileChange;