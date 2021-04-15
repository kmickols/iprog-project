import React from "react";

export default function StartView({hostGame, joinGame, tutorial}) {
    return(
        <div>

            <span className= "main-text">
              <button className="button start-button" onClick={() => hostGame()}>Host a quiz</button>
              <button className="button start-button" onClick={() => joinGame()}>Join a quiz</button>
              <button className="button start-button" onClick={() => tutorial()}>Tutorial</button>
            </span>
        </div>
    );}
