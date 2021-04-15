import {answerQuestion, getQuestion, joinRoom, nextQuestion} from "../components/roomAPI";
import React from "react";

export default function JoinRoom({joinGame}) {
    return(<div>
            <span className="main-text">
                Room Code
            </span>
            <br/>
            <input id="code" placeholder="Room Code" maxLength={6} className="fill-form"/>
            <br/>
            Nickname
            <br/>
            <input id="name" placeholder="Nickname" maxLength={15} className="fill-form"/>
            <br/>
            <button className="button launch-button" onClick={() => {() => joinGame()}}>
                Join Room!</button>
        </div>)
}