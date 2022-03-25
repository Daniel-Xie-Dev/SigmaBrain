import React from 'react'
import { useStyles } from './style'
import ResetPasword from '../../components/ResetPassword'

const ResetPasswordPage = () => {
    const classes = useStyles()

    return (
        <div className={classes.pageContainer}>
            <div className={classes.loginContainer}>
                <ResetPasword />
            </div>
        </div>
    )
}

export default ResetPasswordPage
