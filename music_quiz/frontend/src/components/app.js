import React from "react";
import {render} from "@testing-library/react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import CreateRoomPresenter from "../presenters/createRoomPresenter";
import RoomInfoPresenter from "../presenters/roomInfoPresenter";
import JoinRoomPresenter from "../presenters/joinRoomPresenter";
import StartViewPresenter from "../presenters/startViewPresenter";
import TutorialPresenter from "../presenters/tutorialPresenter";
import Model from "../model/model.js"

const myModel = new Model(2);

function App(props){


    return  (
        <div>
            <Router>
                <switch>
                    <Route exact path='/' component={StartViewPresenter}/>
                    <Route path="/room/:roomCode" component={RoomInfoPresenter}/>
                    <Route path="/join" component={JoinRoomPresenter}/>
                    <Route path="/create"><CreateRoomPresenter model={myModel} /></Route>
                    <Route path="/tutorial" component={TutorialPresenter}/>
                    <Route path="/login"/>
                </switch>
            </Router>
        </div>
    );
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv)