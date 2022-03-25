import React, { useContext } from 'react'
import { useStyles } from './style'
import { SideBar} from '../../components/Home'
import SearchResult from '../../components/SearchResult'
import { useEffect, useState } from 'react'
import SearchContext from '../../context/search-context'
import { Button } from '@mui/material'
import QuizListCard from '../../components/QuizListCard'
const SearchResultPage = () => {
    const classes = useStyles()
    const [results, setResults] = useState([])
    const {searchResult, getMoreSearchResult, end} = useContext(SearchContext)
    useEffect(()=>{
        setResults(searchResult)
    },[searchResult])
    return (
        <div> 
            <div>
                <SideBar className={classes.sidebar}/>
            </div>
            <div className={classes.pageContainer}>
                <div>
                    <div className={classes.title}>Search Results</div>
                    <div>
                        {searchResult.map((quiz, i) => {
                                    return <QuizListCard key={i} quiz={quiz}/>
                        })}
                    </div>
                    {
                        end?<div className={classes.endLine}>No More Results!</div>
                        :<Button onClick={getMoreSearchResult}>More</Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchResultPage;