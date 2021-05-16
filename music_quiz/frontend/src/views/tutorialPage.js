import React from "react";

export default function TutorialPage({returnToMain}) {
    return(
        <div>

        <span className="main-text extra-bold-text"> <p> HOW TO PLAY! </p></span>
        <span className="main-text">
        <ul>
            <li>Hosting a game:</li>
            <ul>
                <li>Choose "Host a quiz" in the home screen!</li>
                <li>Choose a genre to generate music from and a number of questions.</li>
                <li>Create the room</li>
                <li>Wait for other people to join the room.</li>
                <li>When everyone is ready, start the game!</li>
        </ul>
            <br/>
            <li>Joining a game:</li>
            <ul>
                <li>Choose "Join a quiz" from the home screen.</li>
                <li>Enter the "Room code" of the room you wish to join.</li>
                <li>Enter a nickname. This is the name other players will see.</li>
                <li>Wait for the game to start!</li>
            </ul>
            <br/>
        <li>How to play:</li>
            <ul>
                <li>After the host starts the game, different songs will be played.</li>
                <li>You will be asked different questions about the song, such as the name of the song.</li>
                <li>Enter your answer and submit it before the time runs out!</li>
                <li>You gain one point for each correct answer.</li>
                <li>After each question is finished the answers will be shown.</li>
                <li>The host must now proceed to the next question.</li>
                <li>After all questions the result will be shown!</li>
            </ul>
      </ul>

        </span>
            <span className="main-text"> <button className="button mini-button" onClick={() => returnToMain()}> &#5130; Back
        </button> </span>
        </div>
    )

}