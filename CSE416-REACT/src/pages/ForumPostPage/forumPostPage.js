
import { useStyles } from './style'
import ForumPostBox from '../../components/ForumPostBox'
const ForumPostPage = ()=>{
    const classes = useStyles()
    return(
        <div>
            <div className={classes.postContainer}>
                <ForumPostBox/>
            </div>
        </div>
    )
}

export default ForumPostPage