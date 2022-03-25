import { useStyles } from './style'
import { Button } from '@mui/material'
import { useState,useContext } from 'react'
import forumnApi from '../../../api/forumn-api'
import AuthContext from '../../../context/auth-context'
import { useParams } from 'react-router-dom'
import BODY from '../../../constant/body'
import HEADER from '../../../constant/header'
const PostCreationBox = ({loadPosts})=>{
    const [title, setTitle] = useState("")
    const [post, setPost] = useState("")
    const classes = useStyles()
    const {auth} = useContext(AuthContext)
    const { userId } = useParams()
    const onChangeTitle = (event)=>{
        setTitle(event.target.value)
    }

    const onChangePost = (event)=>{
        setPost(event.target.value)
    }

    const createPost = async ()=>{
        if(title===""){
            console.log("title can'be empty")
            return
        }
        const token = await auth.user.getIdToken()

        let payload = {
            [BODY.OWNERID]: userId,
            [BODY.POSTTITLE]: title,
            [BODY.POSTDESCRIPTION]: post,
        }

        let headers = {
            [HEADER.TOKEN]: token
        }

        await forumnApi.createForumnPost(payload, headers)
        setPost("")
        setTitle("")
        loadPosts()
    }

    return(
        <div className={ classes.gray_box }>
            <div className={classes.titleText}>Post Creation Box</div>
            <div><input value={title} onChange={onChangeTitle} className={ classes.inputTitleBox }/></div>
            <div><textarea value={post} onChange={onChangePost} className={ classes.postBox }/></div>
            <div><Button onClick={createPost}>Create</Button></div>
        </div>
    )
}

export default PostCreationBox