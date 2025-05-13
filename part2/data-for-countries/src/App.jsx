import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Headline from "./components/Headline";
import Countries from "./components/Countries";

function App() {
  const [newInput, setNewInput] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    countryService.getAll().then((allCountries) => {
      setCountries(allCountries);
    });
  }, []);

  const handleInputChange = (event) => {
    setNewInput(event.target.value);
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
      <Countries countries={filteredCountries} />
    </>
  );
}

export default App;

//

/*

*/
