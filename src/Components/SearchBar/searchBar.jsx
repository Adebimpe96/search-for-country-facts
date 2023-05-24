import { useEffect, useState } from 'react';
import axios from 'axios';

import "./searchBar.css";

const SearchBar = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [funFactData, setFunFactData] = useState([]);
    const [searchInput, setSearchInput] =useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    //Fetching Data
    useEffect(() => {
            axios
             .get(`https://63db4515b8e69785e47e7435.mockAPI.io/country`)
             .then((response) => {
             setFunFactData(response.data);
             setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
//getting search query

useEffect(() => {
    const filteredData = funFactData.filter((fact) => {
        return Object.values(fact)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
  }, [funFactData, searchInput]);
    return ( 
    <div className="searchbar">
      <header className="header">
        <h1 className="page-title">Random Country Facts</h1>
        <div className="form-input-group">
          <label className="search-input-label" htmlFor="search">
             <input
                className="search-input"
                type="search"
                name="search"
                id="search"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => {
                   setSearchInput(e.target.value);
                 }}
                required
                />
          </label>
        </div>
      </header>

      <main>
      {isLoading ? (<p>Loading...</p>) : (
        <section className="cards-wrapper">
        {filteredResults.length === 0 ? 
            funFactData.map((data) => (
                <article className="card" key="index">
                <h2 className="short-fact">{data.shortFact}</h2>
                <p className="long-fact">{data.longFact}</p>
                <p className="country-name">{data.country}</p>
              </article>
            )): 
            filteredResults.map((data) => (
                <article className="card" key="index">
                <h2 className="short-fact">{data.shortFact}</h2>
                <p className="long-fact">{data.longFact}</p>
                <p className="country-name">{data.country}</p>
              </article>               
            ))}
        </section>
      )};
    </main>
    </div>
     );
}
 
export default SearchBar;