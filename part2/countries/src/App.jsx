import { useState, useEffect } from 'react'
import axios from 'axios'
import Render from './components/Render'
import Filter from './components/Filter'

function App() {

  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])

  const countriesToShow = result.filter(country => country.name.common.toLowerCase().includes(search.toLocaleLowerCase()))

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(resp => {
        setResult(resp.data)
      })
  }, [])

  const handleCountryInput = (e) => {
    setSearch(e.target.value)
  }
  
  return (
    <>
      <Filter search={search} handleCountryInput={handleCountryInput} />
      <Render countriesToShow={countriesToShow} />
    </>
  )
}

export default App

// (d