import React from "react";

export default function FinalScore({scores, returnToMain, playAgain}) {
    var scoress = [
        {name: 'Anty', score: 500},
        {name: 'Rikky', score: 30},
        {name: 'Izzy', score: 500},
        {name: 'fourth', score: 327}
    ];

    return(
        <div>
            <span className={"main-text"}>
                <table className = {"highscore"}>
                    <th  colspan="2">🏆SCOREBOARD🏆</th>
                        <tr>
                            <td>Player:</td>
                            <td>Score:</td>
                        </tr>
                        {scoress.sort(function(a,b){
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