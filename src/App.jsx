import SVGS from "./Components/SVGS.jsx"
import Quiz from "./Components/Quiz.jsx"
import Intro from "./Components/Intro.jsx"
import { useState } from "react"
export default function App(){
    const [start,setStart] = useState(false)
    function startQuiz(){
        setStart(true)
    } 
    return (
        <main>
            <SVGS />
            {
                start  
                ? <Quiz />
                : <Intro startQuiz={startQuiz} />
            }
        </main>
    )
}