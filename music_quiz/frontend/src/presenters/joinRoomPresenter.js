import React from "react";
import JoinRoom from "../views/joinRoom";
import {joinRoom} from "../components/roomAPI";

export default function JoinRoomPresenter(props){
    const [promise, setPromise] = React.useState(null)

    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)

    return <JoinRoom joinGame={(roomCode, username) => joinRoom(roomCode, username)}/>
    }