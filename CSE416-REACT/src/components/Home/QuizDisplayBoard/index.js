import { useStyles } from "./style"
import QuizCard from "../../QuizCard"
import { useState, useEffect } from 'react'
import quizApis from "../../../api/quiz-api"
import QuizRankCard from "../../QuizRankCard"
import { useHistory } from "react-router-dom"
import BODY_CONSTANT from "../../../constant/body"
import { QUIZ_CATEGORY_NAME } from '../../../constant/quiz-category'
const QuizDisplayBoard = (props) => {
    //TEMP DATA
    const classes = useStyles()
    const history = useHistory()
    const [quizzes, setQuizzes] = useState([])
    const [rankQuiz, setRankQuiz] = useState([])


    useEffect(() => {
        const loadCategoryQuiz = async () => {
            if (props.category !== undefined) {
                const category = props.category
                const response = await quizApis.getCategoryQuiz(category)
                setQuizzes(response.data)
                const response2 = await quizApis.getTopQuizByCategory(category)
                setRankQuiz(response2.data)
            }
        }


        loadCategoryQuiz()
    }, [props.category])

    const moveToStartingPage =(i)=>{
        history.push(`/quizDescription/${rankQuiz[i][BODY_CONSTANT.QUIZID]}`)
    }

    const roateCategoryList = async ()=>{
        if (props.category !== undefined) {
            const category = props.category
            const response = await quizApis.getCategoryQuiz(category)
            setQuizzes(response.data)
        }
    }

    const redirectToCategoryPage = ()=>{
        history.push(`/category/${props.category}`)
    }

    if (quizzes==null || quizzes===undefined ||  quizzes.length === 0) {
        return <div className={classes.noQuizContainer}>
                <div className={classes.headerContainer}>
                    <div className={classes.title}>
                        {QUIZ_CATEGORY_NAME[props.category]}
                    </div>
                </div>
                <div>No Quizzes In this Category</div>
        </div>
    }
    else {
        return (
            <div className={classes.displayBoardContainer}>
                <div className={classes.headerContainer}>
                    <div className={classes.title}>
                        {QUIZ_CATEGORY_NAME[props.category]}
                    </div>
                    <div className={`${classes.btn} ${classes.btnDesign}`} onClick={roateCategoryList}>
                        <div className={classes.btnText}>
                            Rotate
                        </div>
                    </div>
                    <div className={`${classes.btnDesign}`} onClick={redirectToCategoryPage}>
                        <div className={classes.btnText}>
                            More
                        </div>
                    </div>
                </div>
                <div className={classes.quizContainer}>
                    {quizzes.map((quiz, i) => {
                        return <QuizCard key={i} quiz={quiz} redirect={true}/>
                    })}
                </div>

                <div className={classes.rankContainer}>
                    <div className={classes.RankingsText}>Rankings</div>
                    <div>
                        {rankQuiz.map((quiz, i) =>
                            <div key={i} className={classes.card} onClick={()=>moveToStartingPage(i)}>
                                <QuizRankCard key={i} quiz={quiz} rank={i+1}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default QuizDisplayBoard