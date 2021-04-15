import React from "react";

export default function TutorialPage() {
    return(
        <div>
            <header>
                <h1 className="header">Music Quiz</h1>
            </header>
            <span className="main-text"> <p> HOW TO CREATE A GAME </p></span>
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
            <span className="main-text"> <button className="launch-button">Back to homepage
        </button> </span>
        </div>
    )

}