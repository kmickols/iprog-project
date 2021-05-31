import React from "react";
import CreateRoom from "../views/createRoom"

import {authenticateSpotify, getSpotifyPlayer, spotifyStatus} from "../components/spotify";
import Error from "../views/error";

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
    const [spotifyLoadingLogin, setSpotifyLoadingLogin] = React.useState(false)

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
            if (spotifyStatusPromise !== null) {
                setSpotifyStatusErr(null)
                setSpotifyAuth(false)
                setSpotifyLoadingLogin(false)
                let authenticated = false
                const p = spotifyStatusPromise
                spotifyStatusPromise.then(dt => {
                    if (spotifyStatusPromise === p) {
                        setSpotifyAuth(dt)
                        authenticated = dt
                        if (dt) {
                            return model.getSpotifyPlayer().then( dt => {
                                    if (dt === -1) {
                                        // try loading the player again:
                                        if (authenticated) {
                                            new Promise(resolve => setTimeout(resolve, 1000)).then( () => {
                                            model.getSpotifyPlayer()
                                                .then(dt => {
                                                    if (dt === -1) {
                                                        model.setErrMessage("Spotify player couldn't load. Try again.")
                                                        props.history.push("/error")
                            }})})}}})
                        }
                    }

                setSpotifyStatusPromise(null)
                })

                .catch(er => {
                        if (spotifyStatusPromise === p) {
                            setSpotifyStatusErr(er)
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
        return <Error error={error}/>
    } else if (spotifyStatusErr) {
        return <Error error={spotifyStatusErr} />
    } else {
        return <CreateRoom numQuestions={numQuestions}
                           loadingSpotify={spotifyStatusPromise && !spotifyAuth && !spotifyStatusErr}
                           loggedInToSpotify={spotifyAuth}
                           loginSpotify={() => {model.getAuthenticateSpotify()
                                setSpotifyLoadingLogin(true)}}
                           loadingLogin={spotifyLoadingLogin}
                           changeQuizType={x => setQuizType(x)}
                           createRoom={() => setPromise(model.createRoom(numQuestions, quizType))}
                           changeNumQuestions={x => {
                               if (x >= 1 && x <= 20) {
                                   model.setNumQuestions(x)
                                   model.setCurrentQuestion(0)
                                   setNumQuestions(x)
                               }
                           }}
                           returnToMain={() => props.history.push("/")}
                           quizTypes={["classics", "70s", "80s", "svenska hits", "rock", "pop", "electronic", "hiphop", "everything"]}
                           checked={quizType}
                           showLoading={promise && !data && !error}
        />
    }
}
