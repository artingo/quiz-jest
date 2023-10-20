import React, { Fragment } from "react"
import { useState } from "react"
import { resultInitalState } from './constants'


const Quiz = (props) => {
  const questions = props.questions
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [chosenAnswer, setChosenAnswer] = useState(null)
  const [isAnswerCorrect, setisAnswerCorrect] = useState(null)
  const [result, setResult] = useState(resultInitalState)
  const [showResult, setShowResult] = useState(false)

  const { question, choices, correctAnswer } = questions[currentQuestion]

  const onAnswerClick = (answer, index) => {
    setChosenAnswer(index)
    if (answer === correctAnswer) {
      setisAnswerCorrect(true)
    }
    else {
      setisAnswerCorrect(false)
    }
  }

  const onClickNext = () => {
    setChosenAnswer(null)
    setResult((prev) =>
      isAnswerCorrect
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1
        } : {
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1
        }
    )
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setCurrentQuestion(0)
      setShowResult(true)
    }
  }

  return (
    <div className='quiz-container'>
      {!showResult ? (
      <Fragment>
        <span className="active-question-no" role="status">{currentQuestion + 1}</span>
        <span className="total-question" role="meter">/{questions.length}</span>
        <h2>{question}</h2>
        <ul>
          {choices.map((answer, index) => (
            <li
              onClick={() => onAnswerClick(answer, index)}
              key={answer}
              className={chosenAnswer === index ? 'selected-answer' : null}
            >{answer}
            </li>
          ))}
        </ul>
        <div className="footer">
          <button data-testid="next-button"
            onClick={onClickNext}
            disabled={chosenAnswer === null}>
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </Fragment>
      ) : (
        <div className="result">
          <h3>Result</h3>
        </div>
      )}
    </div>
  )
}

export default Quiz
