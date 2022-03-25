import { useStyles } from './style'
import { useParams } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import quizApis from '../../api/quiz-api';
import QuizTaking from '../../components/QuizTaking'
import Countdown from 'react-countdown';
import HEADER from '../../constant/header';
import AuthContext from '../../context/auth-context';
import BODY from '../../constant/body';
import userApis from '../../api/user-api';

const QuizTakingPage = () => {
    const classes = useStyles();
    const { auth } = useContext(AuthContext)
    const { quizId } = useParams();
    const [flag, setFlag] = useState(false);
    const [answerChoices, setAnswerChoices] = useState([[]]);
    const [correctChoices, setCorrectChoices] = useState([]);
    const [creator, setCreator] = useState()
    const [pick, setPick] = useState([])
    useEffect(() => {
        const getQuiz = async () => {
            let quiz = await quizApis.getQuiz(quizId)
            setCreator(quiz.data[0][BODY.USERID])
        }
        getQuiz()
    }, [])

    const saveResults = async (correct) => {
        const payload = {
            "quizId": quizId,
            "quizGrade": (correct / answerChoices.length).toFixed(2)
        }

        if (auth.user !== null) {
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN]: token
            }
            await quizApis.createQuizGrade(payload, headers);
        }
        updateChannelLeaderboardScore(correct);
    }

    const updateChannelLeaderboardScore = async (result)=>{
        if (auth.user !== null) {
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN]: token
            }
            let payload = {
                [BODY.CHANNELOWNER]: creator,
                [BODY.SCORE]: result

            }
            userApis.updateChannelLeaderboard(payload, headers)
        }
    }

    const changeFlag = async () => {
        if (auth.user !== null) {
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN]: token
            }
            let payload = {
                ["answers"]: answerChoices,
                [BODY.QUIZID]: quizId
            }
            await quizApis.checkQuiz(payload, headers)
            setFlag(true);
        }
        // setFlag(true);
        // console.log(answerChoices)
        // console.log(correctChoices)
        // await quizApis.checkQuiz()
        // let correct = 0;
        // for (let i = 0; i < answerChoices.length; i++) {
        //     console.log(parseInt(answerChoices[i]))
        //     console.log(correctChoices[i])
        //     if (parseInt(answerChoices[i]) === correctChoices[i][0]) {
        //         correct++;
        //     }
        // }
        // saveResults(correct);
    }
    const sendAnswer = ()=>{
        
    }

    return (

        <div className={classes.pageContainer}>

            <QuizTaking
                flag={flag}
                setFlag={setFlag}
                answerChoices={answerChoices}
                setAnswerChoices={setAnswerChoices}
                correctChoices={correctChoices}
                setCorrectChoices={setCorrectChoices}
                changeFlag={changeFlag}
            />

        </div>
    )
}

export default QuizTakingPage;