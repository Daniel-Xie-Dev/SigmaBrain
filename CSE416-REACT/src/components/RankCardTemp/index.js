import { useHistory } from "react-router";
import { useStyles } from './style';

const RankCard = ({ user, index }) => {
    //Index starts at 0 
    const history = useHistory();
    const classes = useStyles();

    const rank = index + 1;

    const handleClickLeaderboard = () => {
        //For Now, redirect to the userProfile Page
        history.push(`/profile/${user.userId}`);
    }

    if (user === undefined) {
        return <div>LOADING</div>
    }
    return (
        
            <div className={classes.rankCardContainer} onClick={handleClickLeaderboard}>
                <div className={classes.rankNumber}> {rank} </div>
                <div> {user.displayName} </div>
                <div> {user.score}</div>
            </div>
    )
}

export default RankCard