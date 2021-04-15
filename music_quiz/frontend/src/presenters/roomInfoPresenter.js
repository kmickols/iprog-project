import React from "react";
import {getRoomDetails, launchGame} from "../components/roomAPI";
import HostRoomInfo from "../views/hostRoomInfo";
import ClientRoomInfo from "../views/clientRoomInfo";


export default function RoomInfoPresenter(props){
    const roomCode = props.match.params.roomCode

    const [promise, setPromise] = React.useState(null)
    React.useEffect(function (){setPromise(getRoomDetails(roomCode))}, [])

    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [numQuestions, setNumQuestions] = React.useState(0)
    const [currentQuestion, setCurrentQuestion] = React.useState(-1)
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
                        setCurrentQuestion(dt.current_question)
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
        if(currentQuestion === -1) {
            //Game not started yet, show lobby
            if (isHost) {
                return <HostRoomInfo roomCode={roomCode} numQuestions={numQuestions} players={players}
                                     launchGame={() => launchGame(roomCode)}
                                     refresh={() => setPromise(getRoomDetails(roomCode))}/>
            } else {
                //Player
                return <ClientRoomInfo roomCode={roomCode} refresh={() => setPromise(getRoomDetails(roomCode))}/>
            }
        } else {
            //Game started
            //TODO: Redirect to questions!
             return <div>
                <span class="main-text"> Game has started! Current question: {currentQuestion}</span> </div>
        }
    }
}