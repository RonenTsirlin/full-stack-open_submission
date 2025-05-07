import { useState } from "react";

const Title = ({ title }) => <h1>{title}</h1>;

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Stat = (stat) => (
  <p>
    {stat.name} {stat.value}
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

  return (
    <div>
      <Title title="give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Title title="statistics" />
      <Stat name="good" value={good} />
      <Stat name="neutral" value={neutral} />
      <Stat name="bad" value={bad} />
    </div>
  );
};

export default App;
