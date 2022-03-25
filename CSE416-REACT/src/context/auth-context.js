import { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth'
import LOCAL_CONSTANT from '../constant/local-storage';
import BODY from '../constant/body';
import userApis from '../api/user-api';
import HEADER from '../constant/header';
const AuthContext = createContext()

export const AuthActionType = {
    LOGGED_IN: "LOGGED_IN",
    NOT_LOGGED_IN: "NOT_LOGGED_IN"
}

function AuthContextProvider(props){
    const fireauth = getAuth()
    const[auth, setAuth] = useState({
        user: fireauth.currentUser,
        loggedIn: true,
        loading: true
    })
    const [error, setError] = useState()
    const [passwordError, setPasswordError] = useState()
    useEffect(()=>{
        onAuthStateChanged(fireauth, (user)=>{
            if(user){
                console.log("login user")
                localStorage.setItem(LOCAL_CONSTANT.UID, user.uid)
                setAuth({
                    user:user,
                    loggedIn: true
                })
            }
    
            if(user==null){
                console.log("log out user")
                setAuth({
                    user:null,
                    loggedIn: false
                })
            }
        })
    }, [fireauth])

    const authReducer = (action) => {
        const {type, payload } = action;

        switch(type){
            case AuthActionType.LOGGED_IN: {
                localStorage.setItem("uid", payload.user.uid)
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                })
            }

            case AuthActionType.NOT_LOGGED_IN: {
                localStorage.removeItem("uid")
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                })
            }

            default:
                return auth;
        }
    }

    auth.login = (email, password) => {
        signInWithEmailAndPassword(fireauth, email, password)
            .then( async (userCredential)=>{
                let token = await userCredential.user.getIdToken()
                let headers = {
                    [HEADER.TOKEN] : token
                }
                let payload = {
                    [BODY.EMAIL]: userCredential.user.email,
                    [BODY.DISPLAYNAME]: "DEFAULT CHANGE YOUR NAME"
                }
                let axios_config = {
                    headers: headers
                }
                await userApis.createUser(payload, axios_config)
                authReducer({
                    type: AuthActionType.LOGGED_IN,
                    payload: {
                        user: userCredential.user,
                        loggedIn: true,
                        loading: false
                    }
                })
            })
            .catch((error)=>{
                setError(error.code)
            })
    }

    auth.changePassword = (originalPassword ,newPassword) => {
        signInWithEmailAndPassword(fireauth, auth.user.email, originalPassword)
            .then((userCredential)=>{
                updatePassword(userCredential.user, newPassword).then(()=>{
                    //change sucessfully
                    console.log("update sucessfully")
                    setPasswordError([1, "update sucessfully"])
                  }).catch((error)=>{
                    //change unsucessfully
                    console.log(error)
                  })
            })
            .catch((error)=>{
                console.log(error)
                setPasswordError([0, error.code])
            })
    }

    auth.signOut = () => {
        signOut(fireauth).then(()=>{
            setError()
            authReducer({
                type: AuthActionType.NOT_LOGGED_IN,
                payload: {
                    user: null,
                    loggedIn: false,
                    loading: false
                }
            })
        }).catch((error)=>{
        })
    }

    auth.getCurrentUserUid = () => {
        if(auth.user!=null){
            return auth.user.uid
        }
    }

    return(
        <AuthContext.Provider value={{auth, error, passwordError}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
export { AuthContextProvider }