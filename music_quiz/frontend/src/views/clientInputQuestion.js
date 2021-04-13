function ClientInputQuestion(props) {
    return(
        <div>
            <header>
                <h1 className="header-side"> Music Quiz</h1>
            </header>

            <span className="main-text">

        This is a very good song
                <!--Question goes here-->

                <table style="display: grid; justify-content: center">
                <tr>
              <td>

Song title:              </td>
          </tr>
       <tr>
        <td>
            <input placeholder="Type answer text here" className="fill-form"/>
        </td>
      </tr>
          <tr>
              <td>
                  Artist:
              </td>
          </tr>
      <tr>
        <td>
            <input placeholder="Type answer text here" className="fill-form "/>
        </td>
      </tr>
      </table>
    </span>
            <span className="main-text">
          <button className="submit-button"> Done </button>
      </span>
        </div>
    )

}