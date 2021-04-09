import React from "react";
import {getRoomDetails, createRoom} from "./RoomAPI"

export default function RoomInfo(props){

    const roomCode = props.match.params.roomCode

    const [promise, setPromise] = React.useState(null)
    React.useEffect(function (){setPromise(getRoomDetails(roomCode))}, [])

    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [numQuestions, setNumQuestions] = React.useState(0)
    const [isHost, setIsHost] = React.useState(false)

    React.useEffect(
        function (){
            setData(null)
            setError(null)
            if (promise){
                const p=promise
                promise.then(dt=>{
                    if(promise===p){
                        setData(dt)
                        setNumQuestions(dt.num_questions)
                        setIsHost(dt.is_host)
                    }
                }).catch(er=>{
                        if(promise===p){
                            setError(er)
                        }
                    }
                )
            }

        }
        , [promise]
    )

    return !error ?
    (<div>
        <button disabled={false} onClick={(ev) => createRoom(10)}>press</button>
        <h2>Room Code: {roomCode}</h2>
        <p>Questions: {numQuestions}</p>
        <p>Host: {isHost ? "Yes" : "No"}</p>
    </div>)
        :
    <div><p>Non-existing room with code: {roomCode}</p></div>



}