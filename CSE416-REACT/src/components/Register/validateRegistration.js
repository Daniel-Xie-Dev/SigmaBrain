export default function validateRegistration(values) {
    //This function checks if the front end information
    
    let errors = {}
    //email regex
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(!values.email){
        errors.EmailError = "Please Enter an Email Address"
    }else if (!emailRegex.test(values.email)) {
        errors.EmailError = "Please Provide email in the format of 'sample@email.com"
    }

    if(!values.name){
        errors.UsernameError = "Please Enter an Username"
    }

    if(!values.password){
        errors.PasswordError = "Please Enter a Password"
    }else if(values.password.length < 8){
        errors.PasswordError = "Please Enter an 8 character password"
    }

    if(!values.confirmPassword){
        errors.ConfirmPasswordError = "Please Enter a Confirmed Password"
    }else if(!(values.password === values.confirmPassword)){
        errors.ConfirmPasswordError = "Password and Confirm Password must be the same"
    }
    

    return errors

}