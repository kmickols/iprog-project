export default function ClientInputQuestion({question}) {
    return(
        <div>
            <span className="main-text">

                This is a very good song
                <!--Question goes here-->
                {question.text}
                <table style="display: grid; justify-content: center">
                         {questions.data.map(
                             function () {
                             return(
                             <div>
                <tr><td>
                    {question.body.text}: <!--Song title: -->
                                </td>
          </tr>
       <tr>
        <td>
            <input placeholder="Type answer text here" className="fill-form"/>
        </td>
      </tr>
          <tr>
              <td>
                  {question.body.text} <!-- Artist: -->
              </td>
          </tr>
      <tr>
        <td>
            <input placeholder="Type answer text here" className="fill-form "/>
        </td>
      </tr></div>)})};

       </table>
    </span>
            <span className="main-text">
          <button className="button submit-button"> Done </button>
      </span>
        </div>
    )

}