import { useStyles } from "./style"
import QuizCard from "../../QuizCard"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import quizApis from "../../../api/quiz-api"
import {Button} from '@mui/material'
const UserQuizDisplay = (props) => {
    const classes = useStyles()
    const [quizzes, setQuizzes] = useState([])
    const { userId } = useParams()
    const [end, setEnd] = useState(false)
    useEffect(() => {
        const loadUserQuizzes = async () => {
            let response = await quizApis.getUserQuiz(userId)
            updateQuizList(response)
        }
        loadUserQuizzes()
    }, [userId])

    const updateQuizList = (response)=>{
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
        let row = quizzes.length
        let response = await quizApis.getUserQuiz(userId, row)
        updateQuizList(response)
    }

    return (
        <div>
            <div className={classes.displayBoardContainer}>
                <div className={classes.headerContainer}>
                    <div className={classes.title}>
                        All Quizzes
                    </div>
                </div>
                <div className={classes.quizContainer}>
                    {quizzes.map((quiz, i) => {
                        return <QuizCard key={i} quiz={quiz} redirect={true}/>
                    })}
                </div>
            </div>

            {
                end?<div>That's the end</div>
                :<Button onClick={loadMore}>More</Button>
            }
        </div>
    )
    
}

export default UserQuizDisplay