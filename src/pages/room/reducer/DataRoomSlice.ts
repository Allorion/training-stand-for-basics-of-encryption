import {createSlice, SerializedError} from "@reduxjs/toolkit";
import {fetchJoinToRoom} from "../../../global-elements/global-components/connecting-to-room/api/ACJoinToRoom";

export interface IDataRoomSlice {
    "id": number,
    "name": string,
    "closed": boolean,
    "token": string,
    "expiresAt": Date
}

interface IInitialState {
    loading: 'idle' | 'pending',
    error: null | SerializedError,
    noData: string | null,
    dataRoom: IDataRoomSlice | null
}

const initialState: IInitialState = {
    loading: 'idle',
    error: null,
    noData: null,
    dataRoom: null
}

export const dataRoomSlice = createSlice({
    name: 'dataRoomSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJoinToRoom.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending'
                }
            })
            .addCase(fetchJoinToRoom.fulfilled, (state, action) => {
                if (state.loading === 'pending') {

                    if (typeof action.payload === 'string') {
                        state.noData = action.payload
                    } else {
                        state.dataRoom = action.payload
                    }

                    state.loading = 'idle'
                }
            })
            .addCase(fetchJoinToRoom.rejected, (state, action) => {
                if (state.loading === 'pending') {
                    state.error = action.error
                    state.loading = 'idle'
                }
            })
    }
})

export const {} = dataRoomSlice.actions

export default dataRoomSlice.reducer