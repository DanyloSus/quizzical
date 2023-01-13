import React from "react"

export default function Question(props) {
    //https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
    function htmlDecode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    console.log(props.disabled)

    const answers = props.answers.map(answer => (
        <div key={answer}>
            <input
                type="radio"
                name={props.question}
                value={answer === props.correct_answer}
                id={answer}
                onChange={props.handleChange}
                disabled={props.disabled}
            />
            <label
                htmlFor={answer}
                className={
                    props.disabled ?
                    answer === props.correct_answer ? 
                        "answers--button correct" : 
                        "answers--button uncorrect" :
                    "answers--button"
                }
            >
                {htmlDecode(answer)}
            </label><br />
        </div>
    ))

    return (
        <div className="question">
            <h4 className="question--text">{htmlDecode(props.question)}</h4>
            <div className="question--answers">
                {answers}
            </div>
            <hr className="question--line" />
        </div>
    )
}