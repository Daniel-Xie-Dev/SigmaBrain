import React from 'react'
import { useStyles } from './style'
import { SideBar, MainBoard } from '../../components/Home'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth-context';

const HomePage = () => {
    const classes = useStyles()
    const [login, setLogin] = useState(true)
    const {auth} = useContext(AuthContext)
    useEffect(()=>{
        if(!auth.loggedIn){
            setLogin(false)
        }
        else{
            setLogin(true)
        }
    }, [auth])

    if(!login){
        return(
            <div className={`${classes.notLoginHomeContainer} ${classes.notlogin}`}>
                <MainBoard className={classes.notlogin}/>
            </div>
        )
    }
    return (

        <div> 
            <div>
                <SideBar className={classes.sidebar}/>
            </div>
            <div className={classes.homeContainer}>
                <div>
                    <MainBoard className={classes.main}/>
                </div>
            </div>
        </div>
    )
}

export default HomePage
