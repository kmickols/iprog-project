import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import RoomInfo from "./RoomInfo.js"
import JoinRoom from "./JoinRoom.js"

export default function HomePage(props){
    return (
        <Router>
            <switch>

                <Route exact path='/'><p>
                    This is the homepage!! :)</p> </Route>
                <Route path="/room/:roomCode" component={RoomInfo}/>
                <Route path="/join" component={JoinRoom}/>
            </switch>
        </Router>
    );
}
