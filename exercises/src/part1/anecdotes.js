import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [maxVoted, setMaxVoted] = useState(null);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const genRandom = (limit) =>
    setSelected(Math.floor(Math.random() * Math.floor(limit)));

  const handleVote = () => {
    let copyPoints = { ...points };
    copyPoints[selected] += 1;
    setPoints(copyPoints);
    if (maxVoted === null || copyPoints[selected] > copyPoints[maxVoted]) {
      setMaxVoted(selected);
    }
  };
  return (
    <>
      <h3>Anecdote of the day</h3>
      <div>{props.anecdotes[selected]}</div>
      <p>has {points[selected]} votes</p>
      <button onClick={() => handleVote()}>vote</button>
      <button onClick={() => genRandom(anecdotes.length - 1)}>
        Next anecdote
      </button>
      <h3>Anecdote with most votes</h3>
      {maxVoted !== null ? <div>{props.anecdotes[maxVoted]}</div> : null}
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
