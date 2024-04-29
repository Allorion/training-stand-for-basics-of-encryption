import React from 'react';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import NavBar from "./global-elements/global-components/nav-bar/NavBar";
import HomeTemplate from "./pages/home/HomeTemplate";
import ListRoomsTemplate from "./pages/list-rooms/ListRoomsTemplate";
import AuthorizationTemplate from "./pages/auth/authorization/AuthorizationTemplate";
import CheckAuth from "./pages/auth/authorization/components/CheckAuth";
import RoomTemplate from "./pages/room/RoomTemplate";


const ListRoutes = () => {

    return (
        <React.Fragment>
            <Router>
                <CheckAuth/>
                <NavBar/>
                <Routes>
                    <Route path={'/'} element={<HomeTemplate/>}/>
                    <Route path={'/auth'} element={<AuthorizationTemplate/>}/>
                    <Route path={'/list-rooms/'} element={<ListRoomsTemplate/>}/>
                    <Route path={'/room-private/'} element={<RoomTemplate/>}/>
                    <Route path={'/room/join'} element={<RoomTemplate/>}/>
                </Routes>
            </Router>
        </React.Fragment>
    );
};

export default ListRoutes;