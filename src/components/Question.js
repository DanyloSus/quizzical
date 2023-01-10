import React from "react"

export default function Question(props) {
    return(
        <div className="question">
            <h4 className="question--text">{props.question}</h4>
            <div className="question--answers">
                <button className="answers--button">{props.correct_answer}</button>
                <button className="answers--button">{props.incorrect_answer[0]}</button>
                <button className="answers--button">{props.incorrect_answer[1]}</button>
                <button className="answers--button">{props.incorrect_answer[2]}</button>
            </div>
            <hr className="question--line"/>
        </div>
    )
}