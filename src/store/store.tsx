// *********************************************************************************************************************
// Хранилище проекта
// *********************************************************************************************************************


import {combineReducers, configureStore} from '@reduxjs/toolkit'

const obj = {}

const rootReducer = combineReducers(obj)

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
