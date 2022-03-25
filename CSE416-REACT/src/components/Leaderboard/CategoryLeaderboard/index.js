import React, { useState, useEffect } from 'react'
import { useStyles } from './style'
import userApis from '../../../api/user-api'
import RankCard from '../../RankCardTemp'
import { useParams } from 'react-router-dom'
const CategoryLeaderboard = () => {
    const classes = useStyles()
    const { category } = useParams()
    const [globalLeaderboard, setglobalLeaderboard] = useState([])
    useEffect(() => {
        const loadLeaderboard = async ()=> {
            let response = await userApis.getGlobalLeaderboard(category)
            console.log(response)
        }
        loadLeaderboard()
    }, [])

    return (
        <div className={classes.channelLeaderboardForm}>
            <div className={classes.gridContainer}>
                <div className={classes.rankCardContainer} >
                    <div>  </div>
                    <div> User </div>
                    <div> Score </div>
                </div>
                <div className={classes.textToLeft}>
                    {globalLeaderboard.map((user, index) =>
                        <RankCard user={user} index={index} key={index} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CategoryLeaderboard
