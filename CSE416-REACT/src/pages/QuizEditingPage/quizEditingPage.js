import { useStyles } from './style'
import QuizEditing from '../../components/QuizEditing'
import { useHistory } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
import AuthContext from '../../context/auth-context'
const QuizEditingPage = () => {
    const classes = useStyles()
    const [login, setLogin] = useState(true)
    const history = useHistory()
    const {auth} = useContext(AuthContext)
    useEffect(()=>{
        setLogin(auth.loggedIn)
    }, [auth])

    if(!login){
        history.push('/')
    }
    return(
        <div className={classes.pageContainer}>
            <QuizEditing/>
        </div>
    )
}

export default QuizEditingPage