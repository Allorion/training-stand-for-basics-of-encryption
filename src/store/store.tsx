// *********************************************************************************************************************
// Хранилище проекта
// *********************************************************************************************************************


import {combineReducers, configureStore} from '@reduxjs/toolkit'
import dataRoomReducer from "../pages/room/reducer/DataRoomSlice";
import listRoomsReducer from "../pages/list-rooms/reducers/ListRoomsSlice";

const obj = {
    dataRoomReducer,
    listRoomsReducer
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
