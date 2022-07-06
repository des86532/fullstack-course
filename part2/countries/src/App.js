import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './component/CountryList'
import Country from './component/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')

  const countriesToShow = countries.filter((item) => item.name.common.includes(filterText))

  const handleChangeFilterText = (e) => {
    setFilterText(e.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      setCountries(res.data)
    })
  }, [])

  return (
    <div>
      <div>find countries<input value={filterText} onChange={handleChangeFilterText} /></div>
      {countriesToShow.length === 1 ? <Country country={countriesToShow[0]}/> : <CountryList countries={countriesToShow} setFilterText={setFilterText} />}
    </div>
  )
}

export default App;
