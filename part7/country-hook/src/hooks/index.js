import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      async function fetchCountryData() {
        try {
          const countryData = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
          setCountry(countryData.data[0])
        } catch (err) {
          setCountry(null)
        }
      }

      fetchCountryData()
    }
  }, [name])

  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')
  
  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}