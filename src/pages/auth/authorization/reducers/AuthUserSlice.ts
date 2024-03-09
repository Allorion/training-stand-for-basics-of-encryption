import {createSlice} from "@reduxjs/toolkit";

export interface IAuthUser {
    token: string | null,
    valid: boolean
}

interface IInitialState {
    authUser: IAuthUser
}

const initialState: IInitialState = {
    authUser: {
        token: null,
        valid: false
    }
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
        }
    }
})

export const {
    edit: editAuthUser,
    clear: clearAuthUser
} = authUserSlice.actions

export default authUserSlice.reducer