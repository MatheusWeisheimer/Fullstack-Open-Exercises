import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Statistic = ({title, value}) => <p>{title} {value}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total = good + neutral + bad 
  const average = ((good - bad) / total) || 0
  const positive = ((100 * good / total) || 0) + " %"

  return (
    <div>
      <Header text="give feedback"/>
      <Button text="good" onClick={() => setGood(good + 1)}/>
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" onClick={() => setBad(bad + 1)}/>
      <Header text="statistics"/>
      <Statistic title="good" value={good}/>
      <Statistic title="neutral" value={neutral}/>
      <Statistic title="bad" value={bad}/>
      <Statistic title="all" value={total}/>
      <Statistic title="average" value={average}/>
      <Statistic title="positive" value={positive}/>
    </div>
  )
}

export default App