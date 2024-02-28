// *********************************************************************************************************************
// Кастомные хуки для типизации Redux
// *********************************************************************************************************************


import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>() // Возвращает Dispatch добавляя типизацию
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector // Типизированный Selector