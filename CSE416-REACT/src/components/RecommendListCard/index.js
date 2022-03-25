import {useStyles} from './style'
import default_thumbnail from '../../images/default_quiz_thumbnail.png'
import BODY from '../../constant/body'
import quizApis from '../../api/quiz-api'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
const RecommendListCard = ({quiz})=>{
    const classes = useStyles()
    const [image, setImage] = useState()
    const history = useHistory()
    useEffect(()=>{
        const loadThumbnail = async()=>{
            try{
                let response = await quizApis.getQuizThumbnail(quiz[BODY.QUIZID])
                if(response.data==null || response.data==""){
                    setImage(default_thumbnail)
                    return
                }
                setImage(response.data)
            }catch{
                setImage(default_thumbnail)
            }
        }
        loadThumbnail()
    },[quiz])

    const redirectToOtherQuiz = ()=>{
        if(quiz!==undefined && quiz!=null){
            history.push('/quizDescription/' + quiz[BODY.QUIZID])
        }
    }
    return(
        <div onClick={redirectToOtherQuiz} className={`card flex-row  ${classes.cardSize}`}>
            <img className={`card-img-left ${classes.imgSzie}`}  src={image} alt="Card image cap"/>
            <div className="card-body">
                <div className={` ${classes.cardText}`}>{quiz[BODY.QUIZNAME]}</div>
                <div className={classes.quizInfo}>
                    <div className={`card-text`}>{quiz[BODY.DISPLAYNAME]}</div>
                    <div className={`card-text`}>{quiz[BODY.TAKECOUNTS]} take counts</div>
                </div>
            </div>
        </div>
    )
}


export default RecommendListCard