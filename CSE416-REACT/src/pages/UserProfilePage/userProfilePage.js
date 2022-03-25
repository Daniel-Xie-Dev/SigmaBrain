import { useState,  useEffect } from 'react'
import { useStyles } from "./style";
import { useParams } from 'react-router-dom'
import UserBanner from "../../components/UserBanner";
import ProfileBar from "../../components/UserProfile/ProfileBar";
import ProfileSectionWrapper from '../../components/UserProfile/ProfileSelection';

const UserProfilePage = () => {
    const classes = useStyles()
    const { userId } = useParams()
    const [self, setSelf] = useState(false)
    const [tag, setTag] = useState(0)
    useEffect(()=>{
        if(localStorage.getItem('uid') === userId){
            setSelf(true)
        }
        else{
            setSelf(false)
        }

        if(localStorage.getItem('profileTag') != null){
            setTag(parseInt(localStorage.getItem('profileTag')))
        }
    }, [userId])
    return(
        <div>
            <div className={classes.pageContainer}>
                <UserBanner userId={userId} self={self}/>
                <ProfileBar userId={userId} self={self} setTag={setTag} tag={tag}/>
                <ProfileSectionWrapper
                tag={tag}
                setTag={setTag}
                userId={userId}
                self={self}
                />
            </div>
        </div>
    )
}

export default UserProfilePage