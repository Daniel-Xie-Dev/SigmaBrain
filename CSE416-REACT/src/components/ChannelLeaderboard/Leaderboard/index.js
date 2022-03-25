import React, { useState, useEffect } from 'react'
import { useStyles } from './style'
import userApis from '../../../api/user-api'
import RankCard from '../../RankCardTemp'

const ChannelLeaderboard = ({ channelName }) => {
    const classes = useStyles()

    const [localLeaderboard, setLocalLeaderboard] = useState([])
    //Add username to the table??
    useEffect(() => {
        const getLeaderboard = async (leaderboardId) => {
            await userApis.getChannelLeaderboard(leaderboardId).then((response) => {
                setLocalLeaderboard(response.data)
                //console.log(response.data)
            })
        }
        getLeaderboard(channelName);
    }, [])

    //console.log(localLeaderboard)

    return (
        <div className={classes.channelLeaderboardForm}>
            <div className={classes.titleWrapper}>
                <h3 className={classes.title}>Leaderboard for {channelName}</h3>
            </div>
            <div className={classes.textToLeft}>
                {localLeaderboard.map((user, index) =>
                   <RankCard user = {user} index = {index} key = {index}/>
                )}
            </div>
        </div>
    )
}

export default ChannelLeaderboard
