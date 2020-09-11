import React from "react";
import ReactDOM from "react-dom";

const Header = ({ title }) => <h1>{title}</h1>;

const Part = ({ data }) => (
  <p>
    {data.name} {data.exercises}
  </p>
);

const Content = ({ content }) => (
  <>
    <Part data={content[0]} />
    <Part data={content[1]} />
    <Part data={content[2]} />
  </>
);

const Total = ({ content }) => (
  <p>
    Number of exercises{" "}
    {content[0].exercises + content[1].exercises + content[2].exercises}
  </p>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header title={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
