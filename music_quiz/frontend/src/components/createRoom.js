import React, {Component} from "react";
import {createRoom} from "./RoomAPI";

//    Logga in med Spotify
//Välj spellista (Richard)
//Hur många frågor
//(ev. Vilken typ av frågor)
export default function CreateRoom(props) {

    return(

        <div>
            <header>
                <h1 className="header"> Music Quiz</h1>
            </header>
            <div style={{margin: 30}}>
      <span className="main-text">
              Login with Spotify!
            </span>
            </div>
            <div style={{margin: 30}}>

      <span className="main-text">
                Choose Playlist:
            </span>
            </div>
            <div style={{marginTop: 30}}>

      <span className="main-text">
                   Questions:
                      <span> <button className="number-button">-</button>
                          <span className="main-text">10</span><button className="number-button">+</button>
            </span>
                      </span>


            </div>
        <button onClick={ev => createRoom(5).then(dt => console.log(dt))}>Create Room</button>
        </div>
    );
}