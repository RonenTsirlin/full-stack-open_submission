import { useState } from "react";

const Title = ({ title }) => <h1>{title}</h1>;

const PrintData = ({ data }) => <p>{data}</p>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const [maxVote, setMaxVote] = useState(0);

  const setRandomSelected = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    randomNumber === selected
      ? setSelected(Math.floor(Math.random() * anecdotes.length))
      : setSelected(randomNumber);
  };

  const setNewVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);

    setMaxVote(copy.indexOf(Math.max(...copy)));
  };

  return (
    <div>
      <Title title="Anecdote of the day" />
      {anecdotes[selected]}
      <br />
      <PrintData data={"has " + votes[selected] + " votes"} />
      <Button onClick={setNewVote} text="vote" />
      <Button onClick={setRandomSelected} text="next anecdote" />

      {Math.max(...votes) === 0 ? (
        <></>
      ) : (
        <>
          <Title title="Anecdote With most votes" />
          {anecdotes[maxVote]}
          <PrintData data={"has " + votes[maxVote] + " votes"} />
          <br />
        </>
      )}
    </div>
  );
};

export default App;
