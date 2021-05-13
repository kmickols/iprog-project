import React from "react";
import JoinRoom from "../views/joinRoom";
import {joinRoom} from "../components/roomAPI";

export default function JoinRoomPresenter(props) {
    const model = props.model
    const [promise, setPromise] = React.useState(null)
    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)

    React.useEffect(function () {
            setData(null)
            setError(null)
            if (promise) {
                const p = promise
                promise.then(dt => {
                    if (promise === p) {
                        setData(dt)
                        props.history.push("/room/" + dt.code)
                        model.setIsHost(false)
                        model.score = 0
                        model.nickname = dt.user_name
                        model.setRoomCode(dt.code)
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

    const [code, setCode] = React.useState("")
    const [codeErr, setCodeErr] = React.useState("")
    const [name, setName] = React.useState("")
    const [nameErr, setNameErr] = React.useState("")


    return <JoinRoom joinGame={() => {
        let tmp_name = name.trim()
        let tmp_code = code.trim().toUpperCase()
        let err = false
        if (tmp_name.length < 1) {
            err = true
            setNameErr("Enter a name with at least 1 character")
        } else {
            setNameErr("")
        }

        if (tmp_code.length < 6) {
            err = true
            setCodeErr("Enter a code that is at least 6 characters")
        } else {
            setCodeErr("")
        }

        if (!err) {
            setPromise(model.getJoinRoom(tmp_code, tmp_name))
        }

    }}
                     code={code}
                     name={name}
                     codeInput={val => setCode(val)}
                     nameInput={val => setName(val)}
                     joinErr={error ? (error.user_message ? error.user_message : error.message) : ""}
                     codeError={codeErr}
                     nameError={nameErr}
                     err={error ? error.message : ""}
                     returnToMain={() => props.history.push("/")}
    />
}