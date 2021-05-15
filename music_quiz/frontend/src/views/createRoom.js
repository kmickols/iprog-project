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
export default function CreateRoom({spotifyUsername, loggedInToSpotify, numQuestions, changeNumQuestions, loginSpotify, createRoom, returnToMain, changeQuizType}) {
    return (

        <div className="main-text">
            <div>
                {!loggedInToSpotify?<span className={"main-text"}><button className="button smaller-button" onClick={() => loginSpotify()}>Login with Spotify </button></span>
                    :
                    (<div className="authenticated"><span className={"main-text"}>Spotify Authenticated!</span> <span className={"main-text"}>Please do not use spotify for anything else during the quiz.</span></div>)}
            </div>
            <div>
                <span className="createRoom">
                Choose Genre & Number of questions:
                </span>
                <span className="createRoom">
                    <div className="radio-genre">
                        <input type="radio" id="radioRock" name="radioGenre" value="rock" onClick={() => changeQuizType("rock")}></input>
                            <label htmlFor="radioRock">Rock</label>

                        <input type="radio" id="radioPop" name="radioGenre" value="pop" onClick={() => changeQuizType("pop")}></input>
                            <label htmlFor="radioPop">Pop</label>

                        <input type="radio" id="radioDance" name="radioGenre" value="dance" onClick={() => changeQuizType("dance")}></input>
                            <label htmlFor="radioDance">Dance</label>

                        <input type="radio" id="radioHiphop" name="radioGenre" value="hiphop" onClick={() => changeQuizType("hiphop")}></input>
                        <label htmlFor="radioHiphop">Hiphop</label>
                    </div>
                </span>
            </div>
            <div>
                <span className="main-text">
                    <span className="main-text">
                        <button className="button mini-button"
                                onClick={() => changeNumQuestions(numQuestions + 1)}>+</button>
                        {numQuestions} Questions
                        <button className="button mini-button"
                                onClick={() => changeNumQuestions(numQuestions - 1)}>-</button>
                    </span>
                </span>
            </div>

            <div>
                {!loggedInToSpotify?<div className={"main-text"}><div className={"authmsg"}><span><button className={"disabledbutton"}>Create Room</button></span></div>
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