import React from "react"
import Start from "./components/Start"
import Question from "./components/Question"

const randArr = [
  Math.floor(Math.random() * 5),
  Math.floor(Math.random() * 5),
  Math.floor(Math.random() * 5),
  Math.floor(Math.random() * 5),
  Math.floor(Math.random() * 5)
]

export default function App() {
  const [inGame, setInGame] = React.useState(false)
  const [inResults, setInResults] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [userForm, setUserForm] = React.useState({})

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }, [])

  const questionsElements = questions.map(item => {
    const answers = []
    for (let i = 0; i < item.incorrect_answers.length; i++) {
      answers.push(item.incorrect_answers[i])
    }
    answers.splice(randArr[questions.indexOf(item)], 0, item.correct_answer)
    return (
      <Question
        question={item.question}
        answers={answers}
        key={questions.indexOf(item)}
        handleChange={handleChange}
        disabled={false}
      />
    )
  }
  )

  const resultsElements = questions.map(item => {
    const answers = []
    for (let i = 0; i < item.incorrect_answers.length; i++) {
      answers.push(item.incorrect_answers[i])
    }
    answers.splice(randArr[questions.indexOf(item)], 0, item.correct_answer)
    return (
      <Question
        question={item.question}
        correct_answer={item.correct_answer}
        answers={answers}
        key={questions.indexOf(item)}
        disabled={true}
      />
    )
  }
  )

  function handleStart() {
    setInGame(oldValue => !oldValue)
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(userForm[questions[0].question] === questions[0].correct_answer)
    setInResults(prevValue => !prevValue)
  }

  function handleChange(event) {
    const { name, value } = event.target
    console.log(value)
    setUserForm(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  return (
    <main>
      {
        !inGame ?
          <Start
            handleStart={handleStart}
          /> :
          !inResults ?
            <form className="questions" onSubmit={handleSubmit}>
              {questionsElements}
              <button className="submit">Check answers</button>
            </form> :
            <div>
              {resultsElements}
            </div>
      }
    </main>
  )
}