import {createAsyncThunk} from "@reduxjs/toolkit";
import {IListRooms} from "../reducers/ListRoomsSlice";
import {hostName} from "../../../global-elements/globalData";

export const fetchListRooms = createAsyncThunk(
    'fetchListRooms',
    async () => {

        const url = `http://${hostName}:8080/api/room/list-rooms`

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