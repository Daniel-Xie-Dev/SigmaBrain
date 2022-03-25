import React from 'react'
import { useStyles } from './style'
import SearchBar from '../../components/Forum/SearchBar'
import TitleBar from '../../components/Forum/TitleBar'
import Category from '../../components/Forum/Category'
import ForumCard from '../../components/Forum/ForumCard'
const ForumPage = () => {
    const classes = useStyles()

    return (
    <div>
        <div className={classes.homeContainer}>
            <div>
                <SearchBar/>
                <TitleBar/>
                <Category/>
                <ForumCard/>
                <ForumCard/>
                <ForumCard/>
                <ForumCard/>
                <ForumCard/>
                <ForumCard/>

            </div>
        </div>
    </div>

    )
}
export default ForumPage