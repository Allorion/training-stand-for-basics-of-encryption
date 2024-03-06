// *********************************************************************************************************************
// Хранилище проекта
// *********************************************************************************************************************


import {combineReducers, configureStore} from '@reduxjs/toolkit'
import dataRoomReducer from "../pages/room/reducer/DataRoomSlice";

const obj = {
    dataRoomReducer
}

const rootReducer = combineReducers(obj)

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
