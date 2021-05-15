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
        setQuestionPromise(model.getQuestion());
    }, [])

    if (questionError) {
        return <Error error={questionError}/>
    } else if (question) {
        let next
        if (!showAnswer) {
            next = () => {
                setShowAnswer(true)
                model.getRevealQuestion()
                model.getStopPlaying()
            }
            return <HostInputQuestion question={question} next={next}/>
        } else {
            next = () => {
                setQuestionPromise(model.getNextQuestion())
                setShowAnswer(false)
            }

            return <InputAnswer question={question} next={next}/>

        }
    } else {
        return <Loading/>
    }

}