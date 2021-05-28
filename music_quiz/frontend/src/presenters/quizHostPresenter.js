import HostInputQuestion from "../views/hostInputQuestion";
import Loading from "../views/loading";
import React from "react";
import InputAnswer from "../views/inputAnswer";
import Error from "../views/error";



export default function QuizHostPresenter(props) {

    const model = props.model
    const [question, setQuestion] = React.useState(null)
    const [questionPromise, setQuestionPromise] = React.useState(null)
    const [questionError, setQuestionError] = React.useState(null)
    const [showAnswer, setShowAnswer] = React.useState(false)
    const [seconds, setSeconds] = React.useState(30)

    function revealAnswer() {
        setShowAnswer(true)
        model.getRevealQuestion()
        model.getStopPlaying()
    }

    React.useEffect(
        () =>  {
            let interval = setInterval(() => {
                setSeconds(seconds - 1)
                if(seconds - 1 === 0){
                    revealAnswer()
                }
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    )


    React.useEffect(function () {
            setQuestion(null)
            setQuestionError(null)
            if (questionPromise) {
                const p = questionPromise
                questionPromise.then(dt => {
                    if (questionPromise === p) {
                        if (dt === -1) {
                            props.history.push("/room/" + model.getRoom() + "/result")
                        } else {
                            setQuestion(dt)
                            model.getPlaySong(dt.spotify_token)

                        }
                    }
                }).catch(er => {
                        if (questionPromise === p) {
                            setQuestionError(er)
                        }
                    }
                )
            }
        }, [questionPromise]
    )

    React.useEffect(function () {
        setQuestionPromise(model.getQuestion(true));
    }, [])

    if (questionError) {
        return <Error error={questionError}/>
    } else if (question) {
        if (!showAnswer) {
            return <HostInputQuestion question={question} remainingSeconds={seconds}/>
        }

        else {
            let next = () => {
                setQuestionPromise(model.getNextQuestion())
                setShowAnswer(false)
                setSeconds(30)
            }

            if (question!== 1) {
                return <InputAnswer question={question} next={next}/>
            }
        }
    } else {
        return <Loading/>
    }

}