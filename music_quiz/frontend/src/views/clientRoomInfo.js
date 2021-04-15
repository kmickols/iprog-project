import React from "react";

export default function ClientRoomInfo({roomCode, refresh}){
    return (
        <div>
            <h2 className="main-text">Joined Room {roomCode}!</h2>
            <p className="smaller-text">Wait for host to start the game.</p>
            <button className="smaller-button" onClick={() => refresh()}>Refresh</button>
        </div>
    )
}