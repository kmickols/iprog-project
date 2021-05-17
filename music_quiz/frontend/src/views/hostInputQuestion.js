import React from "react";

export default function HostInputQuestion({question, remainingSeconds}) {
    return(
        <div align={"center"}>
            <span className="main-text extra-big-text">
                {question.text}

    </span>
            <div className="progress-margin"/>
            <span className="main-text extra-big-text">{remainingSeconds}</span>
            <div className="progress">
                <div className="color"></div>
            </div>
        </div>
    )

}