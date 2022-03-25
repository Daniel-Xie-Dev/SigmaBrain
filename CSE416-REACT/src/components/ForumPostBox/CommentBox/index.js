import {useEffect, useState} from 'react'
import BODY from "../../../constant/body"
import { useStyles } from './style'
import default_profile_img from '../../../images/Default_profile.png'
import userApis from '../../../api/user-api'
const PostCommentBox = ({comment})=>{
    const classes = useStyles()
    const [image, setImage] = useState("")
    useEffect(()=>{
        const loadProfileImage = async()=>{
            let response = await userApis.getProfileImage(comment[BODY.USERID])
            if(response.data==null || response.data==""){
                setImage(default_profile_img)
                return
            }
            setImage(response.data)
        }
        loadProfileImage()
    },
    [])

    return(
        <div className={classes.container}>
            <div>
            <img className={classes.imgSize} src={image} alt=""/>
            </div>
            <div className={classes.commentTittleContainer}>
            <div className={classes.userbox}>
                <div className={classes.namebox}>
                    {comment[BODY.DISPLAYNAME]}
                </div>
                <div className={classes.levelbox}>
                    Level {comment[BODY.USERLEVEL]}
                </div>
            </div>
            <div className={classes.commentContainer}>
                {comment[BODY.POSTCOMMENT]}
            </div>
            </div>
        </div>
    )
}

export default PostCommentBox