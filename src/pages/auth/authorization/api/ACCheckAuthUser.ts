export const fetchCheckAuthUser = async () => {
    try {
        let url = `http://localhost:3001/api/user/refresh`

        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-auth-token': localStorage.getItem('x-auth-token')!
            },
        });

        return response.status;
    } catch (e) {
        return 500
    }
}