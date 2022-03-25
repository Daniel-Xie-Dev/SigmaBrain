import { useState} from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './style';
import { sendResetPasswordEmail } from '../../firebase/firebase_auth';
const ResetPasword = () => {

    const classes = useStyles()
    const [email, setEmail] = useState("");
    const [resetEmailSent, setResetEmailSent] = useState(false)
    const updateEmail = (event) => {
        setEmail(event.target.value);
    }

    const sendPasswordResetEmail = () => {
        sendResetPasswordEmail(email);
        setResetEmailSent(true)
    }


    return (
        resetEmailSent ?
            <div className={classes.loginForm}>
                <div className={classes.titleWrapper}>
                    <h2 className={classes.title}>If you have an account with us, we have sent a reset password link to your email address</h2>
                </div>

                Press this button to go the Login Page
                <div className={classes.buttonContainer}>
                    <button className={classes.button} onClick={sendPasswordResetEmail}>
                        <Link to="/login" className={classes.redirectText}>Login Page</Link>
                    </button>
                </div>

            </div>
            :
            <div className={classes.loginForm}>
                <div className={classes.titleWrapper}>
                    <h3 className={classes.title}>Reset Password</h3>
                </div>
                <div className={classes.loginWrapper}>
                    <div className={classes.formGroup}>
                        <div className={classes.textToLeft}>Email</div>
                        <div className={classes.inputWrapper}>
                            <input
                                className={`${classes.input} ${classes.bottomBorder}`}
                                type="text"
                                name="email"
                                placeholder="Email"
                                onKeyUp={updateEmail}
                            />
                        </div>
                    </div>
                    <div className={classes.buttonContainer}>
                        <button type="submit" className={classes.button} onClick={sendPasswordResetEmail}>
                            Submit
                        </button>
                    </div>
                </div>
                <div className={classes.divider}></div>
            </div>
    )
}

export default ResetPasword
