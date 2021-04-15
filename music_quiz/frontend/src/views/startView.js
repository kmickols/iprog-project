import React from "react";

// Blir dubbelt :(
//         <header>
//             <h1 class="header"> Music Quiz</h1>
//         </header>
//
export default function StartView({hostGame, joinGame, tutorial}) {
    return(
        <div>

            <span class = "main-text">
              <button class="start-button" onClick={() => hostGame()}>Host a quiz</button>
              <button class="start-button" onClick={() => joinGame()}>Join a quiz</button>
              <button class="start-button" onClick={() => tutorial()}>Tutorial</button>
            </span>
        </div>
    );}
