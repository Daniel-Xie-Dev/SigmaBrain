import React from 'react';
import { userStyles } from "./style";
import { useState, useRef, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import BODY from '../../constant/body';
import quizApis from '../../api/quiz-api';
import AuthContext from '../../context/auth-context';
import HEADER from '../../constant/header';
import { QUIZ_CATEGORY_DICT } from '../../constant/quiz-category'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import QuestionCreationModal from '../QuestionCreationModal';
const QuizCreation = () => {
    const classes = userStyles()
    const imgRef = useRef()
    const [introduction, setIntroduction] = useState()
    const [timeLimit, setTimeLimit] = useState(5)
    const [image, setImage] = useState()
    const [imageAsFile, setImageAsFile] = useState()
    const [name, setName] = useState()
    const { auth } = useContext(AuthContext)
    const history = useHistory()
    const [category, setCategory] = useState()
    const [categoryList, setCategoryList] = useState([])
    const [questions, setQuestions] = useState([])
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(-1)
    const [errorMsg, setErrorMsg] = useState({});
    // const [categoryText, setCategoryText] = useState("")

    const handleOpen = () => {
        let error = {};
        if(questions.length >= 50){
            error.QuizAddQuestionError = "Quiz can't have more than 50 questions!";
            setErrorMsg(error);
            return
        }
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setEdit(-1)
    }

    const onAutoChange = (event, value) => {
        if (value != null) {
            setCategory(value['value'])
        }
    }

    const clickUpload = () => {
        imgRef.current.click()
    }

    const onImageUpload = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]))
        setImageAsFile(event.target.files[0])
    }

    const onChangeIntroduction = (event) => {
        setIntroduction(event.target.value)
    }

    const onChangeTimeLimit = (event) => {
        let regexp = /^[0-9\b]+$/
        if (event.target.value === '' || regexp.test(event.target.value))
            setTimeLimit(event.target.value)
    }

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const addQuestion = (question) => {
        let newQuestions = [...questions]
        newQuestions.push(question)
        setQuestions(newQuestions)
    }

    const updateQuestion = (question, index) => {
        let newQuestions = [...questions]
        newQuestions[index] = question
        setQuestions(newQuestions)
    }

    const removeQuestion = (i) => {
        let newQuestions = [...questions]
        newQuestions.splice(i, 1)
        setQuestions(newQuestions)
    }
    const onSave = async () => {
        const quiz = {
            [BODY.QUIZNAME]: name,
            [BODY.QUIZCATEGORY]: category,
            [BODY.QUIZDESCRIPTION]: introduction,
            [BODY.ISPUBLISHED]: 0,
            [BODY.QUESTIONS]: questions,
            [BODY.TIMELIMIT]: timeLimit
        }
        let error = {};

        if (quiz[BODY.QUIZCATEGORY] === undefined) {
            quiz[BODY.QUIZCATEGORY] = 0;
        }

        if (quiz[BODY.QUIZNAME] === undefined) {
            error.QuizTitleError = "Please add a quiz title"
        } else if (quiz[BODY.QUIZNAME].length === 0) {
            error.QuizTitleError = "Quiz title cannot be empty"
        } else if (quiz[BODY.QUIZNAME].length > 50) {
            error.QuizTitleError = "Quiz title cannot be more than 50 characters"
        }

        if (timeLimit < 5.0 || timeLimit > 60.0) {
            error.TimeLimitError = "Time of quiz must be anywhere in between 5 minutes to 60 minutes"
        }

        if (quiz[BODY.QUIZDESCRIPTION] === undefined) {
            error.QuizDescriptionError = "Please add a quiz description"
        } else if (quiz[BODY.QUIZDESCRIPTION].length === 0) {
            error.QuizDescriptionError = "Quiz description cannot be empty"
        } else if (quiz[BODY.QUIZDESCRIPTION].length > 200) {
            error.QuizDescriptionError = "Quiz description cannot be more than 200 characters"
        }
        if (quiz[BODY.QUESTIONS].length === 0) {
            error.QuizQuestionError = "A quiz must have atleast one question";
        }
        setErrorMsg(error);
        if (Object.keys(error).length !== 0) {
            return
        }

        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN]: token
        }

        let response = await quizApis.createQuizWithQuestions(quiz, headers)
        if (imageAsFile !== undefined && imageAsFile != null) {
            let quizId = response.data.insertId
            const data = new FormData()
            data.append(BODY.QUIZID, quizId)
            data.append(BODY.QUIZTHUMBNAIL, imageAsFile)
            await quizApis.setQuizThumbnail(quizId, data, headers)
        }
        history.push(`/quizManagement`);
    }

    // const createQuiz = ()=>{
    //     console.log("creating", questions)
    // }
    const editQuestion = (index) => {
        setEdit(index)
        setOpen(true)
    }

    const numbersOnly = () => {

    }

    useEffect(() => {
        let categorylist = []
        for (var key in QUIZ_CATEGORY_DICT) {
            categorylist.push({ label: key, value: QUIZ_CATEGORY_DICT[key] })
        }
        setCategoryList(categorylist)
    }, [])

    return (
        <div className={classes.creationCardContainer}>
            <input type="file" name="image" id="image" alt="quiz thumbnail" ref={imgRef} onChange={onImageUpload} className={classes.imgTag} />
            <div className={classes.title}>
                <div className={classes.titleText}>Quiz Creator</div>
                <div className={classes.btn}>
                    <div className={classes.btnText}>
                        Save
                    </div>
                </div>
            </div>

            <div className={classes.divider}></div>

            <div className={classes.quizName}>
                <div className={classes.subTitle}>Quiz Name</div>
                <input className={classes.quizNameField} onKeyUp={onChangeName} />
                {errorMsg?.QuizTitleError && (
                    <p className={classes.errorMsg}>{errorMsg.QuizTitleError}</p>
                )}
            </div>

            <div className={classes.divider}></div>

            <div className={classes.cover}>
                <div className={classes.subTitle}>Cover</div>
                {
                    image ?
                        <div>
                            <div className={`${classes.btn} ${classes.toCenter}`} onClick={clickUpload}>
                                <div className={classes.btnText}>change</div>
                            </div>
                            <div className={classes.imgContainer}>
                                <img className={classes.imgSize} src={image} alt="quiz thumbnail" />
                            </div>
                        </div>
                        :
                        <div className={classes.plusContainer} onClick={clickUpload}>
                            <div className={classes.plus}>+</div>
                        </div>
                }
            </div>

            <div className={classes.divider}></div>

            <div className={classes.introduction}>
                <div className={classes.subTitle}>Introduction</div>
                <textarea onKeyUp={onChangeIntroduction} className={classes.introductionBox} />
                {errorMsg?.QuizDescriptionError && (
                    <p className={classes.errorMsg}>{errorMsg.QuizDescriptionError}</p>
                )}
            </div>

            <div className={classes.divider}></div>

            <div className={classes.timeLimit}>
                <div className={classes.subTitle}>Time Limit</div>
                <div className={classes.flexBox}>
                    <input
                        onChange={onChangeTimeLimit}
                        className={classes.timeBox}
                        type="number"
                        value={timeLimit}
                    />
                    <div className={classes.unit}>min</div>
                </div>
                {errorMsg?.TimeLimitError && (
                    <p className={classes.errorMsg}>{errorMsg.TimeLimitError}</p>
                )}
            </div>

            <div className={classes.divider}></div>

            <div className={classes.quizCategory}>
                <div className={classes.subTitle}>Quiz Category</div>
                <div className={classes.autoContainer}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categoryList}
                        sx={{ width: 300 }}
                        onChange={onAutoChange}
                        renderInput={(params) => <TextField {...params} label="Catergory" />}
                    />
                </div>
            </div>

            <div className={classes.divider}></div>

            <div className={`${classes.questionContainer}`}>
                <div className={classes.subTitle}>Questions</div>
                <div className={`${classes.btn} ${classes.toCenter}`} onClick={handleOpen}>
                    <div className={classes.btnText}>Add</div>
                </div>
                {errorMsg?.QuizAddQuestionError && (
                    <p className={classes.errorMsg}>{errorMsg.QuizAddQuestionError}</p>
                )}
                <div>
                    {questions.length !== 0 &&

                        <div className={classes.checkboxPaddingHeader}>
                            <div className={classes.alignTextCenter}>Q#</div>
                            <div className={classes.alignTextCenter}>Question</div>
                            <div className={classes.alignTextCenter}>Edit</div>
                            <div className={classes.alignTextCenter}>Delete</div>
                        </div>

                    }
                    {questions.map((question, i) =>
                        <div key={i} className={classes.checkboxPadding}>
                            <div className={`${classes.questionMargin} ${classes.questionText}`}>#{i + 1}</div>
                            <div className={`${classes.alignTextLeft} ${classes.questionMargin} ${classes.questionText}`}>{question['question']}</div>
                            <div onClick={() => { editQuestion(i) }} className={`${classes.alignTextCenter} ${classes.editBtn}`}>edit</div>
                            <div className={`${classes.alignTextCenter} ${classes.delete}`} onClick={() => { removeQuestion(i) }}>&#10005;</div>
                        </div>)
                    }
                </div>
                {errorMsg?.QuizQuestionError && (
                    <p className={classes.errorMsg}>{errorMsg.QuizQuestionError}</p>
                )}
            </div>
            <div className={classes.divider}></div>
            <div>
                <div className={`${classes.toRight} ${classes.btn}`} onClick={onSave}>
                    <div className={classes.btnText}>Save</div>
                </div>
            </div>
            <QuestionCreationModal
                edit={edit}
                setEdit={setEdit}
                questions={questions}
                addQuestion={addQuestion}
                updateQuestion={updateQuestion}
                handleClose={handleClose}
                handleOpen={handleOpen}
                open={open} />
        </div>
    )
}

export default QuizCreation;
