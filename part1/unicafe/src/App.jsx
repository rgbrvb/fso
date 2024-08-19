import { useState } from 'react'

const Button = (prop) => {
  return (
    <button onClick={prop.handleClick}>{prop.name}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if ((good || neutral || bad) === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="total" value={total} />
      <StatisticLine text="average" value={(good - bad) / total} />
      <StatisticLine text="positive" value={good / total * 100 + " %"} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(prevValue => prevValue + 1)
  }

  const incremetNeutral = () => {
    setNeutral(prevValue => prevValue + 1)
  }

  const incrementBad = () => {
    setBad(prevValue => prevValue + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} name="good" />
      <Button handleClick={incremetNeutral} name="neutral" />
      <Button handleClick={incrementBad} name="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App