import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography  from '@mui/material/Typography'
import BODY from '../../constant/body'
import { useEffect, useState } from 'react'
import { useStyles } from './style'
import quizApis from '../../api/quiz-api'
import HEADER from '../../constant/header'

const QuestionEditModal = ({open, handleClose, anschoices, question, quizId, auth, updateQuestionName, questionIndex})=>{
    const [numOfChoices, setNumOfChoices] = useState(0)
    const [choices, setChoices] = useState([])
    const [correct, setCorrect] = useState([])
    const [questionName, setQuestionName] = useState("")
    const [errorMsg, setErrorMsg] = useState({});
    const classes = useStyles()

    useEffect(()=>{
        if(question !== undefined && question != null){
            setQuestionName(question[BODY.QUESTION])
            let newCorrect = []
            let newChoices = []
            for(var i = 0; i < anschoices.length; i++){
                newCorrect.push(anschoices[i][BODY.ISRIGHTCHOICE])
                newChoices.push(anschoices[i][BODY.CHOICE])
            }
            setChoices(newChoices)
            setCorrect(newCorrect)
            setNumOfChoices(anschoices.length);
        }

    },[anschoices, question])
    const clearModal = ()=>{
        setNumOfChoices(0)
        setChoices([])
        setCorrect([])
        setQuestionName("")
        setErrorMsg({});
    }

    const closeModal = ()=>{
        clearModal()
        handleClose()
    }

    const addChoice = ()=>{
        if (numOfChoices < 6){
            setNumOfChoices(numOfChoices+1)
            setChoices([...choices, ""])
            setCorrect([...correct, false])
        }else {
            let error = {};
            error.NumberOfChoiceError = "Can't create more than 6 questions";
            setErrorMsg(error);
        }
    }

    const editChoice = (event, i) => {
        let newChoices = [...choices]
        newChoices[i] = event.target.value
        setChoices(newChoices)
    }

    const onChangeQuestionName = (event)=>{
        setQuestionName(event.target.value)
    }

    const onUpdate = async ()=>{
        let updateChoices= []
        for(var i = 0; i <  choices.length; i++){
            updateChoices.push({
                [BODY.ISRIGHTCHOICE]: correct[i],
                [BODY.CHOICE]: choices[i]
            })
        }
        let payload = {
            [BODY.CHOICES]: updateChoices,
            [BODY.QUIZID]: quizId,
            [BODY.QUESTIONID]: question[BODY.QUESTIONID],
            [BODY.QUESTION]: questionName
        }
        
        let error = {};
        let flag = false;
        if(payload[BODY.CHOICES].length === 0){
            error.AnswerError = "Question must have atleast one answer choice";
            flag = true;
        }
        if(payload[BODY.CHOICES].length !== 0){
            let temp = false;
            for (var j = 0; j < payload[BODY.CHOICES].length; j++){
                if(payload[BODY.CHOICES][j][BODY.ISRIGHTCHOICE]){
                    temp = true;
                    break;
                }
            }
            flag = temp ? false : true;
            error.CorrectError = "Answer choices must have atleast one correct choice"
        }
        setErrorMsg(error);
        if (flag){
            return
        }

        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN] : token
        }
        quizApis.updateQuestionChoice(payload, headers)
        updateQuestionName(questionIndex, questionName)
        clearModal()
        handleClose()
    }

    const onDelete = (i)=>{
        let newChoices = [...choices]
        newChoices.splice(i, 1)
        correct.splice(i, 1)
        setChoices(newChoices)
        setNumOfChoices(numOfChoices - 1);
    }

    const onChecked = (event, i)=>{
        let newCorrect = new Array(correct.length).fill(false)
        newCorrect[i] = event.currentTarget.checked
        setCorrect(newCorrect)
    }

    return(
        <div>
            <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className={classes.modal}>
                    <div className={classes.titleText} id="modal-modal-title" variant="h6" component="h3">
                        Edit Question
                    </div>
                    <Typography 
                    id="modal-modal-description" 
                    sx={{ mt: 2 }}
                    component={'span'} 
                    variant={'body2'}>
                        <div>
                            <div className={classes.subSection}>
                                <div className={classes.subTitle}>Question Name</div>
                                <input defaultValue={questionName} onKeyUp={onChangeQuestionName} className={classes.questionNameField}/>
                            </div>

                            <div className={classes.divider}></div>

                            <div className={classes.subSection}>
                                <table className={classes.toCenter}>
                                    <thead>
                                        <tr>
                                            <th className={classes.tableSelector}>&nbsp;</th>
                                            <th className={classes.tableNumber}>Number</th>
                                            <th className={classes.tableChoices}>Choices</th>
                                            <th className={classes.tableDelete}>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            choices.map((x, i)=>{
                                                return <tr key={i}> 
                                                    <td><input checked={correct[i]} type="checkbox" onChange={(event)=>{onChecked(event, i)}}/>&nbsp;</td>
                                                    <td>#{i+1}</td>
                                                    <td><input type="text" value={x} onChange={(event)=>{editChoice(event, i)}}/></td>
                                                    <td className={classes.delete} onClick={()=>{onDelete(i)}}>&#10005;</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>

                                <div className={classes.divider}></div>

                                <div className={classes.buttonstyle} onClick={addChoice}>Add Choice</div>
                                {errorMsg?.AnswerError && (
                                    <p className={classes.errorMsg}>{errorMsg.AnswerError}</p>
                                )}
                                {errorMsg?.CorrectError && (
                                    <p className={classes.errorMsg}>{errorMsg.CorrectError}</p>
                                )}
                                {errorMsg?.NumberOfChoiceError && (
                                    <p className={classes.errorMsg}>{errorMsg.NumberOfChoiceError}</p>
                                )}
                            </div>
                            <div className={classes.buttonPosition}>
                                <button className={classes.buttonstyle} onClick={closeModal}>
                                    Close
                                </button>
                                <button className={classes.buttonstyle} onClick={onUpdate}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default QuestionEditModal