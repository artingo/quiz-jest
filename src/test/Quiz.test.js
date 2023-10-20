import {fireEvent, render, screen} from '@testing-library/react'
import Quiz from '../Quiz'
import {jsQuizz} from '../constants'

describe('Testing the quiz component', () => {
  it('Should render current quiz number', () => {
    render(<Quiz questions={jsQuizz.questions}/>)
    const currentQuestionNo = screen.getByRole('status')
    expect(currentQuestionNo.textContent).toBe('1')
  })

  it('Should render number of total questions', () => {
    render(<Quiz questions={jsQuizz.questions}/>)
    const totalQuestionsNo = screen.getByRole('meter')
    expect(totalQuestionsNo.textContent).toContain('5')
  })

  it('Should render text of first question', () => {
    render(<Quiz questions={jsQuizz.questions}/>)
    const questText = jsQuizz.questions[0].question
    const h2 = screen.getByRole('heading')
    expect(h2.textContent).toBe(questText)
  })

  it('Should show all answers', () => {
    render(<Quiz questions={jsQuizz.questions}/>)
    const answers = jsQuizz.questions[0].choices
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toBe(answers.length)
  })

  it('First answer should be unselected at the beginning', () => {
    render(<Quiz questions={jsQuizz.questions}/>)
    const listItem = screen.getAllByRole('listitem')[0]
    expect(listItem.classList).not.toContain('selected-answer')
  })

  it('Should highlight answer on click', () => {
    render(<Quiz questions={jsQuizz.questions}/>)
    const listItem = screen.getAllByRole('listitem')[0]
    fireEvent.click(listItem)
    expect(listItem.classList).toContain('selected-answer')
  })

  it('Should enable the next-button by click on first answer', () => {
    render(<Quiz questions={jsQuizz.questions}/>)
    fireEvent.click(screen.getAllByRole('listitem')[0])
    const nextButton = screen.getByTestId('next-button')
    expect(nextButton.disabled).toBeFalsy()
  })

  it('Should show 2nd answer after click on next-button', () => {
    render(<Quiz questions={jsQuizz.questions}/>)
    fireEvent.click(screen.getAllByRole('listitem')[0])
    fireEvent.click(screen.getByTestId('next-button'))
    const currentQuestionNo = screen.getByRole('status')
    expect(currentQuestionNo.textContent).toBe('2')
  })

  it('Should switch to finish-button on the last question', () => {
    render(<Quiz questions={jsQuizz.questions}/>)

    // the 'Next' button
    const button = screen.getByTestId('next-button')

    // click through all questions
    for (let i = 0; i < jsQuizz.questions.length - 1; i++) {
      fireEvent.click(screen.getAllByRole('listitem')[0])
      fireEvent.click(button)
    }

    const currentQuestionNo = screen.getByRole('status')
    expect(currentQuestionNo.textContent).toBe(jsQuizz.questions.length + '')
    expect(button.textContent).toBe('Finish')
  })
})
