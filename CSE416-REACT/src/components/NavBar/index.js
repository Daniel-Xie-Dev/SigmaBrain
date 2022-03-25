import {useState, useContext, useEffect} from 'react';
import { useStyles } from './style';
import SearchInput from './SearchBar'
import Logo from './Logo'
import UserLogin from './UserLogin';
import UserControl from './UserControls';
import AuthContext from '../../context/auth-context';

const NavBar = () => {
    //or create a context?
    const [searchString, setSearchString] = useState("")
    //temp is Logged IN variable
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { auth } = useContext(AuthContext)

    useEffect(()=>{
        if(auth.loggedIn){
            setIsLoggedIn(true)
        }
        else{
            setIsLoggedIn(false)
        }
    }, [auth])

    const classes = useStyles()
    return (
        <div className={classes.barContainer}>
            <div className={classes.icon}>
                <Logo/>
            </div>

            <div className={classes.search}>
                <SearchInput searchString = {searchString} setSearchString = {setSearchString}/>
            </div>

            <div className={classes.buttons}>
                {
                //If user is logged in, use the userControl component, if not, use userLogin component
                isLoggedIn ? <UserControl setLogin = {setIsLoggedIn}/> 
                    : <UserLogin setLogin = {setIsLoggedIn}/>
                
                }
            </div>
        </div>
    )
}

export default NavBar