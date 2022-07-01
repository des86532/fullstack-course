import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button type="text" onClick={handleClick}>{ text }</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [voteList, setVoteList] = useState(new Array(anecdotes.length).fill(0))

  const addVote = () => {
    const copyList = [...voteList]
    copyList[selected] += 1
    setVoteList(copyList)
  }

  const nextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const maxAnecdoteVoteIndex = voteList.indexOf(Math.max(...voteList))


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {voteList[selected]} points</div>
      <div>
        <Button text="vote" handleClick={addVote} />
        <Button text="next anecdote" handleClick={nextAnecdote} />
      </div>
      <h1>Anedcote with most votes</h1>
      <div>{anecdotes[maxAnecdoteVoteIndex]}</div>
      <div>has {voteList[maxAnecdoteVoteIndex]} points</div>
    </div>
  )
}

export default App