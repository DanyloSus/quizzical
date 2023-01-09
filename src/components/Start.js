import React from "react"

export default function Start(props) {
    return(
        <div className="start">
            <h1 className="start--name">Quizzical</h1>
            <p className="start--description">Answer on easy question and have fun</p>
            <button 
                className="start--button"
                onClick={props.handleStart}
            >
                Start quiz</button>
        </div>
    )
}