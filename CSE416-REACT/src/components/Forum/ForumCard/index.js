import React from 'react';
import { useStyles } from './style';
import BODY from '../../../constant/body';
import profile_image from '../../../images/Default_profile.png';
import {useEffect, useState} from 'react'
import userApi from '../../../api/user-api'
const ForumCard = ({post, isTop10}) => {
    const classes = useStyles()
    const [image, setImage] = useState("")
    const [user, setUser] = useState()
    //const [isTop10, setIsTop10] = useState(false)
    function CreateDate(date){
        const array=date.split("T");
        return array[0];
    }

    useEffect(()=>{
        const loadProfile = async()=>{
            try{
                let response = await userApi.getProfileImage(post[BODY.USERID])
                if(response.data==null || response.data===""){
                    setImage(profile_image)
                    return
                }
                setImage(response.data)
            }catch{
                setImage(profile_image)
            }
        }

        const loadUserName = async()=>{
            // let response = await userApi.getUserDisplayName(post[BODY.USERID])
            let response = await userApi.getUserInfo(post[BODY.USERID])
            setUser(response.data[0])
        }
        loadProfile()
        loadUserName()
    },[post])

    return(
        <div className={classes.container}>
        <div className={classes.Block_Background}>
            <div className={classes.infoGrid}>
                <div className={classes.imageStyle}>
                    <img className={classes.imgSize} src={image}/>
                </div>
                <div>
                    {user && <div className={classes.UserName}>
                        {user[BODY.DISPLAYNAME]} . Level {user[BODY.USERLEVEL]}
                    </div>
                    }
                    {isTop10(post) && 
                        <div className={classes.top10Container}>
                            <div className={classes.top10}>Top 10</div>
                        </div>
                    }
                    <div className={classes.DateText}>
                        {CreateDate(post[BODY.CREATIONTIME])}
                    </div>
                </div>

            </div>
            <div className={classes.titleText}>
            {post[BODY.POSTTITLE]}
            </div>
            <div className={classes.white_box}>
                {post[BODY.POSTDESCRIPTION]}
            </div>
            
        </div>
        </div>
    )
}
export default ForumCard
