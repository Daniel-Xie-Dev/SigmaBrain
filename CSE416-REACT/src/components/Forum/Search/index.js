import React from 'react'
import { useStyles } from './style'

const Search = () => {
    const classes = useStyles()
    return (
        <div>
            <input className = {classes.searchBar} />
            <button>Search</button>
        </div>
    )
}

export default Search