import "../Components-CSS/Question.css"
import PropTypes from "prop-types"

export default function Question(props){

    function setStyle(answer){
        let style = {}
        if(props.isTimeToDisplayResult){
            // if it is time to display and the button is the correct answer
            style.opacity = 0.5
            if(props.data.correct_answer === answer){
                style.backgroundColor = "#94D7A2";
                style.opacity = 1;
                style.border = "1px solid transparent" 
            }
            //if it is time to display and the button is chosen but not correct
            else if(props.data.chosen_answer === answer){
                style.backgroundColor = "#F8BCBC";
                
            }
        }
        else{
            // if it is not time to display and answer is chosen
            if(props.data.chosen_answer === answer){
                style.backgroundColor = "#D6DBF5";                
            }
        }
        return style;
    }

    const answersToDisplay = props.data.answers.map((answer)=>{
        return (
            <button key={answer} className="answer-button" style={setStyle(answer)}
            onClick={()=>{props.isTimeToDisplayResult ? "" : props.chooseAnswer(props.data.id,answer)}} >{decodeHtml(answer)}</button>
        )
    })

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    
    return (
        <div className="question-div">
            <p>
                {props.warning && props.data.chosen_answer === "" && <span style={{color:"red"}}>* </span>}
                {decodeHtml(props.data.question)}
            </p>
            <div className="answers-buttons-container">
                {answersToDisplay}
            </div>
        </div>
        )
}

Question.propTypes = {
    data:PropTypes.object.isRequired,
    chooseAnswer:PropTypes.func.isRequired,
    isTimeToDisplayResult:PropTypes.bool.isRequired,
    warning:PropTypes.bool.isRequired
}   
  
  