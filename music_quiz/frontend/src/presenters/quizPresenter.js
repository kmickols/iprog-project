import React from "react";
import QuizClientPresenter from "./quizClientPresenter";
import QuizHostPresenter from "./quizHostPresenter";

export default function QuizPresenter(props) {
    if(props.model.isHost){
        return <QuizHostPresenter {...props} />
    } else {
        return <QuizClientPresenter {...props} />
    }


}
