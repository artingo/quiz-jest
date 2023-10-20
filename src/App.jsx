import React from 'react'
import './App.css'
import Quiz from './Quiz'
import {jsQuizz} from './constants'

/**
 * {@link Quiz}
 * @returns {JSX.Element}
 */
function App() {
  return (<Quiz questions={jsQuizz.questions}/>)
}

export default App
