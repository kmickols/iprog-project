import React from "react";

export default function TutorialPage({returnToMain}) {
    return(
        <div>

            <span className="main-text extra-bold-text"> <p> HOW TO PLAY! </p></span>
            <span className="main-text">
          <ul>
          <li>
            If you want to create a game, log in with your Spotify account
          </li>
          <li>
            Choose a playlist to generate quiz with
          </li>
          <li>Wait for other people to join the room by entering the room code and their nicknames</li>
            <li>When everyone is ready, start the game</li></ul>

        </span>
            <span className="main-text"> <button className="button mini-button" onClick={() => returnToMain()}> &#5130; Back
        </button> </span>
        </div>
    )

}