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
  const [correctAnswers, setCorrectAnswers] = React.useState(0)

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
        user_answer={userForm[item.question]}
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
    for (let i = 0; i < Object.keys(userForm).length; i++) {
      if (questions[i].correct_answer === userForm[questions[i].question]) {
        setCorrectAnswers(oldAnswers => oldAnswers+=1)
      }
    }
    setInResults(prevValue => !prevValue)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setUserForm(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  function changeQuestions() {
    setInResults(oldResults => !oldResults)
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
    for (const key in userForm) {
      delete userForm[key]
    }
    setCorrectAnswers(() => 0)
    window.scrollTo(0, 0);
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
            <div className="questions">
              {resultsElements}
              <div className="bottom--results">
                <h3 className="scores">You scored {correctAnswers}/5 correct answers</h3>
                <button className="submit" onClick={changeQuestions}>Play again</button>
              </div>
            </div>
      }
    </main>
  )
}