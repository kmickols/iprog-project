import {answerQuestion, getQuestion, joinRoom, nextQuestion} from "../components/roomAPI";
import React from "react";

export default function JoinRoom({joinGame}) {
    return(<div>
            <span className="main-text">
                Room Code
            </span>
        <span className="main-text">
            <br/>
            <input id="code" placeholder="Room Code" maxLength={6} className="fill-form"/>
        </span>
            <br/>
        <span className="main-text">

            Nickname
        </span>
        <span className="main-text"> 
            <br/>
            <input id="name" placeholder="Nickname" maxLength={15} className="fill-form"/>
            <br/>
            </span>
            <span className="main-text">     <button className="button launch-button" onClick={() => {() => joinGame("test", "test")}}>
                Join Room!</button></span>

        </div>)
}