import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => <h1>{props.course}</h1>;

const Content = ({ part1, part2, part3 }) => (
  <>
    <Part name={part1.name} exNumber={part1.exercises1} />
    <Part name={part2.name} exNumber={part2.exercises2} />
    <Part name={part3.name} exNumber={part3.exercises3} />
  </>
);

const Part = ({ name, exNumber }) => (
  <p>
    {name} {exNumber}
  </p>
);

const Total = ({ exercises1, exercises2, exercises3 }) => (
  <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
);

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={{ name: part1, exercises1 }}
        part2={{ name: part2, exercises2 }}
        part3={{ name: part3, exercises3 }}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
