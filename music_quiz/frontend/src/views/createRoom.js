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
export default function CreateRoom({spotifyUsername, loggedInToSpotify, numQuestions, changeNumQuestions, loginSpotify, createRoom, returnToMain, changeQuizType, quizTypes, checked}) {
    return (

        <div className="main-text">
            <div>
                {!loggedInToSpotify?<span className={"main-text"}><button className="button smaller-button" onClick={() => loginSpotify()}>Login with Spotify </button></span>
                    :
                    (<div className="authenticated"><span className={"main-text"}>Spotify Authenticated!</span> <span className={"main-text"}>Please do not use Spotify for anything else during the quiz.</span></div>)}
            </div>
            <div>
                <span className="createRoom">
                Choose Genre & Number of questions:
                </span>
                    <span className="createRoom">
                        <div className="radio-genre">
                            {
                                quizTypes.map(type => {
                                return (
                                    <span>
                                        <input type="radio" id={"radio"+type} name="radioGenre" value={type} checked={type === checked} onClick={() => changeQuizType(type)}/>
                                            <label htmlFor={"radio"+type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
                                    </span>
                                )
                            })}
                    </div>
                </span>
            </div>
            <div>
                <span className="main-text">
                    <span className="main-text">
                        <button className="button mini-button"
                                onClick={() => changeNumQuestions(numQuestions + 1)}>+</button>
                        <span className="createRoom">{numQuestions} Questions </span>
                        <button className="button mini-button"
                                onClick={() => changeNumQuestions(numQuestions - 1)}>-</button>
                    </span>
                </span>
            </div>

            <div>
                {!loggedInToSpotify?<div className={"main-text"}><div className={"authmsg"}><span>
                        <button className={"button disabled-button"}>Create Room</button></span></div>
                        <div className={"hidden"}>Please login to Spotify</div></div>
                    :
                <span className={"main-text"}>
                <button className="button smaller-button" onClick={() => createRoom()}>Create Room</button>
                </span>}
            </div>
            <span className={"main-text"}>
                <button className="button mini-button" onClick={() => returnToMain()}>  &#5130; Back </button>
            </span>
        </div>
    );
}
// <span className="main-text">  <label>Genre:</label>
//         <select name="genre" id="genre">
//           <option value="Pop">Pop</option>
//           <option value="Dance">Dance</option>
//           <option value="Rock">Rock</option>
//           <option value="Hiphop">Hiphop</option>
//         </select>
//     </span>