import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage"
import CreateRoomPage from "./CreateRoomPage";

export default function HomePage(props){
    return (
        <Router>
            <switch>
                <Route exact path='/'><p> This is the homepage! </p> </Route>
                <Route path='/join' component={RoomJoinPage}/>
                <Route path='/create' component={CreateRoomPage}/>
            </switch>
        </Router>
    );
}