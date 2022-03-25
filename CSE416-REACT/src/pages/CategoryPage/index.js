import { useStyles } from './style'
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import quizApis from '../../api/quiz-api'
import { QUIZ_CATEGORY_NAME } from '../../constant/quiz-category'
import { Button } from '@mui/material'
import SideBar from '../../components/Home/SideBar'
import BODY from '../../constant/body'
import QuizListCard from '../../components/QuizListCard'
import AuthContext from '../../context/auth-context'
const CategoryPage = () => {
    const {categoryId} = useParams()
    const classes = useStyles()
    const [quizzes, setQuizzes] = useState([])
    const [end, setEnd] = useState(false)
    const history = useHistory()
    const {auth} = useContext(AuthContext)
    const [login, setLogin] = useState(true)
    useEffect(()=>{
        const loadCategoryQuiz = async ()=>{
            const response = await quizApis.getCategoryQuiz(categoryId)
            updateQuizzes(response)
        }
        loadCategoryQuiz()
        setLogin(auth.loggedIn)
    },[categoryId, auth.loggedIn])

    const updateQuizzes = (response) => {
        let sub_arr = response.data
        if(response.data.length>0){
            if(response.data.length !== 10){
                setEnd(true)
            }
            let new_quizzes = [...quizzes]
            for(var i = 0; i < sub_arr.length; i++){
                new_quizzes.push(sub_arr[i])
            }
            setQuizzes(new_quizzes)
        }
        else{
            setEnd(true)
        }
    }

    const getMore = async ()=>{
        // event.preventDefault()
        if(quizzes.length>0){
            let last_quiz_id = quizzes[quizzes.length-1][BODY.QUIZID]
            let payload = {
                [BODY.QUIZID]: last_quiz_id,
                [BODY.QUIZCATEGORY]: categoryId
            }
            const response = await quizApis.getMoreQuizByCategoryById(payload)
            updateQuizzes(response)
        }        
    }
    
    const redirectToGlobalBoard = ()=>{
        history.push(`/global/${categoryId}`)
    }

    return(
        <div> 
            {login && <div>
                <SideBar className={classes.sidebar}/>
            </div>
            }
            <div className={classes.pageContainer}>
                <div>
                    <div className={classes.title}>Category: {QUIZ_CATEGORY_NAME[categoryId]}</div>
                    {(categoryId!=0) && <div className={classes.toLeft}><Button onClick={redirectToGlobalBoard}>Check Global Ranking</Button></div>}
                    <div>
                        {quizzes.map((quiz, i) => {
                                    return <QuizListCard key={i} quiz={quiz}/>
                        })}
                    </div>
                    {
                        end?<div className={classes.endLine}>No More</div>
                        :<Button onClick={getMore}>More</Button>
                    }
                </div>
            </div>
        </div>
    )
}


export default CategoryPage