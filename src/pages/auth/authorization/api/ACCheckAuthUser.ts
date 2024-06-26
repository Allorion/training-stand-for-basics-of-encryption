import {hostName} from "../../../../global-elements/globalData";

export const fetchCheckAuthUser = async () => {
    try {
        let url = `http://${hostName}:8080/api/user/refresh`

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': localStorage.getItem('x-auth-token')!
            },
        });

        const json = await response.json()

        return {status: response.status, data: json.user}
    } catch (e) {
        return {status: 500, data: null}
    }
}