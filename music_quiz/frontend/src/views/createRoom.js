import React, {Component} from "react";
import {createRoom} from "../components/roomAPI";

// Logga in med Spotify
// Välj spellista (Richard)
// Hur många frågor
// (ev. Vilken typ av frågor)
export default function CreateRoom({spotifyUsername, loggedInToSpotify, numQuestions, changeNumQuestions, loginSpotify, createRoom}) {
    return(
        <div>
            <div style={{margin: 30}}>
                <span className={"main-text"}>
                    <button className={"flat-button"} onClick={() => loginSpotify()}>Login with Spotify!</button>
                </span>
            </div>

            <div style={{margin: 30}}>
                <span className="main-text">
                Choose Playlist:
                </span>
            </div>
            <div style={{marginTop: 30}}>
                <span className="main-text">
                   Number of Questions:
                    <span className={"main-text"}>
                        <button className="number-button" onClick={() => changeNumQuestions(numQuestions + 1)}>+</button>
                        <span className="main-text">{numQuestions}</span>
                        <button className="number-button" onClick={() => changeNumQuestions(numQuestions - 1)}>-</button>
                    </span>
                </span>
            </div>
            <span className={"main-text"}>
                <button className="smaller-button" onClick={() => createRoom()}>Create Room</button>
            </span>
        </div>
    );
}