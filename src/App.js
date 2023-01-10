import React from "react"
import Start from "./components/Start"
import Question from "./components/Question"

export default function App() {
  const [inGame, setInGame] = React.useState(false)
  const [questions, setQuestions] = React.useState()

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }, [])

  function handleStart() {
    setInGame(oldValue => !oldValue)
    console.log(inGame)
    console.log(questions)
  }


  return(
    <main>
      {
        !inGame ?
        <Start 
          handleStart={handleStart}
        /> :
        <Question 
          question={questions[0].question}
          correct_answer={questions[0].correct_answer}
          incorrect_answer={questions[0].incorrect_answers}
        />
      }
    </main>
  )
}