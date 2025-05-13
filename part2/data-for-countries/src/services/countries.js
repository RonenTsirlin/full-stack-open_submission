import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const getAll = () => {
  return axios.get(`${baseUrl}api/all`).then((countries) => countries.data);
};

const getSpecific = (newInput) => {
  console.log(newInput);
  return axios
    .get(`${baseUrl}api/name/${newInput}`)
    .then((countries) => countries);
};

export default { getAll, getSpecific };
