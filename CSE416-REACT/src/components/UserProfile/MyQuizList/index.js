import { useStyles } from './style'
import QuizCard from '../../QuizCard'
import { useState, useEffect } from 'react'
import quizApis from '../../../api/quiz-api'
import {Button} from '@mui/material'
const MyQuizList = (props) => {
    const classes = useStyles()
    const [quizzes, setQuizzes] = useState([])


    useEffect(()=>{
        const loadUserQuiz = async ()=>{
            const response = await quizApis.getUserQuiz(props.userId)
            setQuizzes(response.data)
        }

        loadUserQuiz()
    },[props.userId])
    return(
        <div className={classes.quizListContainer}>
            MyQuizList <Button onClick={()=>{props.setTag(1)}}>SEE MORE?</Button>
            <div className={classes.displayBoardContainer}>
                {quizzes.map((quiz, i) => {
                            return <QuizCard key={i} quiz={quiz} redirect={true}/>
                })}
            </div>
        </div>
    )
}

export default MyQuizList