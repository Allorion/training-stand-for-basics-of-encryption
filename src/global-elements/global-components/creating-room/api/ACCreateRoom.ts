import {hostName} from "../../../globalData";

interface IRespData {
    error: string | null,
    room: {
        id: number;
        name: string,
        closed: boolean,
        token: string,
        expiresAt: Date
    }
}

export const fetchCreateRoom = async (obj: { name: string, token: string, closed: boolean }) => {
    try {
        let url = `http://${hostName}:8080/api/room/add`

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': localStorage.getItem('x-auth-token')!
            },
            body: JSON.stringify(obj)
        });

        const json: IRespData = await response.json()

        if (json.error !== null || response.status !== 201) {
            alert(json.error)
        } else {
            alert(`${json.room.closed ? 'Закрытая' : 'Открытая'} комната ${json.room.name} создана и добавлена в список ваших комнат!\nСсылка для подключения: ${window.location.href}#/room/join?token=${json.room.token}`)
        }
    } catch (e) {
        alert('Ошибка создания!')
    }
}