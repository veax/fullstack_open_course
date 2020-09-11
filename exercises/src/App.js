import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      console.log(res);
      setPersons(res.data);
    });
  }, []);
  return (
    <>
      {persons.map((p) => (
        <p key={p.id}>{p.name}</p>
      ))}
    </>
  );
};

export default App;
