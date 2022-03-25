import { useState, useEffect, useContext } from 'react';
import { useStyles } from './style';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import AuthContext from '../../context/auth-context'
import ERRORCODE from '../../constant/firebase-error-code';
import validateLogin from './validateLogin';
const Login = () => {

    const classes = useStyles()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    const { auth, error } = useContext(AuthContext)
    const [formErrors, setFormErrors] = useState({})
    const [errorMsg, setErrorMsg] = useState([])
    const updateEmail = (event) => {
        setEmail(event.target.value)
    }

    const updatePassword = (event) => {
        setPassword(event.target.value)
    }

    const confirmLogin = () => {
        const errorMessages = validateLogin({ email, password })
        setFormErrors(errorMessages)

        //If no front end errors, then proceed
        if (Object.keys(errorMessages).length === 0)
            auth.login(email, password)

        checkForLoginErrors()
    }


    useEffect(()=>{
        if(auth.user!=null){
            history.push('/')
        }

        if (error != null) {
            checkForLoginErrors()
        }
    }, [auth.user, error, history])



    const checkForLoginErrors = () => {
        let errorMessages = {}

            if (error === ERRORCODE.INVALID_EMAIL) {
                errorMessages.EmailError = "Invalid Email Address"
            }
            else if (error === ERRORCODE.USER_NOT_FOUND) {
                errorMessages.EmailError = " "
                errorMessages.PasswordError = "Either the Email or the Password is incorrect"
            }
            else if (error === ERRORCODE.WRONG_PASSWORD) {
                errorMessages.EmailError = " "
                errorMessages.PasswordError = "Either the Email or the Password is incorrect"
            }
            else if (error === ERRORCODE.TOO_MANY_ATTEMPTS) {
                setErrorMsg([ERRORCODE.TOO_MANY_ATTEMPTS_MSG])
            }

        setFormErrors(errorMessages)

        return errorMessages
    }

    return (
        <div className={classes.loginForm}>
            {
                errorMsg.map((error, i) => {
                    return <div key={i} className="alert alert-danger" role="alert">
                        {error}
                    </div>
                })
            }
            <div className={classes.titleWrapper}>
                <h3 className={classes.title}>Sign In</h3>
            </div>
            <div className={classes.loginWrapper}>
                <div className={classes.formGroup}>
                    <div className={classes.textToLeft}>Email</div>
                    <div className={classes.inputWrapper}>
                        <input
                            className={formErrors?.EmailError ? classes.inputError : classes.input}
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={updateEmail}
                        />
                        {formErrors?.EmailError && (
                            <p className={classes.errorMsg}>{formErrors.EmailError}</p>
                        )}
                    </div>
                    <div className={classes.textToLeft}>Password</div>
                    <div className={classes.inputWrapper}>
                        <input
                            className={formErrors?.PasswordError ? classes.inputError : classes.input}
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={updatePassword}
                        />
                        {formErrors?.PasswordError && (
                            <p className={classes.errorMsg}>{formErrors.PasswordError}</p>
                        )}
                    </div>
                </div>
                {
                    <div className={classes.loginOptions}>
                        {/* <div className={classes.checkboxContainer}>
                            <input type="checkbox" />
                            <span>Stay Logged In</span>
                        </div> */}
                        <span className={classes.forgotPassword}>
                            <Link to="/forgetPassword" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                                Forgot Password?
                            </Link>
                        </span>
                    </div>
                }
                <div className={classes.buttonContainer}>
                    <button type="submit" className={classes.button} onClick={confirmLogin}>
                        Login
                    </button>
                </div>
            </div>
            <div className={classes.divider}></div>
        </div>
    )
}

export default Login
