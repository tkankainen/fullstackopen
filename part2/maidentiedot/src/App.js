import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({ search, handleChange}) => {
  return (
    <form>find countries <input 
      value={search}
      onChange={handleChange}
      />
    </form>
  )
}

const Country = ({ data, search }) => {

  const countries = data.filter(country =>
    country.name.common.toUpperCase().includes(search.toUpperCase())
  );

  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (countries.length > 1) {
    return (
      <div>
        {data
        .filter(country => country.name.common.toUpperCase().includes(search.toUpperCase()))
        .map(country => 
          <p key={country.name.common}> {country.name.common} </p>
        )}
    </div>
    )
  }

  if (countries.length === 1) {
    return (
      <div>
      <ul>
      {countries
        .filter(country =>
          country.name.common.toUpperCase().includes(search.toUpperCase())
        )
        .map(country => 
          <div key={country.name.common}> 
          <h3>{country.name.common}</h3> 
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h4>languages:</h4>
          <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <p><img src={country.flags.png} alt="flag" /></p>
          </div>
        )}
    </ul>
    </div>
    )
  }
}

const App = () => {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <Search
        search={search}
        handleChange={handleChange}
      />
      <Country
        data={data}
        search={search}
      />
    </div>
  );
}

export default App;
