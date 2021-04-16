//Tänker att score datan ser ut så här tuples med (name, score) t.ex. [("Antyklanty", 100), ("Rikky", 5)]
import React from "react";

// sample scores:
//    var scores = [
//        {name: 'Anty', score: 500},
//        {name: 'Rikky', score: 3}
//    ];

export default function FinalScore({scores, returnToMain}){
    return(
        <div>
            <span className={"main-text"}>
                <table>
                    <tr>
                        <th className={"main-text"}> Scores: </th>
                    </tr>
                    {scores.sort(function(a,b){
                        return b.score - a.score;
                    }).map(d =>
                    <tr>
                        <td className={"main-text"}>{d.name}: {d.score}</td>
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