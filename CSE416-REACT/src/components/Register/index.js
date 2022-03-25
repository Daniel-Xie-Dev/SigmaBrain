import { useState, useEffect, useContext } from 'react';
import { useStyles } from './style';
import { register } from '../../firebase/firebase_auth';
import { Link } from 'react-router-dom';
import userApi from '../../api/user-api';
import BODY_CONSTANT from '../../constant/body';
import HEADER_CONSTANT from '../../constant/header';
import { getAuth } from 'firebase/auth';
import AUTH_ERROR from '../../constant/firebase-error-code';
import { useHistory } from "react-router-dom";
import AuthContext from '../../context/auth-context'
import ERRORCODE from '../../constant/firebase-error-code';
import User_image from '../../images/user.png'
import validateRegistration from './validateRegistration';
const Register = () => {

    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([])

    const [formErrors, setFormErrors] = useState({})

    const [name, setName] = useState("")
    const history = useHistory()
    const { auth } = useContext(AuthContext)

    const updateEmail = (event) => {
        setEmail(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const updateConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const updateName = (event) => {
        setName(event.target.value)
    }

    useEffect(() => {
        if (auth.user != null) {
            history.push('/')
        }
    })

    const confirmRegister = async (event) => {
        //checks the validation in the front end
        const errorsRegisters = await validateRegistration({ name, email, password, confirmPassword })
        setFormErrors(errorsRegisters)

        //If no front end issues, then proceed
        if (Object.keys(errorsRegisters).length === 0)
            register(email, password).then(async (userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // ...
                let payload = {}
                let axios_config = {}
                let headers = {}
                const token = await getAuth().currentUser.getIdToken()
                headers[HEADER_CONSTANT.TOKEN] = token
                payload[BODY_CONSTANT.EMAIL] = email
                payload[BODY_CONSTANT.DISPLAYNAME] = name
                axios_config = {
                    headers: headers
                }
                try {
                    await userApi.createUser(payload, axios_config)
                    history.push("/")
                } catch (e) {
                    console.log("error from creating user to mysql server ", e)
                }

            })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log("this is the error")
                    console.log(error)
                    // const errorMessage = error.message;
                    console.log(errorCode)
                    if (errorCode === AUTH_ERROR.ALREADY_REGISTERED) {
                        const errors = {}
                        errors.EmailError = "This Email already has an account with us. Please try a different email or log in"
                        setFormErrors(errors)
                    }
                    else {
                        setErrorMessages([ERRORCODE.REGISTER_UNSUCESS_MSG])
                    }
                    // ..
                });
    }

    return (
        <div className={classes.loginForm}>
            <div className={classes.titleWrapper}>
                <h3 className={classes.title}>Register Here</h3>
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

                    <div className={classes.textToLeft}>Display Name</div>
                    <div className={classes.inputWrapper}>
                        <input
                            className={formErrors?.UsernameError ? classes.inputError : classes.input}
                            type="text"
                            name="name"
                            placeholder="Display Name"
                            onChange={updateName}
                        />

                        {formErrors?.UsernameError && (
                            <p className={classes.errorMsg}>{formErrors.UsernameError}</p>
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

                    <div className={classes.textToLeft}>Confirm Password</div>
                    <div className={classes.inputWrapper}>
                        <input
                            className={formErrors?.ConfirmPasswordError ? classes.inputError : classes.input}
                            type="password"
                            name="password"
                            placeholder="Enter Password Again"
                            onChange={updateConfirmPassword}
                        />
                        {formErrors?.ConfirmPasswordError && (
                            <p className={classes.errorMsg}>{formErrors.ConfirmPasswordError}</p>
                        )}
                    </div>

                </div>
                {
                    <div className={classes.loginOptions}>
                        <span className={classes.forgotPassword}>
                            <Link to="/login" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                                Have An Account?
                            </Link>
                        </span>
                    </div>
                }
                <div className={classes.buttonContainer}>
                    <button type="submit" className={classes.button} onClick={confirmRegister}>
                        Continue
                    </button>
                </div>
            </div>
            <div className={classes.divider}></div>
        </div>
    )
}

export default Register