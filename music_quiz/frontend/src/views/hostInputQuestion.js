import React from "react";

export default function HostInputQuestion({question, next}) {
    return(
        <div>
            <span className="main-text extra-big-text">
                {question.text}

    </span>
            <span className="main-text">
          <button className="button submit-button" onClick={() => {next()}}> Continue </button>
      </span>
        </div>
    )

}