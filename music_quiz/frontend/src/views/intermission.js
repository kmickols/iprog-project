import React from "react";

export default function Intermission({score, player, next, message}) {
    return(
        <div>
            <span className={"main-text"}>
                {message?message:null}
            </span>
            <br/>
            <br/>
            <span className={"main-text"}>
                Press the button when the host continues to the next question!
                <span className={"main-text"}>
                    <br/>
                    <button className={"button submit-button"} onClick={() => next()}>Continue</button>
                </span>
            </span>

            <span className="score"> Score: {score}
             </span>
            <span className="player"> Player: {player}
             </span>


        </div>
    );

}