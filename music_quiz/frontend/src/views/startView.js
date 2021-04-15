import React from "react";

export default function StartView({hostGame, joinGame, tutorial}) {
    return(
        <div>

            <span className= "main-text">
              <button className="button" onClick={() => hostGame()}>Host a quiz</button>
              <button className="button" onClick={() => joinGame()}>Join a quiz</button>
              <button className="button" onClick={() => tutorial()}>Tutorial</button>
            </span>
        </div>
    );}
