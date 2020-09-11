import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatType = ({ type, count }) => (
  <tr>
    <td>{type}</td>
    <td>{count}</td>
  </tr>
);

const Stats = ({ stats }) => {
  const { good, neutral, bad, total } = stats;
  if (total === 0) {
    return <p>Please give us a feedback!</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <td>type</td>
          <td>count</td>
        </tr>
      </thead>
      <tbody>
        <StatType type="good" count={good} />
        <StatType type="neutral" count={neutral} />
        <StatType type="bad" count={bad} />
        <StatType type="total" count={total} />
        <StatType type="average" count={(good * 1 + bad * -1) / total} />
        <StatType type="positive" count={`${(good / total) * 100} %`} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to own state
  const appTitle = "Give Feedback";

  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
  });

  return (
    <>
      <h1>{appTitle}</h1>
      <Button
        text="good"
        handleClick={() =>
          setFeedback({
            ...feedback,
            good: feedback.good + 1,
            total: feedback.total + 1,
          })
        }
      />{" "}
      <Button
        text="neutral"
        handleClick={() =>
          setFeedback({
            ...feedback,
            neutral: feedback.neutral + 1,
            total: feedback.total + 1,
          })
        }
      />{" "}
      <Button
        text="bad"
        handleClick={() =>
          setFeedback({
            ...feedback,
            bad: feedback.bad + 1,
            total: feedback.total + 1,
          })
        }
      />
      <h3>statistics:</h3>
      <Stats stats={feedback} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
