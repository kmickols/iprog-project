import React from "react";

export default function GoToQuiz({goToQuiz}){
    return <div>
        <span className="main-text">
            Game has started!
            <br/>
            <button className={"button smaller-button"} onClick={() => goToQuiz()}>Go To Quiz!</button>
        </span>

    </div>
}