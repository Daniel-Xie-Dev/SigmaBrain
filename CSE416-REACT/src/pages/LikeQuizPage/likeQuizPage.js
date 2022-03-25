import { useStyles } from './style'
import { SideBar } from '../../components/Home'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth-context';
import quizApis from '../../api/quiz-api';
import HEADER from '../../constant/header';
import QuizListCard from '../../components/QuizListCard';
import { Button } from '@mui/material';
import {useHistory} from 'react-router-dom'
const LikeQuizPage = ()=>{
    const classes = useStyles()
    const [quizzes, setQuizzes] = useState([])
    const [end, setEnd] = useState(false)
    const {auth} = useContext(AuthContext)
    const [login, setLogin] = useState(true)
    const history = useHistory()
    useEffect(()=>{
        const loadLikedQuiz = async ()=>{
            if(auth.user != null){
                const token = await auth.user.getIdToken()
                let headers = {
                    [HEADER.TOKEN] : token
                }
                let response = await quizApis.getLikedQuiz(headers)
                updateLikedQuizzes(response)
            }
        }
        setLogin(auth.loggedIn)
        loadLikedQuiz()
    }, [auth.user])

    const updateLikedQuizzes = (response)=>{
        let sub_arr = response.data
        if(response.data.length>0){
            if(response.data.length !== 10){
                setEnd(true)
            }
            let newarr = [...quizzes]
            for(var i = 0; i < sub_arr.length; i++){
                newarr.push(sub_arr[i])
            }
            setQuizzes(newarr)
        }
        else{
            setEnd(true)
        }
    }

    const loadMore = async ()=>{
        if(auth.user != null){
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN] : token
            }
            let row = quizzes.length
            let response = await quizApis.getLikedQuiz(headers, row)
            updateLikedQuizzes(response)
        }
    }


    if(!login){
        history.push('/')
    }

    return(
        <div> 
        <div>
            <SideBar className={classes.sidebar}/>
        </div>
        <div className={classes.pageContainer}>
            <div>
                <div className={classes.title}>Liked Quizzes</div>
                <div>
                    {quizzes.map((quiz, i) => {
                                return <QuizListCard key={i} quiz={quiz}/>
                    })}
                </div>
                {
                    end?<div className={classes.endLine}>No More</div>
                    :<Button onClick={loadMore}>More</Button>
                }
            </div>
        </div>
    </div>
    )

}
export default LikeQuizPage