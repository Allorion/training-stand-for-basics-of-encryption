import {createAsyncThunk} from "@reduxjs/toolkit";

interface IResultAuth {
    "id": number,
    "name": string,
    "closed": boolean,
    "token": string,
    "expiresAt": Date
}

export const fetchJoinToRoom = createAsyncThunk(
    'fetchJoinToRoom',
    async (token: string) => {
        let url = `http://localhost:3001/api/room/join?token=${token}`

        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-auth-token': localStorage.getItem('x-auth-token')!
            },
        });

        const json: IResultAuth | string = await response.json()

        return json
    }
)