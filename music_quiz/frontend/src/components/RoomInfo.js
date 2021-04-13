import React from "react";
import {getRoomDetails, createRoom, launchGame} from "./RoomAPI"

export default function RoomInfo(props){

    const roomCode = props.match.params.roomCode

    const [promise, setPromise] = React.useState(null)
    React.useEffect(function (){setPromise(getRoomDetails(roomCode))}, [])

    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [numQuestions, setNumQuestions] = React.useState(0)
    const [isHost, setIsHost] = React.useState(false)
    const [players, setPlayers] = React.useState([])

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
                        setPlayers(dt.players)
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

    if(error){
        return <div>
            <span class="main-text"> Non-existing room with code: {roomCode} </span> </div>
    } else {
        return isHost ?
            (<div>
                <span class="main-text">
                <button className="smaller-button" onClick={(ev) => launchGame(roomCode)}>Launch Game</button>
                <button className="smaller-button"  onClick={(ev) => createRoom(10)}>Re-Create Room</button>
                 </span>
                <span className="smaller-text">
                   <h2 className="smaller-text">Room Code: {roomCode}</h2>
                <p className="smaller-text">Questions: {numQuestions}</p>
                <p className="smaller-text">Host: {isHost ? "Yes" : "No"}</p>
                <h3 className="smaller-text">Players:</h3>
                {players.map(player => <p className="smaller-text">{player.user_name}</p>)}
                </span>
                    <span className="main-text">

                <button className="smaller-button" onClick={() => setPromise(getRoomDetails(roomCode))}>Refresh</button>
                    </span>
            </div>)
            : (
                <div>
                    <h2 className="main-text">Joined Room: {roomCode}</h2>
                    <p className="smaller-text">Wait for host to start the game.</p>
                </div>
            )

    }

}