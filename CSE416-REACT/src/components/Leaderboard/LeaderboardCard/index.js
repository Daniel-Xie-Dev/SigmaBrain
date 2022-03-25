import BODY from "../../../constant/body"
import {useStyles} from "./style"
import userApi from "../../../api/user-api"
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import default_profile from "../../../images/Default_profile.png"
import LOCAL_CONSTANT from "../../../constant/local-storage"
const LeaderboardCard = ({user, rank})=>{
    //className={classes.rowContainer}
    const classes = useStyles()
    const [image, setImage] = useState("")
    const history = useHistory()
    useEffect(()=>{
        const loadProfile = async()=>{
            try {
                let response = await userApi.getProfileImage(user[BODY.USERID])
                if(response.data==null || response.data==""){
                    setImage(default_profile)
                    return
                }
                setImage(response.data)
            } catch{
                setImage(default_profile)
            }
        }
        loadProfile()
    },[])

    const redirectToProfile = ()=>{
        localStorage.setItem(LOCAL_CONSTANT.PROFILE_TAG, 0)
        history.push(`/profile/${user[BODY.USERID]}`)
    }

    return(
        <tr key={rank} className={(rank%2)?classes.container:classes.container2}>
            <td className={classes.td}>{rank}</td>
            <td><img src={image} className={classes.imgSize}/></td>
            <td className={classes.name} onClick={redirectToProfile}>{user[BODY.DISPLAYNAME]}</td>
            <td>{user[BODY.USERLEVEL]}</td>
            <td>{user[BODY.SCORE]}</td>
        </tr>
    )
}

export default LeaderboardCard