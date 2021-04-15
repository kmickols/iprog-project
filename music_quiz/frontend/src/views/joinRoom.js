import React from "react";

export default function JoinRoom({code, name, codeInput, nameInput, joinGame, nameError, codeError, joinErr, returnToMain}) {
    return(<div>
            <span className="main-text">
                Room Code
            </span>
        <span className="main-text">
            <br/>
            <input id="code" placeholder="Room Code" maxLength={6} className="fill-form" onInput={ev => codeInput(ev.target.value)}/>
            <p className={"small-error-text"}>{"" + codeError}</p>
        </span>
            <br/>
        <span className="main-text">

            Nickname
        </span>
        <span className="main-text"> 
            <br/>
            <input id="name" placeholder="Nickname" maxLength={15} className="fill-form" onInput={ev => nameInput(ev.target.value)}/>
            <p className={"small-error-text"}>{"" + nameError}</p>
            <br/>

            </span>
            <span className="main-text">
                <button className="button launch-button" onClick={
                    () => {
                        joinGame()
                    }}>
                Join Room!</button>

            </span>
            <span className={"main-text"}>
                <p className={"small-error-text"}>{"" + joinErr}</p>
            </span>
            <span className={"main-text"}>
                <button className="button mini-button" onClick={() => returnToMain()}> &#5130; Back </button>
            </span>

        </div>)
}