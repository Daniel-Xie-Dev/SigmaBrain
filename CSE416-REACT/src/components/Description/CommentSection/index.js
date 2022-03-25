import { useStyles } from './style'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '../../../context/auth-context'
import Button from '@mui/material/Button'
import HEADER from '../../../constant/header'
import quizApis from '../../../api/quiz-api'
import BODY from '../../../constant/body'
import CommentBox from '../../CommentBox'
import NoUserModal from '../../NoUserModal'
import MYSQL_CONSTANT from '../../../constant/mysql'
const CommentSection = (props)=>{
    const {auth} = useContext(AuthContext)
    const classes = useStyles()
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [end, setEnd] = useState(false)
    const onChangeComment =(event)=>{
        setComment(event.target.value)
    }

    let loadComments = async ()=>{
        let response = await quizApis.getQuizComments(props.quizId)
        updateComments(response)
    }

    const updateComments = (response)=>{
        let sub_arr = response.data
        if(response.data.length>0){
            if(response.data.length !== 10){
                setEnd(true)
            }
            let newarr = [...comments]
            for(var i = 0; i < sub_arr.length; i++){
                newarr.push(sub_arr[i])
            }
            setComments(newarr)
        }
        else{
            setEnd(true)
        }
    }

    let loadMore = async ()=>{
        let row = comments.length
        let response = await quizApis.getQuizComments(props.quizId,row)
        updateComments(response)
    }

    const submitComment = async ()=>{
        if(!auth.loggedIn){
            setShowModal(true);
            return
        }
        if(comment!==""){
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN] : token
            }
            let payload = {
                [BODY.QUIZCOMMENT]: comment,
                [BODY.QUIZID]: props.quizId
            }
            let response = await quizApis.postQuizComment(payload, headers)
            if(comments.length <= 10){
                let newComment = await quizApis.getQuizCommentByCommentId(response.data[MYSQL_CONSTANT.INSERTID])
                updateComments(newComment)
            }
            else{
                setEnd(false)
            }
            setComment("")
            
        }
    }

    useEffect(()=>{
        let loadComments = async ()=>{
            let response = await quizApis.getQuizComments(props.quizId)
            updateComments(response)
        }
        loadComments()
    },[props.quizId])

    return(
        <div className={classes.container}>
        <div>
            <NoUserModal show={showModal} continue={true} handleClose={() => setShowModal(false)}></NoUserModal>
        </div>
            <div className={classes.commentInputContainer}>
                <div className={classes.commentTitle}>Comment</div>
                <div>
                    <textarea onChange={onChangeComment} value={comment} className={classes.commentTextBox}/>
                </div>
                <div className={classes.commentBtn}>
                    <Button onClick={submitComment}>Comment</Button>
                </div>
            </div>
            
            <div className={classes.line}/>

            <div className={classes.userComments}>
                {comments.map((c, i)=>{
                    return <CommentBox comment={c}/>
                })}
                {
                    end?<div>That's the end</div>
                    :<Button onClick={loadMore}>More</Button>
                }
            </div>
        </div>
    )
}

export default CommentSection