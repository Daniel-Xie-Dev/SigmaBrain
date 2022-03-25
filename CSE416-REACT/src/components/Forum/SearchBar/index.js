import { useStyles } from './style';
import LOGO from '../LOGO';
import Search from '../Search';

const SearchBar = () => {
    const classes = useStyles()
    return(
        <div classNames={classes.barContainer}>
            <div className={classes.icon}>
                <LOGO/>
            </div>
            <div className={classes.search}>
                <Search/>
            </div>
        </div>
    )
}
export default SearchBar