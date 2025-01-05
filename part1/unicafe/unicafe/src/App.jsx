import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => <tr><th>{text}</th><th>{value}</th></tr>

const Statistics = ({good, neutral, bad, total}) => {
  const average = ((good - bad) / total) || 0
  const positive = ((100 * good / total) || 0) + " %"
  
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total = good + neutral + bad 

  return (
    <div>
      <Header text="give feedback"/>
      <Button text="good" onClick={() => setGood(good + 1)}/>
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" onClick={() => setBad(bad + 1)}/>
      <Header text="statistics"/>
      {
        total && 
        <Statistics good={good} neutral={neutral} bad={bad} total={total}/> 
        || <p>No feedback given</p>
      }
    </div>
  )
}

export default App