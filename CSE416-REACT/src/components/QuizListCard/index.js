import {useStyles} from './style'
import BODY from '../../constant/body'
import {useState, useEffect} from 'react'
import quizApis from '../../api/quiz-api'
import default_thumbnail from '../../images/default_banner.png'
import {useHistory} from 'react-router-dom'
import userApis from '../../api/user-api'
const QuizListCard = ({quiz}) => {
    const classes = useStyles()
    const [image, setImage] = useState("")
    const history = useHistory()
    const [displayname, setDisplayname] = useState("loading")
    useEffect(()=>{
        const loadQuizThumbnail = async ()=>{
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

        const loadDisplayName = async ()=>{
            try{
                let response = await userApis.getUserDisplayName(quiz[BODY.USERID])
                if(response.data.length>0){
                    setDisplayname(response.data[0][BODY.DISPLAYNAME])
                }
            }catch{
                console.log("user doesn't exist")
            }
        }
        loadDisplayName()
        loadQuizThumbnail()
    }, [])

    const redirectToQuizPage = ()=>{
        history.push(`/quizDescription/${quiz[BODY.QUIZID]}`)
    }

    return(
        <div className={classes.container} onClick={redirectToQuizPage}>
            <div>
                <img className={classes.imgSize} src={image}/>
            </div>
            <div>
                <div className={classes.quizName}>
                    {quiz[BODY.QUIZNAME]}
                </div>
                <div>
                    <div className={classes.subtitle}>{quiz[BODY.TAKECOUNTS]} take counts . {quiz[BODY.CREATIONTIME]} . {displayname}</div>
                </div>
                <div className={classes.quizDescription}>{quiz[BODY.QUIZDESCRIPTION]}</div>
            </div>
        </div>
    )
}


export default QuizListCard