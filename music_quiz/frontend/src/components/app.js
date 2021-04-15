import React from "react";
import {render} from "@testing-library/react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import CreateRoom from "../views/createRoom";
import RoomInfoPresenter from "../presenters/roomInfoPresenter";
import JoinRoomPresenter from "../presenters/joinRoomPresenter";

function App(props){
   return  (
       <div>
        <Router>
            <switch>

                <Route exact path='/'><p>
                    This is the homepage!! :)</p> </Route>
                <Route path="/room/:roomCode" component={RoomInfoPresenter}/>
                <Route path="/join" component={JoinRoomPresenter}/>
                <Route path="/create" component={CreateRoom}/>
            </switch>
        </Router>
        </div>
    );
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv)