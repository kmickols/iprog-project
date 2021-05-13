import React from "react";

// sample scores:
/*
    var scores = [
        {name: 'Anty', score: 50220},
        {name: 'Rikky', score: 250},
        {name: 'Izzy', score:  7}
    ];
*/

export default function FinalScore({score, returnToMain}){

    return(
        <div>
            <span className={"main-text"}>
                <table className = {"highscore"}>
                    <th  colspan="2">🏆SCOREBOARD🏆</th>
                        <tr>
                            <td>Player:</td>
                            <td>Score:</td>
                        </tr>
                        {score.sort(function(a,b){
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
                <button className={"button launch-button"} onClick={() => returnToMain()}>Return To Menu</button>
            </span>
        </div>
    )
}