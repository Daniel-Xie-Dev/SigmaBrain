import { useStyles } from "./style";
import QuizManagement from "../../components/QuizManagement";
import { useHistory } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
import AuthContext from '../../context/auth-context'
const QuizManagementPage = () => {
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
    return (
        <div className={classes.background}> 
            <div className={classes.pageContainer}>
                <QuizManagement/>
            </div>
        </div>
    )
}

export default QuizManagementPage
