function CreateRoom(props) {
    <!--
    Logga in med Spotify
Välj spellista (Richard)
Hur många frågor
(ev. Vilken typ av frågor)

-->
    return(

        <div>

            <header>
                <h1 className="header"> Music Quiz</h1>
            </header>
            <div style="margin: 30px">
      <span className="main-text">
              Login with Spotify!
            </span>
            </div>
            <div style="margin: 30px">

      <span className="main-text">
                Choose Playlist:
            </span>
            </div>
            <div style="margin-top: 30px">

      <span className="main-text">
                   Questions:
                      <span> <button className="number-button">-</button>
                          <span className="main-text">10</span><button className="number-button">+</button>
            </span>
                      </span>


            </div>

        </div>
    );
}