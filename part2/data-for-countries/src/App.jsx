import { useState, useEffect } from "react";
import getAll from "./services/countries";
import Headline from "./components/Headline";
import Countries from "./components/Countries";

function App() {
  const [newInput, setNewInput] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    getAll().then((allCountries) => {
      setCountries(allCountries);
    });
  }, []);

  const handleInputChange = (event) => {
    setNewInput(event.target.value);
  };

  const handleShowButton = (countryName) => {
    setNewInput(countryName);
  };

  const filteredCountries =
    newInput === ""
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(newInput.toLowerCase())
        );

  return (
    <>
      <Headline data={newInput} handleInputChange={handleInputChange} />
      <Countries
        countries={filteredCountries}
        handleShowButton={handleShowButton}
      />
    </>
  );
}

export default App;

//

/*

*/
