import React from "react";
import {getQuestion, getScores} from "../components/roomAPI";
import FinalScore from "../views/finalScore";
import Loading from "../views/loading";
import Error from "../views/error";


export default function ResultPresenter(props) {
    const model = props.model


    const [promise, setPromise] = React.useState(null)
    const [score, setScore] = React.useState(null)
    const [scoreErr, setScoreErr] = React.useState(null)

    React.useEffect(function (){
            setScore(null)
            setScoreErr(null)
            if (promise){
                const p=promise
                promise.then(dt=>{
                    if(promise===p){
                        setScore(dt)
                    }
                }).catch(er=>{
                        if(promise===p){
                            return er
                        }
                    }
                ).then(er => {
                            setScoreErr(er);
                })
            }

        }
        , [promise]
    )

     React.useEffect(function () { setPromise( model.getScores() )}, [])

    let playAgain
    if(model.isHost){
        playAgain = () => props.history.push("/create")
    } else {
        playAgain = () => props.history.push("/join")
    }

    return scoreErr?<Error error={scoreErr}/>:(score?<FinalScore scores={score} returnToMain={() => props.history.push("/")} playAgain={playAgain} />:<Loading/>)
}
