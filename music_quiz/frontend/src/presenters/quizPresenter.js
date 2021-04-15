import React from "react";

export default function QuizPresenter({model}) {

    const [question, setQuestion] = React.useState("")

    const [questionPromise, setQuestionPromise] = React.useState()
    const [questionError, setQuestionError] = React.useState()

    console.log(model)

    if (model.isHost) {
        return (
            <div>
                <p>Host!</p>
            </div>
        )
    } else {
        return (
            <div>
                <p>Player!</p>
            </div>
        )
    }
}
