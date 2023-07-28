import { useEffect, useState } from "react";
import Country from "./Country";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [visitedCountries, setVisitedCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((res) => {
        setCountries(res);
      });
  }, []);

  const visitCountry = (index) => {
    const visitedCountryIndex = visitedCountries.findIndex(
      (country) => country.name.common === countries[index].name.common
    );

    if (visitedCountryIndex === -1) {
      setVisitedCountries([...visitedCountries, countries[index]]);
    } else {
      setVisitedCountries(
        visitedCountries.filter((country, i) => i !== visitedCountryIndex)
      );
    }
  };

  return (
    <div className="countries">
      <div className="countries-left">
        <h2>Countries</h2>
        {countries.map((country, index) => (
          <Country
            key={country.name.common}
            index={index}
            country={country}
            visitCountry={visitCountry}
          />
        ))}
      </div>
      <div className="countries-right">
        <h2>Visited Countries</h2>
        {visitedCountries.map((country, index) => (
          <Country
            key={country.name.common}
            index={index}
            country={country}
            visitCountry={visitCountry}
            visited={true}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
