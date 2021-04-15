import {answerQuestion, getQuestion, joinRoom, nextQuestion} from "../components/roomAPI";
import React from "react";

function JoinRoom(props) {
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
            <button className="launch-button" onClick={() => {
                setPromise(joinRoom(document.getElementById("code").value, document.getElementById("name").value)
                .then(dt => setTxt(JSON.stringify(dt)))
                .then(dt => props.history.push('/room/'+document.getElementById("code").value))

            )}}>
                Join Room!</button>
                <button hidden={true} className="launch-button" onClick={() => {getQuestion(document.getElementById("code").value).then(dt => console.log(dt))}}> Test get </button>
                <button hidden={true} className="launch-button" onClick={() => {answerQuestion(document.getElementById("code").value, ["Baby", "Justin bieber"]).then(dt => console.log(dt))}}> Test answer </button>
                <button hidden={true} className="launch-button" onClick={() => {nextQuestion(document.getElementById("code").value).then(dt => console.log(dt))}}> Test next </button>

        </div>)
}