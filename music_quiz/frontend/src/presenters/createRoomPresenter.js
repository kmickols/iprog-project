import React from "react";
import CreateRoom from "../views/createRoom"

import {authenticateSpotify, getSpotifyPlayer, spotifyStatus} from "../components/spotify";

export default function CreateRoomPresenter(props) {
    const model = props.model
    const [numQuestions, setNumQuestions] = React.useState(5)

    const [quizType, setQuizType] = React.useState("classics")

    const [data, setData] = React.useState(null)
    const [promise, setPromise] = React.useState(null)
    const [error, setError] = React.useState(null)

    const [spotifyAuth, setSpotifyAuth] = React.useState(false)
    const [spotifyStatusPromise, setSpotifyStatusPromise] = React.useState(null)
    const [spotifyStatusErr, setSpotifyStatusErr] = React.useState(null)

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

    React.useEffect(function () {
            setSpotifyAuth(false)
            setSpotifyStatusErr(null)
            if (spotifyStatusPromise !== null) {
                const p = spotifyStatusPromise
                spotifyStatusPromise.then(dt => {
                    if (spotifyStatusPromise === p) {
                        setSpotifyAuth(dt)
                        if (dt) {
                            return  model.getSpotifyPlayer()

                        }
                    }
                }).then( dt => {
                        if (dt === -1) {
                            model.setErrMessage("Spotify couldn't load. Try again.")
                            props.history.push("/error")
                        }
                    }
                )
                .catch(er => {
                        if (spotifyStatusPromise === p) {
                            setError(er)
                        }
                    }
                )
            }
        }, [spotifyStatusPromise]
    )

    React.useEffect(function () {
        setSpotifyStatusPromise(model.getSpotifyStatus())
    }, [])

    if (error) {
        return <div class="main-text"> {error + ""} </div>
    } else {
        return <CreateRoom numQuestions={numQuestions}
                           loggedInToSpotify={spotifyAuth}
                           loginSpotify={() => model.getAuthenticateSpotify()}
                           changeQuizType={x => setQuizType(x)}
                           createRoom={() => setPromise(model.createRoom(numQuestions, quizType))}
                           changeNumQuestions={x => {
                               if (x >= 1 && x <= 20) {
                                   model.setNumQuestions(x)
                                   setNumQuestions(x)
                               }
                           }}
                           returnToMain={() => props.history.push("/")}
                           quizTypes={["classics", "80s", "00s", "rock", "pop", "Electronic", "hiphop", "very difficult"]}
                           checked={quizType}
        />
    }
}
