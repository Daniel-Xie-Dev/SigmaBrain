import React from 'react'
import { useStyles } from './style';
import SearchResultCard from './SearchResultCard';

const SearchResult = ({results}) => {
    const classes = useStyles();
    return (
        <div className={classes.cardContainer}>
            {results.map((r,i) => {
                return  <div key={i}><SearchResultCard
                            result={r}
                        /></div>
            })}
        </div>
    )
}

export default SearchResult