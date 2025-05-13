import ChosenCountry from "./ChosenCountry";

const Countries = ({ countries, handleShowButton }) => {
  if (!countries) {
    return <p>Loading...</p>;
  }

  const numberOfCountries = countries.length;

  if (numberOfCountries > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (numberOfCountries > 1 && numberOfCountries <= 10) {
    return countries.map((country) => (
      <p key={country.name.common}>
        {country.name.common}{" "}
        <button onClick={() => handleShowButton(country.name.common)}>
          Show
        </button>
      </p>
    ));
  } else if (numberOfCountries === 1) {
    return <ChosenCountry country={countries[0]} />;
  }

  return <p>No matches found...</p>;
};

export default Countries;
