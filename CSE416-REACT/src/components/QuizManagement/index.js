import { useState, useEffect, useContext } from 'react'
import { useStyles } from './style'
import { useHistory } from 'react-router'
import Button from '@mui/material/Button'
import AuthContext from '../../context/auth-context'
import quizApis from '../../api/quiz-api'
import BODY from '../../constant/body'
import HEADER from '../../constant/header'
import UserBanner from '../UserBanner'
import ManagementCard from './ManagementCard'
import create_icon from '../../images/create.png'
import delete_icon from '../../images/delete.png'
import DeleteConfirmation from './DeleteQuizModal'
const QuizManagement = () => {
    const classes = useStyles()
    let history = useHistory()
    const [quizzes, setQuizzes] = useState([])
    const [selectedQuizzes, setSelectedQuizzes] = useState([])
    const [checkedState, setCheckedState] = useState([]);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [displaySingleConfirmationModal, setDisplaySingleConfirmationModal] = useState(false);
    const [i, setI] = useState(-99)
    const [end, setEnd] = useState(false)
    const { auth } = useContext(AuthContext)
    const [userId, setUserId] = useState("")

    useEffect(() => {
        const loadUserQuizzes = async () => {
            if (auth.user != null) {
                const token = await auth.user.getIdToken()
                let headers = {
                    [HEADER.TOKEN]: token
                }
                let response = await quizApis.getUserQuizAuthenticated(headers)
                updateQuizzes(response)
                setUserId(auth.user.uid)
            }
        }

        loadUserQuizzes()
    }, [auth.user])

    const updateQuizzes = (response) => {
        let sub_arr = response.data
        if (response.data.length > 0) {
            if (response.data.length !== 10) {
                setEnd(true)
            }
            let newarr = [...quizzes]
            let newcheckarr = [...checkedState]
            for (var i = 0; i < sub_arr.length; i++) {
                newarr.push(sub_arr[i])
                newcheckarr.push(false)
            }
            setQuizzes(newarr)
            setCheckedState(newcheckarr)
        } else {
            setEnd(true)
        }
    }

    const convertDate = (mysqlDate) => {
        return mysqlDate.slice(0, 10)
    }

    const loadMore = async () => {
        if (auth.user != null) {
            const token = await auth.user.getIdToken()
            let row = quizzes.length
            let headers = {
                [HEADER.TOKEN]: token
            }
            let response = await quizApis.getUserQuizAuthenticated(headers, row)
            updateQuizzes(response)
        }
    }

    const redirectQuizCreation = () => {
        history.push(`/quizCreation`)
    }

    const redirectQuizEditing = (quizId) => {
        history.push(`/quizEditing/${quizId}`)
    }

    const setSelected = (checked, i) => {
        //checked argument is true when the box is checked
        //index stores the index of the quiz
        let tempQuizzes = selectedQuizzes

        const updatedCheckedState = checkedState.map((item, index) =>
            index === i ? !item : item
        );

        setCheckedState(updatedCheckedState);

        if (checked) {
            //if the box is checked
            tempQuizzes.push(i)
        } else {
            //if the box is unchecked
            let index = tempQuizzes.indexOf(i);
            if (index > -1) {
                tempQuizzes.splice(index, 1);
            }
        }

        setSelectedQuizzes(tempQuizzes)

        //set the value of the checked array

    }

    const removeQuiz = async (i) => {
        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN]: token
        }
        await quizApis.deleteQuizWithQuestions(quizzes[i][BODY.QUIZID], headers)
        let newQuizzes = [...quizzes]
        if (newQuizzes.length > -1) {
            newQuizzes.splice(i, 1)
        }
        setQuizzes(newQuizzes)
        hideConfirmationModal()
    }

    // Hide the modal
    const hideConfirmationModal = () => {
        displayConfirmationModal ?
            setDisplayConfirmationModal(false) :
            setDisplaySingleConfirmationModal(false)
            ;
    };

    const handleDeleteMultipleQuizzes = async () => {
        //temp solution, should write api to delete multiple quizzes
        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN]: token
        }

        for (let quizzId in selectedQuizzes) {
            let i = selectedQuizzes[quizzId]
            await quizApis.deleteQuizWithQuestions(quizzes[i][BODY.QUIZID], headers)
        }


        //reloads the page
        const loadUserQuizzes = async () => {
            // let id =  auth.getCurrentUserUid()
            if (auth.user !== undefined && auth.user != null) {
                const token = await auth.user.getIdToken()
                let headers = {
                    [HEADER.TOKEN]: token
                }
                let response = await quizApis.getUserQuizAuthenticated(headers)
                setQuizzes(response.data)
                //set false for the checkboxes
                setCheckedState(new Array(response.data.length).fill(false))
            }
        }

        loadUserQuizzes()
        setSelectedQuizzes([])
        hideConfirmationModal()
        return () => {
            setQuizzes([])
        }

    }

    const publishQuiz = async (i) => {
        if (auth.user != null) {
            const quiz = quizzes[i]
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN]: token
            }
            let payload = {
                [BODY.QUIZID]: quiz[BODY.QUIZID],
                [BODY.ISPUBLISHED]: 1
            }
            await quizApis.publishQuiz(payload, headers)
            let newQuizzes = [...quizzes]
            newQuizzes[i][BODY.ISPUBLISHED] = 1
            setQuizzes(newQuizzes)
        }
    }

    const unpublishQuiz = async (i) => {
        if (auth.user != null) {
            const quiz = quizzes[i]
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN]: token
            }
            let payload = {
                [BODY.QUIZID]: quiz[BODY.QUIZID],
                [BODY.ISPUBLISHED]: 0
            }
            await quizApis.publishQuiz(payload, headers)
            let newQuizzes = [...quizzes]
            newQuizzes[i][BODY.ISPUBLISHED] = 0
            setQuizzes(newQuizzes)
        }
    }

    //Modals
    const handleDeleteMultiQuizzesModal = () => {
        if (selectedQuizzes.length > 0)
            setDisplayConfirmationModal(true)
        else {
            console.log("no quizzes are selected")
        }
    }

    const handleDeleteSingleQuizModal = (i) => {
        setI(i);
        setDisplaySingleConfirmationModal(true)
    }

    return (
        <div>
            <div className={classes.profileContainer}>
                <UserBanner userId={userId} />
            </div>
            <div className={classes.titleBar}>
                <div className={classes.title}>Quiz Management</div>
            </div>

            <div className={classes.consoleBarContainer}>
                <div></div>
                <div className={classes.buttonContainer}>
                    <div className={classes.iconBox} title="create" onClick={redirectQuizCreation}>
                        <img className={classes.image_setting} src={create_icon} />
                    </div>
                    <div className={classes.iconBox} title="remove" onClick={handleDeleteMultiQuizzesModal}>
                        <img className={classes.image_setting} src={delete_icon} />
                    </div>
                </div>

            </div>
            <div className={classes.consoleContainer}>
                <table id="quizzes">
                    <thead>
                        <tr>
                            <th className={classes.quizSelector}>&nbsp;</th>
                            <th className={classes.quizAll}>Quizzes</th>
                            <th className={classes.quizStatusHeading}>Status</th>
                            <th className={classes.quizDateHeading}>Date</th>
                            <th className={classes.quizView}>View Number</th>
                            <th className={classes.quizPublishBtn}>&nbsp;</th>
                            <th className={classes.cell}>Delete Quiz</th>
                        </tr>
                    </thead>

                    <tbody>
                        {quizzes.map((quiz, i) => {
                            return (
                                <tr key={i} className={classes.rowContainer}>
                                    <td><input onChange={(e) => setSelected(e.target.checked, i)} type="checkbox" checked={!!checkedState[i]} /></td>
                                    {/* <td onClick={() => { redirectQuizEditing(quiz[BODY.QUIZID]) }}>{quiz[BODY.QUIZNAME]}</td> */}
                                    <td onClick={() => { redirectQuizEditing(quiz[BODY.QUIZID]) }}> <ManagementCard quiz={quiz} /> </td>
                                    {quiz[BODY.ISPUBLISHED] === 0 && <td className={classes.colorYellow}>unpublished</td>}
                                    {quiz[BODY.ISPUBLISHED] === 1 && <td className={classes.colorGreen}>published</td>}
                                    {quiz[BODY.ISPUBLISHED] === 2 && <td className={classes.colorRed}>blocked</td>}
                                    <td>{convertDate(quiz[BODY.CREATIONTIME])}</td>
                                    <td>{quiz[BODY.TAKECOUNTS]}</td>
                                    {quiz[BODY.ISPUBLISHED] === 0 && <td><Button onClick={() => { publishQuiz(i) }}>Publish</Button></td>}
                                    {quiz[BODY.ISPUBLISHED] === 1 && <td><Button onClick={() => { unpublishQuiz(i) }}>Unpublish</Button></td>}
                                    {quiz[BODY.ISPUBLISHED] === 2 && <td className={classes.colorRed}>blocked</td>}
                                    <td><div className={`${classes.btn} ${classes.colorRed}`} onClick={() => { handleDeleteSingleQuizModal(i) }} >&#10005;</div></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {
                    end ? <div>No More</div>
                        : <Button onClick={loadMore}>More</Button>
                }
            </div>
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={handleDeleteMultipleQuizzes} hideModal={hideConfirmationModal} />
            <DeleteConfirmation showModal={displaySingleConfirmationModal} confirmModal={removeQuiz} hideModal={hideConfirmationModal} i={i} />
        </div>
    )
}
export default QuizManagement;