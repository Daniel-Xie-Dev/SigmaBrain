import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { app } from '../firebase/firebase_init'
export function register(email, password){
    const auth = getAuth(app);
    return createUserWithEmailAndPassword(auth, email, password)
}

export async function login(email, password){
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      // const user = userCredential.user;
      // ...
    
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error")
      console.log(errorMessage)
    });
}

export function signOut(){
    const auth = getAuth(app);
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

export function sendResetPasswordEmail(email){
    const auth = getAuth(app);
    sendPasswordResetEmail(auth,email).then(() => {
        // sendResetPasswordEmail
    }).catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      //error
      console.log(errorMessage)
    });
}

export function resetPassword(user, newPassword){
  updatePassword(user, newPassword).then(()=>{
    //change sucessfully
  }).catch((error)=>{
    //change unsucessfully
  })
}
