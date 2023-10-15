import { useEffect, useState, useCallback } from 'react'
import Question from "./Question.jsx"
import Loading from './Loading.jsx'
import { nanoid } from 'nanoid'
import "../Components-CSS/Quiz.css"

export default function Quiz(){
    const [questions,setQuestions] = useState([]);
    const [isTimeToDisplayResult,setIsTimeToDisplayResult] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const [warning,setWarning] = useState(false)

    console.log(questions)
    const getOpenTrivitaQuestion =  useCallback(async ()=>{
        const response = await fetch("https://opentdb.com/api.php?amount=5&category=15");
        const result = await response.json();
        const data = result.results;
        const resultQuestions = data.map(questionData =>{
            return {
                id:nanoid(),
                question:questionData.question,
                correct_answer:questionData.correct_answer,
                answers:shuffleArray([questionData.correct_answer,...questionData.incorrect_answers]),
                chosen_answer:""
            }
        })
        return resultQuestions
    },[])

    useEffect(()=>{
        getOpenTrivitaQuestion().then(ourQuestions => {
            setQuestions(ourQuestions)
            setIsLoading(false)
        })
    },[getOpenTrivitaQuestion])

    function chooseAnswer(questionId,chosenAnswer){
        setQuestions(preQuestions => preQuestions.map(question=>{
            return question.id === questionId 
            ?  {...question, chosen_answer:chosenAnswer}
            : question
        }))
    }

    function displayResult(){
        for(let i = 0;i<questions.length;i++){
            if(questions[i].chosen_answer === "")
            {
                setWarning(true)
                return 
            }
        }
        setWarning(false)
        setIsTimeToDisplayResult(true)
    }

    const questionsToDisplay = questions.map(question=>{
        return (
            <Question   
                key={question.id} 
                data={question}
                chooseAnswer={chooseAnswer}
                isTimeToDisplayResult={isTimeToDisplayResult}
                warning={warning}
            />
        )
    })

    function shuffleArray(arr){ 
        let resultArr = []
        let n = arr.length; 
        for(let i=0;i<n;i++){
            const randNumber = Math.floor((Math.random()*arr.length));
            const randomElement = arr.splice(randNumber,1)[0]
            resultArr.push(randomElement);
        }
        arr = resultArr;
        return arr;
    }
    
    function checkScore(){
        let count = 0;
        questions.forEach((question)=>{
            if(question.correct_answer === question.chosen_answer){
                count++
            }
        })
        return count;
    }

    function reset(){
        setIsLoading(true)
        setIsTimeToDisplayResult(false)
        getOpenTrivitaQuestion().then(ourQuestions => {
            setQuestions(ourQuestions)
            setIsLoading(false)
        })
    }

    return(
            isLoading
            ? 
                <Loading />
            :
                <section className="quiz-section">
                    <div className="question-container">
                        {questionsToDisplay}
                    </div>
                    <div className='score-container'>
                        {isTimeToDisplayResult && <p>{`You scored ${checkScore()}/${questions.length} correct answers`}</p>}
                        <button className="check-answer-button" onClick={isTimeToDisplayResult ? reset : displayResult}>
                            {isTimeToDisplayResult ? "Play again" : "Check answers"}
                        </button>
                    </div>
                    <div className='warning-div'>
                        {warning && <p>* Please Answer All Questions!</p>}
                    </div>
                </section>
    )
}