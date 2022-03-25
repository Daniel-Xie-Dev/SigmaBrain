import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import LEVEL_CUTOFF from '../../../constant/levelPointsCutoff'
import ExperienceBar from '../../ExperienceBar';
import BODY from '../../../constant/body';
import HEADER from '../../../constant/header'
import AuthContext from '../../../context/auth-context'
import { useHistory } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import { userStyles, useStyles } from "./style";
import userApis from '../../../api/user-api'
import { Modal } from 'react-bootstrap/';


const QuizResult = (props) => {

    let history = useHistory();
    const classes = userStyles();
    const { auth } = useContext(AuthContext)
    const answerChoices = props.answerChoices;
    const questions = props.questions;
    const restartQuiz = props.restartQuiz;
    const correctChoices = props.correctChoices;
    const [userInfo, setUserInfo] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [experience, setExperience] = useState(0);
    const [prevExperience, setPrevExperience] = useState(0);
    const [expNeededToLevelUp, setExpNeededToLevelUp] = useState(0)
    //const [levelUp, setLevelUp] = useState(false)
    const [expBarPercentage, setExpBarPercentage] = useState(0)

    let correct = 0;
    for (let i = 0; i < answerChoices.length; i++) {
        for (let j = 0; j < correctChoices[i].length; j++) {
            if (answerChoices[i][0] === correctChoices[i][j]) {
                correct++;
            }
        }
    }

    const calculateProgress = (userLevel, expNeeded) => {
        //calculates the percentage on the experience bar

        //gets the experience cap for the current level
        const requiredExp = LEVEL_CUTOFF.LEVELS[userLevel].experience

        let percentage = Math.floor((1 - expNeeded / requiredExp) * 100);
        setExpBarPercentage(percentage);
    }

    const calculateQuizPoints = () => {
        //the points gained after taking completing the quiz
        return 900
    }

    const handleClose = () => {
        setShowModal(false);
    }
    const convertExperienceToLevel = (experience) => {
        let level = 1;
        let threshHold = 5;
        let flag = true;
        while (flag) {
            if (threshHold > experience) {
                flag = false;
            } else {
                experience -= threshHold;
                level += 1;
            }
        }
        return { "level": level, "experience": experience, "leftOver": threshHold - experience }
    }

    const updateLevelAndExpNeeded = async (newLevel, expNeeded, pointsGained) => {
        //updates the new points and level in the database
        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN]: token
        }
        let payload = {
            [BODY.SUBSCRIBETO]: userInfo.userId,
            [BODY.USERLEVEL]: newLevel,
            [BODY.EXPNEEDED]: expNeeded,
            [BODY.EXPGAINED]: pointsGained,
        }

        await userApis.updateUserLevel(payload, headers)
    }

    //handles the calculation for the new progress bars
    const processExp = (userLevel, expNeeded, expGained) => {
        let newExpNeeded = expNeeded - expGained

        if (newExpNeeded <= 0) {
            //Level up 
            //get the new required exp
            const requiredExp = LEVEL_CUTOFF.LEVELS[userLevel + 1].experience
            calculateProgress(userLevel + 1, requiredExp + newExpNeeded)
            setShowModal(true)
            setExpNeededToLevelUp(requiredExp + newExpNeeded)
        } else {
            //new exp needed
            calculateProgress(userLevel, newExpNeeded)
            setExpNeededToLevelUp(newExpNeeded)
        }
        //updates the database 
        //updateLevelAndExpNeeded(userLevel, expNeeded, expGained)
    }

    useEffect(() => {
        const handleExperience = async () => {
            let id = localStorage.getItem("uid");
            if (id === null) {
                alert(`Create an account to save your results!`);
                return
            }
            let response = await userApis.getUserInfo(id);
            if (response.data.length <= 0) {
                return
            }
            setUserInfo(response.data[0])
            //calculates and displays the initial user level and exp information
            calculateProgress(response.data[0].userLevel, response.data[0].expForLevelUp)
            let pointsGained = 0
            processExp(response.data[0].userLevel, response.data[0].expForLevelUp, pointsGained)

            setPrevExperience(response.data[0].experience);

            // const payload = {
            //     "userId": id,
            //     "experience": response.data[0].experience + correct
            // }
            // let response2 = await userApis.updateUserExperience(payload);
            // if (response2.data.length <= 0) {
            //     return
            // }
            //setShowModal(true);
            setExperience(response.data[0].experience + correct);
        }

        handleExperience();

    }, [])

    const renderCards = (index, question, answerChoices) => {
        if (answerChoices[1] === -1) {
            return (
                <Card key={index} className={classes.resultNoSelectionCardContainer}>
                    <Card.Header>
                        Question {index + 1}
                    </Card.Header>
                    <Card.Title>
                        {question}
                    </Card.Title>
                    <Card.Text>
                        You selected: No Answer Choice Selected
                    </Card.Text>
                </Card>
            );
        }
        let correct = false;
        for (let x = 0; x < correctChoices[index].length; x++) {
            if (answerChoices[0] === correctChoices[index][x]) {
                correct = true;
                break;
            }
        }
        return (
            <Card key={index} className={correct ? classes.resultCorrectCardContainer : classes.resultWrongtCardContainer}>
                <Card.Header>
                    Question {index + 1}
                </Card.Header>
                <Card.Title>
                    {question}
                </Card.Title>
                <Card.Text>
                    You selected: {answerChoices[1] === -1 ? "No Answer Choice Selected" : answerChoices[1]}
                </Card.Text>

            </Card>
        );
    }

    return (
        <div className={classes.container}>
            <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Congratulations</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Congratulations! You have Leveled Up!
                    {` Your new level is ${userInfo.userLevel + 1}`}
                    {` Experience needed for next level: ${expNeededToLevelUp}`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card key={-1} className={classes.congratualtionCardContainer}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Header>Congratulations!</Card.Header>
                    <Card.Text>
                        You got {correct} out of {answerChoices.length} questions right!
                    </Card.Text>

                    <ExperienceBar bgcolor={'red'} completed={expBarPercentage} />

                    <Card.Text>
                        You still need {expNeededToLevelUp} EXP to get to the next level
                    </Card.Text>
                    <div className={classes.buttonContainer}>
                        <div className={classes.optionButton}onClick={restartQuiz}>Retake Quiz</div>
                        <div className={classes.optionButton} onClick={() => history.push('/')}>Return Home</div>
                    </div>
                </Card.Body>
            </Card>
            <div className={classes.questionCardcontainer}>
                {questions.map((content, index) => renderCards(index, content.question, answerChoices[index]))} 
            </div>  
        </div>
    );
}


export default QuizResult;