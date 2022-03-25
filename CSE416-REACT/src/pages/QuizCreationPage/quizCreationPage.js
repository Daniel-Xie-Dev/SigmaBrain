import QuizCreation from '../../components/QuizCreation';
import { useStyles } from './style';
import { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import AuthContext from '../../context/auth-context';

const QuizCreationPage = () => {
    const classes = useStyles();
    const {auth} = useContext(AuthContext)
    const history = useHistory()
    const [login, setLogin] = useState(true)

    useEffect(()=>{
        setLogin(auth.loggedIn)
    }, [auth])

    if(!login){
        history.push('/')
    }

    return(
        <div className={classes.pageContainer}>
            <div className={classes.quizContainer}>
                <QuizCreation />
            </div>
        </div>
    );
}

export default QuizCreationPage;