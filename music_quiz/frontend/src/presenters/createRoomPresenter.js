import React from "react";
import CreateRoom from "../views/createRoom"

export default function CreateRoomPresenter(props) {
    const [numQuestions, setNumQuestions] = React.useState(props.model.numQuestions)
    const [roomCode, setRoomCode] = React.useState(props.model.setRoomCode) //saves roomcode to model later
    const [data, setData] = React.useState(null)
    const [promise, setPromise] = React.useState(null)
    const [error, setError] = React.useState(null)

    React.useEffect(function () {
            setData(null)
            setError(null)
            setNumQuestions(props.model.numQuestions)
            if (promise) {
                const p = promise
                promise.then(dt => {
                    if (promise === p) {
                        setData(dt)
                        setNumQuestions(dt.num_questions)
                        setRoomCode(dt.code)
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
        return <div class="main-text"> ERROR </div>
    } else {
        return <CreateRoom numQuestions={numQuestions}
                           roomCode={roomCode}
                           setRoomCode={x => props.model.setRoomCode}
                           setNumQuestions={x => props.model.numQuestions(x)}
        />
    }
}
