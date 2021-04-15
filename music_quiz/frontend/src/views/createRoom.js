import React, {Component} from "react";
import {createRoom} from "../components/roomAPI";

// Logga in med Spotify
// Välj spellista (Richard)
// Hur många frågor
// (ev. Vilken typ av frågor)
export default function CreateRoom({spotifyUsername, loggedInToSpotify, numQuestions, changeNumQuestions, loginSpotify}) {
    return(
        <div>

            <div style={{margin: 30}}>
                <span className={"main-text"}>
                    <button className="button smaller-button">Login with Spotify!</button>
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
                        <button className="button number-button">+</button>
                        <span className="main-text">10</span>
                        <button className="button number-button">-</button>
                    </span>
                </span>
            </div>
            <span className={"main-text"}>
                <button className="button smaller-button" onClick={() => createRoom(5).then(dt => console.log(dt))}>Create Room</button>
            </span>
            <span>
                <button className="button smaller-button"> BACK </button>
            </span>
        </div>
    );
}