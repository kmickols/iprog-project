import React, {Component} from "react";
import {getRoomDetails, joinRoom} from "./RoomAPI";

export default function RoomInfo(props) {

    const [txt, setTxt] = React.useState("")
    const [promise, setPromise] = React.useState(null)

    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)

    return (
        <div style={{margin: 15}}>
            Room Code
            <br/>
            <input id="code" placeholder="Room Code" maxLength={6}/>
            <br/>
            Nickname
            <br/>
            <input id="name" placeholder="Nickname" maxLength={15}/>
            <br/>
            <button onClick={() => {
                setPromise(joinRoom(document.getElementById("code").value, document.getElementById("name").value)
                .then(dt => setTxt(JSON.stringify(dt)))
                .then(dt => props.history.push('/room/'+document.getElementById("code").value))

            )}}>
                Join Room!</button>
        <p>{txt}</p>
        </div>
        )
    }
