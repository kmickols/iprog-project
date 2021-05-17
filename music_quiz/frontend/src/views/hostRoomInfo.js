import React from "react";

export default function HostRoomInfo({roomCode, numQuestions, players, launchGame, quizType}) {
    return (
        <div align={"center"}>
            <span className="main-text">
                <button className="button smaller-button" onClick={() => launchGame()}>Launch Game</button>
            </span>
            <span className="main-text smaller-text">
                <h2 className="main-text extra-big-text">Room Code: {roomCode}</h2>
                <h2 className="main-text">Questions: {numQuestions}</h2>
                <h2 className="main-text">Genre: {quizType.charAt(0).toUpperCase() + quizType.slice(1)}</h2>
                <h3 className="main-text">Players:</h3>
                {players.map(player => <p className="main-text smaller-text">{player.user_name}</p>)}
            </span>
        </div>
    )
}