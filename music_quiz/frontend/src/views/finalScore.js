import React from "react";

export default function FinalScore({scores, returnToMain, playAgain}) {
    return(
        <div>
            <span className={"main-text"}>
                <table className = {"highscore"}>
                    <th  colspan="2">🏆SCOREBOARD🏆</th>
                        <tr>
                            <td>Player:</td>
                            <td>Score:</td>
                        </tr>
                        {scores.sort(function(a,b){
                            return b.score - a.score;
                        }).map(d =>
                        <tr>
                            <td>{d.name}</td>
                            <td>{d.score}</td>
                        </tr>
                    )}
                </table>
            </span>
            <span className={"main-text"}>
                <button className={"button smaller-button"} onClick={() => returnToMain()}>Return To Main Menu</button>
                <button className={"button smaller-button"} onClick={() => playAgain()}>Play again!</button>
            </span>
        </div>
    )
}