import { useState, useEffect, useContext } from 'react';
import { useStyles } from './style';
import AuthContext from '../../../context/auth-context';
import userApis from '../../../api/user-api';
import HEADER from '../../../constant/header';
import UserCard from '../SubscriptionCard';
import BODY from '../../../constant/body';
import Home_Sign from '../../../images/Home.png'
import Subcription_sign from '../../../images/Subcription.png'
import Channel_sign from '../../../images/Channel.png'
import Watch_Later_sign from '../../../images/watchLater.png'
import Like_Quizzes_sign from '../../../images/LikeQuizzes.png'
import Community_sign from '../../../images/Community.png'
import { useHistory } from 'react-router-dom'
import { Button } from  "@mui/material"
import LOCAL_CONSTANT from '../../../constant/local-storage';
const SideBar = () => {
    const classes = useStyles()
    const [subscriptions, setSubscriptions] = useState([])
    const { auth } = useContext(AuthContext)
    const [end, setEnd] = useState(false)
    const history = useHistory()
    useEffect(()=>{
        const loadSubscriptions = async ()=>{
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN] : token
            }
            let response = await userApis.getSubscriptions(headers)
            updateSubscription(response)
        }

        if(auth.user!=null){
            loadSubscriptions()
        }
 
    }, [auth.user])

    const updateSubscription = (response) => {
        let sub_arr = response.data
        if(response.data.length>0){
            if(response.data.length === 11){
                sub_arr.pop()
            }
            else{
                setEnd(true)
            }
            let new_sub = [...subscriptions]
            for(var i = 0; i < sub_arr.length; i++){
                new_sub.push(sub_arr[i])
            }
            setSubscriptions(new_sub)
        }
        else{
            setEnd(true)
        }
    }
    const redirectToHome = ()=>{
        history.push('/')
    }

    const redirectToSubscription = ()=>{
        history.push('/subscription')
    }


    const redirectTakeLater = ()=>{
        history.push('/takelater')
    }

    const redirectLikeQuizzes = ()=>{
        history.push('/likequizzes')
    }

    const redirectToSetting = ()=>{
        history.push('/setting')
    }

    const redirectToProfile = (userId)=>{
        localStorage.setItem(LOCAL_CONSTANT.PROFILE_TAG, 0)
        history.push(`/profile/${userId}`)
    }

    const getMore = async ()=>{
        if(subscriptions.length>0){
            const last_subscription_id = subscriptions[subscriptions.length-1][BODY.SUBSCRIBEID]
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN] : token
            }
            let payload = {
                [BODY.SUBSCRIBEID]: last_subscription_id
            }
            let response = await userApis.getMoreSubscriptionsById(payload, headers)
            updateSubscription(response)
        }
    }
    return (
        <div className={classes.container}>
            <div className={classes.sideBarContainer}>
                <div className={classes.sideBarSelection}>
                    <div onClick={redirectToHome} className={classes.sideBarSelect}>
                        <img className={classes.image_setting} src={Home_Sign} alt=""/>
                        &nbsp;&nbsp;Home
                    </div>
                    <div onClick={redirectToSubscription} className={classes.sideBarSelect}>
                        <img className={classes.image_setting} src={Subcription_sign} alt=""/>
                        &nbsp;&nbsp;Subscription
                    </div>
                    <div onClick={()=>{history.push('/history')}} className={classes.sideBarSelect}>
                        <img className={classes.image_setting} src={Channel_sign} alt=""/>
                        &nbsp;&nbsp;History
                    </div>
                    <div onClick={redirectTakeLater} className={classes.sideBarSelect}>
                    <img className={classes.image_setting} src={Watch_Later_sign} alt=""/>
                        &nbsp;&nbsp;Take Later
                    </div>
                    <div onClick={redirectLikeQuizzes} className={classes.sideBarSelect}>
                    <img className={classes.image_setting} src={Like_Quizzes_sign} alt=""/>
                        &nbsp;&nbsp;Like Quizzes
                    </div>
                    {/* <div className={classes.sideBarSelect}>
                    <img className={classes.image_setting} src={Community_sign} alt=""/>
                        &nbsp;&nbsp;Community
                    </div> */}
                </div>

                <div className={`${classes.subscriptionTop} ${classes.sideBarSelection}`}>
                    <div className={classes.title}>SUBSCRIPTIONS:</div>
                    <div>
                        {subscriptions.map((sub, i)=>{
                            return <div key={i} onClick={()=>{redirectToProfile(sub[BODY.SUBSCRIBETO])}}><UserCard
                                        subscribeTo={sub[BODY.SUBSCRIBETO]}/></div>
                        })}

                        {   end?<div>That's the end</div>:
                            <Button onClick={getMore}>More</Button>
                        }
                    </div>
                </div>

                <div className={classes.settingBar}>
                    <div onClick={redirectToSetting} className={classes.sideBarSelect}>
                        &nbsp;&nbsp;Settings
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
