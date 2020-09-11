import React from "react";

const Header = ({ title }) => <h1>{title}</h1>;

const Part = ({ data }) => (
  <p>
    {data.name} {data.exercises}
  </p>
);

const Content = ({ content }) => (
  <div>
    {content.map((part) => (
      <Part key={part.id} data={part} />
    ))}
  </div>
);

const Total = ({ content }) => (
  <p>
    Number of exercises{" "}
    {content.map((part) => part.exercises).reduce((a, b) => a + b, 0)}
  </p>
);

const Course = ({ course }) => (
  <div>
    <Header title={course.name} />
    <Content content={course.parts} />
    <Total content={course.parts} />
  </div>
);

export default Course;
