import {createEntityAdapter, createSlice, SerializedError} from "@reduxjs/toolkit";
import {fetchListRooms} from "../api/ACListRooms";

export interface IListRooms {
    id: number;
    name: string,
    closed: boolean,
    token: string,
    expiresAt: Date
}

interface IInitialState {
    loading: 'idle' | 'pending',
    error: null | SerializedError,
    noData: boolean,
}

const initialState = {
    loading: 'idle',
    error: null,
    noData: false
} as IInitialState

const listRoomsAdapter = createEntityAdapter({
    selectId: (model: IListRooms) => +model.id
})

export const listRoomsSlice = createSlice({
    name: 'listRoomsSlice',
    initialState: listRoomsAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchListRooms.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending'
                }
            })
            .addCase(fetchListRooms.fulfilled, (state, action) => {
                if (state.loading === 'pending') {

                    if (action.payload.length === 0) {
                        state.noData = true
                    } else {
                        listRoomsAdapter.setAll(state, action.payload)
                    }

                    state.loading = 'idle'
                }
            })
            .addCase(fetchListRooms.rejected, (state, action) => {
                if (state.loading === 'pending') {
                    state.error = action.error
                    state.loading = 'idle'
                }
            })
    }
})

export const {} = listRoomsSlice.actions

export const {
    selectAll: selectAllListRooms,
    selectById: selectByIdListRooms
    //@ts-ignore
} = listRoomsAdapter.getSelectors(state => state.listRoomsReducer)

export default listRoomsSlice.reducer