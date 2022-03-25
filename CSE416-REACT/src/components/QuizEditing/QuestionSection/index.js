import { useState, useEffect, useContext } from 'react'
import BODY from '../../../constant/body'
import quizApis from '../../../api/quiz-api'
import AuthContext from '../../../context/auth-context'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import QuestionEditModal from '../../QuestionEditModal'
import QuestionCreationModal from '../../QuestionCreationModal';
import HEADER from '../../../constant/header'
const QuestionSection = ({quiz})=>{
    const { auth } = useContext(AuthContext)
    const [questions, setQuestions] = useState([])
    const [open, setOpen] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [choices, setChoices] = useState([])
    const [question, setQuestion] = useState()
    const [questionIndex, setQuestionIndex] = useState(-1)
    const handleClose = () => {
        setOpen(false)
    }
    useEffect(()=>{
        const loadQuestions = async () => {
            let quizId = quiz[BODY.QUIZID]
            let response = await quizApis.getQuestions(quizId)
            setQuestions(response.data)
        }
        loadQuestions()
    }, [quiz])

    const loadQuestions = async () => {
        let quizId = quiz[BODY.QUIZID]
        let response = await quizApis.getQuestions(quizId)
        setQuestions(response.data)
    }

    const selectQuestion = async (i) => {
        let questionId = questions[i][BODY.QUESTIONID]
        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN] : token
        }
        let response = await quizApis.getChoicesInAQuestionWithAnswer(questionId, headers)
        setOpen(true)
        setChoices(response.data)
        setQuestion(questions[i])
        setQuestionIndex(i)
    }

    const updateQuestionName = (i, newName) => {
        let newQuestions = [...questions]
        newQuestions[i][BODY.QUESTION] = newName
        setQuestions(newQuestions)
    }

    const addQuestion = async (question)=>{
        if(auth.user!=null && auth.user!==undefined){
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN] : token
            }
            let payload = {
                [BODY.QUESTION]: question,
                [BODY.QUIZID]: quiz[BODY.QUIZID]
            }
            await quizApis.addNewQuestion(payload, headers)
            loadQuestions()
        }
    }    

    return(
        <div>
            <Button onClick={()=>{setOpenCreate(true)}}>Add New Question</Button>
            <div>
                {questions.map((q,i)=>{
                    return (<Card key={i}>
                    <CardContent>
                    <Typography variant="h5" component="div">
                        {i+1}.{q[BODY.QUESTION]}
                    </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={()=>{selectQuestion(i)}}>Edit Question</Button>
                    </CardActions>
                </Card>)
                })}
            </div>
            <QuestionEditModal
                open={open}
                handleClose={handleClose}
                anschoices={choices}
                question={question}
                quizId={quiz[BODY.QUIZID]}
                auth={auth}
                updateQuestionName={updateQuestionName}
                questionIndex={questionIndex}
                />

                <QuestionCreationModal
                    edit={-1}
                    open={openCreate}
                    addQuestion={addQuestion}
                    handleClose={()=>{setOpenCreate(false)}}
                    handleOpen={()=>{setOpenCreate(true)}}
                />
        </div>
    )
}

export default QuestionSection