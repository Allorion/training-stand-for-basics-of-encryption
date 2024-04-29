import {createAsyncThunk} from "@reduxjs/toolkit";
import {hostName} from "../../../globalData";

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
        let url = `http://${hostName}:8080/api/room/join?token=${token}`

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': localStorage.getItem('x-auth-token')!
            },
        });

        const json: IResultAuth | string = await response.json()

        return json
    }
)