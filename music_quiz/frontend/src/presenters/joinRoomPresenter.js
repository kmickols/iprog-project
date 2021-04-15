import React from "react";
import JoinRoom from "../views/joinRoom";

export default function JoinRoomPresenter(props){
    const [txt, setTxt] = React.useState("")
    const [promise, setPromise] = React.useState(null)
    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)

    return <JoinRoom/>
    }