import { useStyles } from './style'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import SectionWrapper from './SectionWrapper'
import quizApis from '../../api/quiz-api'
import AuthContext from '../../context/auth-context'
import HEADER from '../../constant/header'
import BODY from '../../constant/body'
const QuizEditing = () => {
    const classes = useStyles()
    const [tag, setTag] = useState(0)
    const [quiz, setQuiz] = useState()
    const { quizId } = useParams()
    const {auth} = useContext(AuthContext)
    const changeTag = (newTag) => {
        setTag(newTag)
    }
    useEffect(()=>{
        const loadQuiz = async () => {
            if(auth.user != null){
                const token = await auth.user.getIdToken()
                let headers = {
                    [HEADER.TOKEN] : token
                }
                let response = await quizApis.getSingleUserQuizAuthenticated(quizId, headers)
                if(response.data.length>0){
                    setQuiz(response.data[0])
                }
            }
        }
        loadQuiz()
    },[quizId, auth.user])

    if(quiz===undefined || quiz==null){
        return <div>loading</div>
    }
    return(
        <div className={classes.container}>
            <div className={classes.subsection}>
                {quiz[BODY.QUIZNAME]}
            </div>

            <div className={`${classes.subsection2} ${classes.flex}`}>
                <div onClick={()=>{changeTag(0)}} className={`${classes.selection} ${tag==0 && classes.selectColor}`}>Quiz Information</div>
                <div onClick={()=>{changeTag(1)}} className={`${classes.marginLeft} ${classes.selection} ${tag==1 && classes.selectColor}`}>Quiz Question</div>
            </div>
            <div className={classes.container}>
                <SectionWrapper
                    tag={tag}
                    quiz={quiz}/>
            </div>
        </div>
    )

}

export default QuizEditing