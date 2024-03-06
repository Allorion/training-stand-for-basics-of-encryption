import React from 'react';
import {HashRouter, Route, Routes} from "react-router-dom";
import NavBar from "./global-elements/global-components/nav-bar/NavBar";
import HomeTemplate from "./pages/home/HomeTemplate";
import ListRoomsTemplate from "./pages/list-rooms/ListRoomsTemplate";
import RoomTemplate from "./pages/room/RoomTemplate";
import AuthorizationTemplate from "./pages/auth/authorization/AuthorizationTemplate";
import CheckAuth from "./pages/auth/authorization/components/CheckAuth";


const ListRoutes = () => {

    return (
        <React.Fragment>
            <HashRouter>
                <CheckAuth/>
                <NavBar/>
                <Routes>
                    <Route path={'/'} element={<HomeTemplate/>}/>
                    <Route path={'/auth'} element={<AuthorizationTemplate/>}/>
                    <Route path={'/list-rooms/'} element={<ListRoomsTemplate/>}/>
                    <Route path={'/room-private/'} element={<RoomTemplate/>}/>
                    <Route path={'/room/join'} element={<RoomTemplate/>}/>
                </Routes>
            </HashRouter>
        </React.Fragment>
    );
};

export default ListRoutes;