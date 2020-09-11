import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleInput = (e) => {
    let query = e.target.value.toLowerCase();
    let countriesToShow = countries.filter((c) =>
      c.name.toLowerCase().includes(query)
    );
    setCountriesToShow(countriesToShow);
    setQuery(query);
  };

  const handleClick = (country) => {
    setCountriesToShow(Array.of(country));
  };

  const countryInfo = (country) => (
    <>
      <h1>Country : {country.name}</h1>
      <h2>Capital : {country.capital}</h2>
      <img src={country.flag} alt="flag" style={{ width: "100px" }} />
      <p>population : {country.population}</p>
      <h4>languages</h4>
      <ul>
        {country.languages.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
    </>
  );

  const countriesInfo = (countries) =>
    countries.length === 1
      ? countryInfo(countries[0])
      : countries.map((c) => (
          <div key={c.name}>
            <p>{c.name}</p>
            <button onClick={() => handleClick(c)}>show</button>
          </div>
        ));

  return (
    <>
      <label htmlFor="country_input">find countries : </label>
      <input type="text" onChange={handleInput} name="country_input" />
      {query === "" ? (
        ""
      ) : countriesToShow.length < 10 ? (
        countriesInfo(countriesToShow)
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </>
  );
};

export default App;
