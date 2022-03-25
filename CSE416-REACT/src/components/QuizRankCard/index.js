import BODY from "../../constant/body"
import { useStyles } from './style'
import { useEffect, useState } from 'react'
import quizApis from "../../api/quiz-api"
import default_thumbnail from "../../images/default_quiz_thumbnail.png"
const QuizRankCard = ({quiz, rank}) => {
    const classes = useStyles()
    const [image, setImage] = useState("")
    useEffect(()=>{
        const loadImage = async ()=>{
            try{
                let response = await quizApis.getQuizThumbnail(quiz[BODY.QUIZID])
                if(response.data==null || response.data==""){
                    setImage(default_thumbnail)
                    return
                }
                setImage(response.data)
            }catch(e){
                setImage(default_thumbnail)
            }
            
        }
        if(rank<=3){
            loadImage()
        }
    }, [])

    if(rank<=3){
        return(
            <div className={classes.container}>
                <div>
                    {rank}.
                </div>
                <div className={classes.imgContainer}>
                    <img className={classes.imgSize} src={image}/>
                </div>
                <div className={classes.topQuizName}>
                   {quiz[BODY.QUIZNAME]}
                </div>
            </div>
        )
    }
    return(
        <div className={classes.container}>
            {rank}. 
            <div className={classes.text}>
                {quiz[BODY.QUIZNAME]}
            </div>
        </div>
    )
}

export default QuizRankCard