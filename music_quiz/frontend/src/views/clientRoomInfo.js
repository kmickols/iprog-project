import React from "react";

export default function ClientRoomInfo({roomCode, refresh}){
    return (
        <div>
            <h2 className="main-text">Joined Room {roomCode}!</h2>
            <p className="main-text smaller-text">Wait for host to start the game.</p>
            <span className={"main-text"}>
                <button className="button smaller-button" onClick={() => refresh()}>Refresh</button>
            </span>
        </div>
    )
}