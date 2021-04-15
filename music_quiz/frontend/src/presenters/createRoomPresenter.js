import React from "react";
import CreateRoom from "../views/createRoom"
import {createRoom} from "../components/roomAPI";
import Error from "../views/error";

export default function CreateRoomPresenter({model}) {
    console.log(model)
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
                        window.location = "room/" + dt.code
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
        return <Error error={error}/>
    } else {
        return <CreateRoom numQuestions={numQuestions}
                           createRoom = {() => {setPromise(createRoom(numQuestions))}}
                           changeNumQuestions={x =>
                           {if(x >= 1){
                               model.setNumQuestions(x)
                               setNumQuestions(x)}}
                           }
        />
    }
}
