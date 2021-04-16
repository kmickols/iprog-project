import React from "react";
import {render} from "@testing-library/react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import CreateRoomPresenter from "../presenters/createRoomPresenter";
import RoomInfoPresenter from "../presenters/roomInfoPresenter";
import JoinRoomPresenter from "../presenters/joinRoomPresenter";
import StartViewPresenter from "../presenters/startViewPresenter";
import TutorialPresenter from "../presenters/tutorialPresenter";
import QuizPresenter from "../presenters/quizPresenter";
import Model from "../model/model";
import CreateRoom from "../views/createRoom";
import FinalScore from "../views/finalScore";
import ResultPresenter from "../presenters/resultPresenter";

const model = new Model()

function App({model}){
    return  (
        <div>
            <Router>
                <switch>
                    <Route exact path='/' component={StartViewPresenter}/>
                    <Route exact path="/room/:roomCode" render={(props) => <RoomInfoPresenter {...props} model={model}/>} />
                    <Route path="/room/:roomCode/quiz" render={(props) => <QuizPresenter {...props} model={model}/>} />
                    <Route path="/room/:roomCode/result" render={(props) => <ResultPresenter {...props} model={model}/>} />
                    <Route path="/join" render={(props) => <JoinRoomPresenter {...props} model = {model}/>} />
                    <Route path="/create" render={(props) => <CreateRoomPresenter {...props} model={model}/>}/>
                    <Route path="/tutorial" component={TutorialPresenter}/>
                    <Route path="/login"/>
                </switch>
            </Router>
        </div>
    );
}
const appDiv = document.getElementById("app");
render(<App model={model}/>, appDiv)