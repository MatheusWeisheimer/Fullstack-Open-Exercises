import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ] 
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  
  const handleNext = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  
  const handleVote = () => {
    setVotes({
      ...votes,
      [selected]: votes[selected] ? votes[selected] + 1 : 1
    })
  }

  const getMostVoted = () => {
    let mostVotes = 0
    let mostVoted

    for (let option in votes) {
      if (votes[option] > mostVotes) {
        mostVotes = votes[option]
        mostVoted = option
      }
    }
    
    return mostVoted
  }
  
  const mostVoted = getMostVoted()

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] ? votes[selected] : 0} votes</p>
      <Button text={"vote"} onClick={handleVote}/>
      <Button text={"next anecdote"} onClick={handleNext}/>
      {
        mostVoted &&
        <>
          <Header text="Anecdote with most votes"/>
          <p>{anecdotes[mostVoted]}</p>
          <p>has {votes[mostVoted]} votes</p>
        </> 
      }
    </div>
  )
}

export default App