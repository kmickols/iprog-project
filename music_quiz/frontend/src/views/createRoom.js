import React, {Component} from "react";
import {createRoom} from "../components/roomAPI";
import {authenticateSpotify, spotifyStatus} from "../components/spotify";

// Logga in med Spotify
// Välj spellista (Richard)
// Hur många frågor
// (ev. Vilken typ av frågor)
export default function CreateRoom({spotifyUsername, loggedInToSpotify, numQuestions, changeNumQuestions, loginSpotify, createRoom, returnToMain}) {
    return (
        <div>
            <div style={{margin: 30}}>
                <span className={"main-text"}>
                    <button className="button smaller-button" disabled={loggedInToSpotify}
                            onClick={() => {
                                if (spotifyStatus() === true) {
                                    loggedInToSpotify = true;
                                } else {
                                    authenticateSpotify()
                                }
                            }}>Login with Spotify </button>
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
                        <button className="button mini-button"
                                onClick={() => changeNumQuestions(numQuestions + 1)}>+</button>
                        <span className="main-text">{numQuestions}</span>
                        <button className="button mini-button"
                                onClick={() => changeNumQuestions(numQuestions - 1)}>-</button>

                    </span>
                </span>
            </div>
            <span className={"main-text"}>
                <button className="button smaller-button" onClick={() => createRoom()}>Create Room</button>
            </span>
            <span className={"main-text"}>
                <button className="button mini-button" onClick={() => returnToMain()}>  &#5130; Back </button>
            </span>
        </div>
    );
}