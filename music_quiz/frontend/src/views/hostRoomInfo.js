import React from "react";

export default function HostRoomInfo({roomCode, numQuestions, players, launchGame, refresh}) {
    return (
        <div>
            <span className="main-text">
                <button className="smaller-button" onClick={() => launchGame()}>Launch Game</button>
            </span>
            <span className="smaller-text">
                <h2 className="smaller-text">Room Code: {roomCode}</h2>
                <p className="smaller-text">Questions: {numQuestions}</p>
                <h3 className="smaller-text">Players:</h3>
                {players.map(player => <p className="smaller-text">{player.user_name}</p>)}
            </span>
            <span className="main-text">
                <button className="smaller-button" onClick={() => refresh()}>Refresh</button>
            </span>
        </div>
    )
}