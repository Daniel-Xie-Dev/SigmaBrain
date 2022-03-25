import { useHistory } from "react-router";

const RankCard = ({user, index}) => {
    //Index starts at 0 
    const history = useHistory();
    const rank = index + 1;
    
    const handleClickLeaderboard = () =>{
        //For Now, redirect to the userProfile Page
        history.push(`/profiles/${user.userId}`);
    }

    if(user===undefined){
        return <div>loading</div>
    }
    return(
        <div onClick = {handleClickLeaderboard}>
            {rank + "."+ user.displayName}
        </div>
    )
}

export default RankCard