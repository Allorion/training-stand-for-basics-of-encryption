import {createSlice} from "@reduxjs/toolkit";

export interface IAuthUser {
    token: string | null,
    valid: boolean
}

export interface IDataConnectRoom {
    privateKey: string,
    linkToConnect: string
}

interface IInitialState {
    authUser: IAuthUser,
    dataConnectRoom: IDataConnectRoom[]
}

const initialState: IInitialState = {
    authUser: {
        token: null,
        valid: false
    },
    dataConnectRoom: []
}

export const authUserSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        edit(state, action: { payload: IAuthUser, type: string }) {
            state.authUser = action.payload
        },
        clear(state) {
            state.authUser = {token: null, valid: false}
        },
        addDataConnectToRoom(state, action: {payload: IDataConnectRoom, type: string}) {
            state.dataConnectRoom.push(action.payload)
        }
    }
})

export const {
    edit: editAuthUser,
    clear: clearAuthUser,
    addDataConnectToRoom: addDataConnectToRoomAuthUser
} = authUserSlice.actions

export default authUserSlice.reducer