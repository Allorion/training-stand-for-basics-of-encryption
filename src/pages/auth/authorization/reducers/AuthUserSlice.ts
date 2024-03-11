import {createSlice} from "@reduxjs/toolkit";

export interface IAuthUser {
    token: string | null,
    valid: boolean
}

export interface IDataConnectRoom {
    privateKey: string,
    linkToConnect: string
}

export interface IUserInfo {
    group: string,
    id: number,
    name: string,
    role: string
}

interface IInitialState {
    authUser: IAuthUser,
    dataConnectRoom: IDataConnectRoom[],
    userInfo: IUserInfo | null
}

const initialState: IInitialState = {
    authUser: {
        token: null,
        valid: false
    },
    userInfo: null,
    dataConnectRoom: []
}

export const authUserSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        edit(state, action: { payload: { authUser: IAuthUser, userInfo: IUserInfo | null }, type: string }) {
            state.authUser = action.payload.authUser
            state.userInfo = action.payload.userInfo
        },
        clear(state) {
            state.authUser = {token: null, valid: false}
            state.userInfo = null
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