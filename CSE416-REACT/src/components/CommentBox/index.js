import { useStyles } from './style'
import BODY from '../../constant/body'
import userApis from '../../api/user-api'
import { useEffect, useState } from "react"
import default_profile from '../../images/Default_profile.png'
const CommentBox = ({comment})=>{
    const classes = useStyles()
    const [name, setName] = useState()
    const [image, setImage] = useState("")
    useEffect(()=>{
        const loadName = async ()=> {
            let response = await userApis.getUserDisplayName(comment[BODY.USERID])
            setName(response.data[0][BODY.DISPLAYNAME])
        }

        const loadProfile = async() => {
            try{
                let response = await userApis.getProfileImage(comment[BODY.USERID])
                setImage(response.data)
            }catch{
                setImage(default_profile)
            }
        }

        loadName()
        loadProfile()
    },[comment])
    
    return(
<div className={classes.commentBox}>
  <div className={classes.circle}>
      <img className={classes.imgSize} src={image}/>
  </div>
  <div >
    <div className={classes.name}>{name}</div>
    <div className={classes.comment}>
        {comment[BODY.QUIZCOMMENT]}
    </div>
  </div>
</div>
    )
}

export default CommentBox