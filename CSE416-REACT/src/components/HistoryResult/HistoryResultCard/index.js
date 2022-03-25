import BODY from "../../../constant/body"
import { useStyles } from './style'
import { useHistory } from 'react-router-dom'
const HistoryResultCard = ({result})=>{
    const classes = useStyles()
    const history = useHistory()
    const redirectToDescription = ()=>{
        history.push(`/quizDescription/${result[BODY.QUIZID]}`)
    }

    return(
        <div onClick={redirectToDescription} className={classes.contianer}>
            <div>
                {result[BODY.QUIZNAME]}
            </div>
            <div>
                {result[BODY.CREATIONTIME]}
            </div>
            <div>
                {result[BODY.QUIZID]}
            </div>
        </div>
    )
}


export default HistoryResultCard