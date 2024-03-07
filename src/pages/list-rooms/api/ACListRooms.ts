import {createAsyncThunk} from "@reduxjs/toolkit";
import {IListRooms} from "../reducers/ListRoomsSlice";

export const fetchListRooms = createAsyncThunk(
    'fetchListRooms',
    async () => {

        const url = 'http://localhost:3001/api/room/list-rooms'

        const response = await fetch(url, {
            method: "GET",
            headers: {
                'x-auth-token': localStorage.getItem('x-auth-token')!
            }
        })

        const json: IListRooms[] = await response.json()

        return json

    }
)