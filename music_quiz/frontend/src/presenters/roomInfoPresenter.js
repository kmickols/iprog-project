import React from "react";
import {getRoomDetails, launchGame} from "../components/roomAPI";
import HostRoomInfo from "../views/hostRoomInfo";
import ClientRoomInfo from "../views/clientRoomInfo";
import Loading from "../views/loading";
import Error from "../views/error";
import GoToQuiz from "../views/goToQuizView";

export default function RoomInfoPresenter(props) {
    const roomCode = props.match.params.roomCode
    const model = props.model

    const [promise, setPromise] = React.useState(null)
    React.useEffect(function () {
        setPromise(model.getRoomDetails())
    }, [])

    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [numQuestions, setNumQuestions] = React.useState(0)
    const [currentQuestion, setCurrentQuestion] = React.useState(-1)
    const [isHost, setIsHost] = React.useState(false)
    const [players, setPlayers] = React.useState([])
    React.useEffect(
        function () {
            setData(null)
            setError(null)
            if (promise) {
                const p = promise
                promise.then(dt => {
                    if (promise === p) {
                        setData(dt)
                        setNumQuestions(dt.num_questions)
                        setCurrentQuestion(dt.current_question)
                        setIsHost(dt.is_host)
                        setPlayers(dt.players)
                    }
                }).catch(er => {
                        if (promise === p) {
                            return er
                        }
                    }
                ).then(er => {
                    setError(er);
                })
            }

        }
        , [promise]
    )

    const [launchPromise, setLaunchPromise] = React.useState(null)
    const [launchData, setLaunchData] = React.useState(null)
    const [launchError, setLaunchError] = React.useState(null)

    React.useEffect(
        function () {
            setLaunchData(null)
            setLaunchError(null)
            if (promise) {
                const p = promise
                promise.then(dt => {
                    if (promise === p) {
                        setLaunchData(dt)
                        props.history.push("/room/" + dt.code + "/quiz")
                    }
                }).catch(er => {
                        if (promise === p) {
                            return er
                        }
                    }
                ).then(er => {
                    setLaunchError(er);
                })
            }

        }
        , [launchPromise]
    )


    if (error) {
        return <Error error={error}/>
    } else if (data) {
        if (currentQuestion === -1) {
            //Game not started yet, show lobby
            if (isHost) {
                return <HostRoomInfo roomCode={roomCode} numQuestions={numQuestions} players={players}
                                     launchGame={() => setLaunchPromise(model.getLaunchGame())}
                                     refresh={() => setPromise(model.getRoomDetails())}/>
            } else {
                //Player
                return <ClientRoomInfo roomCode={roomCode} refresh={() => setPromise(model.getRoomDetails())}/>
            }
        } else {
            //Game started
            return <GoToQuiz goToQuiz={() => props.history.push("/room/" + model.getRoom() + "/quiz")}/>
        }
    } else {
        return <Loading/>
    }
}