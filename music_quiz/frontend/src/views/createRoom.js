import React, {Component} from "react";
import {createRoom} from "../components/roomAPI";
import {
    authenticateSpotify,
    getSpotifyPlayer,
    getUserToken,
    playSong,
    spotifyStatus,
    stopPlaying
} from "../components/spotify";
import {onSpotifyWebPlaybackSDKReady} from "../components/webbPlayer";
import model from "../model/model";

// Logga in med Spotify
// Välj spellista (Richard)
// Hur många frågor
// (ev. Vilken typ av frågor)
//                  <span className={"main-text"}>
//                      <button className="button smaller-button" onClick={() => playSong("spotify:track:0VNDOpBbUYtSpCFY7HUA3D")}> play song </button>
//                      <button className="button smaller-button" onClick={() => stopPlaying()}> Stop </button>
//                 </span>
export default function CreateRoom({spotifyUsername, loggedInToSpotify, numQuestions, changeNumQuestions, loginSpotify, createRoom, returnToMain}) {
    return (

        <div>
            <div style={{margin: 30}}>
                {!loggedInToSpotify?<span className={"main-text"}><button className="button smaller-button" onClick={() => loginSpotify()}>Login with Spotify </button></span>
                    :
                    (<div><span className={"main-text"}>Spotify Authenticated!</span> <span className={"main-text"}>Please do not use spotify for anything else during the quiz.</span></div>)}
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