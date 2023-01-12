import React from "react"
import Start from "./components/Start"
import Question from "./components/Question"

export default function App() {
  const [inGame, setInGame] = React.useState(false)
  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }, [])

  //https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  const questionsElements = questions.map(item => {
    return(
      <Question 
        question={htmlDecode(item.question)}
        correct_answer={htmlDecode(item.correct_answer)}
        incorrect_answer={htmlDecode(item.incorrect_answers)}
      />
    )}
  )

  function handleStart() {
    setInGame(oldValue => !oldValue)
    console.log(questions[1])
    console.log(questions)
    console.log(questionsElements[1])
    console.log(questionsElements)
  }

  return(
    <main>
      {
        !inGame ?
        <Start 
          handleStart={handleStart}
        /> :
        <div>
          {questionsElements}
        </div>
      }
    </main>
  )
}