import { useState } from "react";

const Title = ({ title }) => <h1>{title}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const ShowData = ({ name, value }) => (
  <p>
    {name} {value}
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <div>
      <Title title="give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />

      <Title title="statistics" />
      {total === 0 ? (
        <p>No feedback given yet.</p>
      ) : (
        <>
          <ShowData name="good" value={good} />
          <ShowData name="neutral" value={neutral} />
          <ShowData name="bad" value={bad} />
          <ShowData name="all" value={total} />
          <ShowData name="average" value={average} />
          <ShowData name="average" value={positive + " %"} />
        </>
      )}
    </div>
  );
};

export default App;
