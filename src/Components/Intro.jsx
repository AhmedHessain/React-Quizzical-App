import "../Components-CSS/Intro.css"
import PropTypes from "prop-types"

export default function Intro(props){
    return (
        <section className="intro-section">
            <h1>
                Quizzical
            </h1>
            <p>
                some description if needed
            </p>
            <button onClick={props.startQuiz}>
                Start Quiz
            </button>
        </section>
    )
}

Intro.propTypes = {
    startQuiz:PropTypes.func.isRequired
}   
  
  