import { createContext, useState, useEffect } from 'react';
import quizApis from '../api/quiz-api';
import { useHistory } from 'react-router-dom'
import LOCAL_CONSTANT from '../constant/local-storage';
const SearchContext = createContext()

function SearchContextProvider(props){
    const [searchResult, setSearchResult] = useState([])
    const [end, setEnd] = useState(false)
    const history = useHistory()

    useEffect(()=>{
        const loadSearches = async ()=>{
            let keyword = localStorage.getItem(LOCAL_CONSTANT.SEARCH_KEYWORD)
            if(keyword!=null && keyword !== undefined){
                let response = await quizApis.getQuizSearchResult(keyword)
                updateSearches(response)
            }
            else{
                setEnd(true)
            }
        }
        loadSearches()
    }, [])

    const searchAndRedirect = async (keyword)=>{
        let response = await quizApis.getQuizSearchResult(keyword)
        localStorage.setItem(LOCAL_CONSTANT.SEARCH_KEYWORD, keyword)
        updateSearches(response, true)
        // setSearchResult(response.data)
        history.push(`/searchResult`)
    }

    const updateSearches = (response, newsearch) => {
        if(response.data.length===0){
            if(newsearch){
                setSearchResult([])
                setEnd(true)
            }
            return
        }
        let sub_arr = response.data
        if(sub_arr.length<5){
            setEnd(true)
        }
        else{
            setEnd(false)
        }
        let new_searches = []
        if(!newsearch){
            new_searches = [...searchResult]
        }
        for(var i = 0; i < sub_arr.length; i++){
            new_searches.push(sub_arr[i])
        }
        setSearchResult(new_searches)
    }

    const getMoreSearchResult = async ()=>{
        let keyword = localStorage.getItem(LOCAL_CONSTANT.SEARCH_KEYWORD)
        let row = searchResult.length
        let response = await quizApis.getMoreSearchResult(keyword, row)
        updateSearches(response)
    }

    return(
        <SearchContext.Provider value={{searchResult, end, searchAndRedirect, getMoreSearchResult}}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchContext
export { SearchContextProvider }