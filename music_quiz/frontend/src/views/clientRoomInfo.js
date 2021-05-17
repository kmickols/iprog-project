import React from "react";

export default function ClientRoomInfo({roomCode, refresh}){
    return (
        <div align={"center"}>
            <h2 className="main-text">Joined Room {roomCode}!</h2>
            <p className="main-text smaller-text">Wait for the host to start the game!</p>
        </div>
    )
}