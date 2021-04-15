//Tänker att score datan ser ut så här tuples med (name, score) t.ex. [("Antyklanty", 100), ("Rikky", 5)]
import React from "react";



export default function FinalScore(){
    var scores = [
        {name: 'Anty', score: 500},
        {name: 'Rikky', score: 3}
    ];
    return(
        <div>
            <table>
                <tr>
                    <th> Player </th>
                    <th> Score</th>
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
        </div>
    )
}