import React from "react";
import CreateRoom from "../views/createRoom"
import {createRoom} from "../components/roomAPI";

export default function CreateRoomPresenter(props) {
    const model = props.model
    const [numQuestions, setNumQuestions] = React.useState(10)
    const [roomCode, setRoomCode] = React.useState("") //saves roomcode to model later
    const [data, setData] = React.useState(null)
    const [promise, setPromise] = React.useState(null)
    const [error, setError] = React.useState(null)

    React.useEffect(function () {
            setData(null)
            setError(null)
            if (promise) {
                const p = promise
                promise.then(dt => {
                    if (promise === p) {
                        setData(dt)
                        model.setRoomCode(dt.code)
                        model.setIsHost(true)
                        console.log(dt)
                        props.history.push("room/" + dt.code)
                    }
                }).catch(er => {
                        if (promise === p) {
                            setError(er)
                        }
                    }
                )
            }
        }, [promise]
    )

    if (error) {
        return <div class="main-text"> {error + ""} </div>
    } else {
        return <CreateRoom numQuestions={numQuestions}
                           createRoom = {() => setPromise(createRoom(numQuestions))}
                           changeNumQuestions={x => {
                               if(x >= 1){
                                    model.setNumQuestions(x)
                                    setNumQuestions(x)}
                           }}
                           returnToMain={() => props.history.push("/")}

        />
    }
}
