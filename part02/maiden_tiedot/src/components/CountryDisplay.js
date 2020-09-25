import React from 'react'
import Country from './Country'
import CountryListElement from './CountryListElement'

const CountryDisplay = ({countriesToShow, handleClick}) => {
    
    if (countriesToShow.length === 1) {
        return (
            <Country country={countriesToShow[0]}/>
        )
    }

    if (countriesToShow.length < 11) {
        return (
            <div>
                {countriesToShow.map(country => 
                    <CountryListElement key={country.name} name={country.name} handleClick={handleClick}/>
                )}
            </div>
        )
    }
    
    return (
        <div>Too many matches, specify another filter</div>
    )
    
}

export default CountryDisplay