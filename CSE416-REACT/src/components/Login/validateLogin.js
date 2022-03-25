export default function validateLogin(values) {
    //This function checks if the front end information
    
    let errors = {}

    if(!values.email){
        errors.EmailError = "Please Enter an Email Address"
    }
    if(!values.password){
        errors.PasswordError = "Please Enter a Password"
    }

    return errors

}