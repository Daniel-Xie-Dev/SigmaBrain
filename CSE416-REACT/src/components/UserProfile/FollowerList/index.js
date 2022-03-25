import userApis from "../../../api/user-api"
import { useState, useEffect, useContext } from "react"
import HEADER from "../../../constant/header"
import AuthContext from "../../../context/auth-context"
import BODY from "../../../constant/body"
import { useStyles } from './style'
import { Button } from "@mui/material"
import FollowerCard from "../../FollowerCard"
const FollowerList = ({self})=>{
    const [followers, setFollowers] = useState([])
    const {auth} = useContext(AuthContext)
    const classes = useStyles()
    const [end, setEnd] = useState(false)
    useEffect(()=>{
        const loadFollower = async()=>{
            if(auth.user != null && auth.user!==undefined){
                const token = await auth.user.getIdToken()
                let headers = {
                    [HEADER.TOKEN]: token
                }
                let response = await userApis.getFollowers(headers)
                // setFollowers(response.data)
                updateFollower(response)
            }
        }
        loadFollower()
    },[auth.user])

    const updateFollower = (response)=>{
        let sub_arr = response.data
        if(response.data.length>0){
            if(response.data.length !== 10){
                setEnd(true)
            }
            let newarr = [...followers]
            for(var i = 0; i < sub_arr.length; i++){
                newarr.push(sub_arr[i])
            }
            setFollowers(newarr)
        }
        else{
            setEnd(true)
        }
    }

    const loadMore = async ()=>{
        if(auth.user != null && auth.user!==undefined){
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN]: token
            }
            let row = followers.length
            let response = await userApis.getFollowers(headers, row)
            updateFollower(response)
        }
    }

    return(
        <div className={classes.container}>
            {followers.map((f, i)=>{
                return <FollowerCard key={i}  follower={f}/>
            })}

            {
                end?<div>That's the end</div>
                :<Button onClick={loadMore}>More</Button>
            }
        </div>
    )
}

export default FollowerList