const Countries = ({ countries }) => {
  if (!countries) {
    return <p>Loading...</p>;
  }

  const numberOfCountries = countries.length;

  if (numberOfCountries > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (numberOfCountries > 1 && numberOfCountries <= 10) {
    return countries.map((country) => (
      <p key={country.name.common}>{country.name.common}</p>
    ));
  } else if (numberOfCountries === 1) {
    const chosenCountry = countries[0];
    return (
      <div>
        <h1>{chosenCountry.name.common}</h1>
        <p>Capital {chosenCountry.capital}</p>
        <p>Area {chosenCountry.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(chosenCountry.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={chosenCountry.flags.png} alt={chosenCountry.flags.alt} />
      </div>
    );
  }

  return <p>No matches found...</p>;
};

export default Countries;
