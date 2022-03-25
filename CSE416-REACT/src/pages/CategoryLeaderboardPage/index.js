import React from 'react'
import { useStyles } from './style'
import ChannelLeaderboard from '../../components/Leaderboard/ChannelLeaderboard'
import {SideBar} from '../../components/Home'
import {QUIZ_CATEGORY_NAME} from '../../constant/quiz-category'
import {useParams} from 'react-router-dom'
const CategoryLeaderboardPage = () => {
    const classes = useStyles()
    const {userId} = useParams()
    return (
        <div> 
            <div>
                <SideBar className={classes.sidebar}/>
            </div>
            <div className={classes.pageContainer}>
                <div className={classes.rankContainer}>
                    <div className={classes.title}>Category <span className={classes.subtitle}>{QUIZ_CATEGORY_NAME[userId]}</span> Leaderboard</div>
                    <div className={classes.leaderboard}>
                        <ChannelLeaderboard global={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryLeaderboardPage
