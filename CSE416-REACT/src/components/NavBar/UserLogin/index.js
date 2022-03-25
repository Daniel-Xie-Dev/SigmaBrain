import React from 'react'
import { useHistory } from 'react-router'
import { useStyles } from './style'

const UserLogin = ({setLogin}) => {

    const classes = useStyles()
    let history = useHistory()


    return (
        <div className={classes.userControlsContainers}>

            <div className={classes.signUpButtonContainter}>
                <div className={classes.signUpBtn} onClick={()=>history.push('/register')}>
                    Sign Up
                </div>
            </div>


            <div className = {classes.LoginBtnContainer}>
                <div className = {classes.LoginBtn} onClick={()=>history.push('/login')}>
                    Log In
                </div>
            </div>
        </div>
    )
}

export default UserLogin
