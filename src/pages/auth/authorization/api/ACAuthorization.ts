interface IResultAuth {
    error: string | null,
    user: {
        id: number,
        name: string,
        group: string,
        role: string,
        token: string
    } | null
}

export const fetchAuthorization = async (obj: { name: string, password: string }) => {

    let url = `http://localhost:3001/api/user/auth`

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });

    const json: IResultAuth = await response.json()

    if (response.status !== 200) {
        alert('Авторизация не выполнена ошибка' + response.status)
    } else {
        if (json.user !== null) {
            alert('Авторизация выполнена')
            localStorage.setItem('x-auth-token', json.user.token);
        } else {
            alert('Авторизация не выполнена ошибка' + response.status)
        }
    }

    return response.status

}
