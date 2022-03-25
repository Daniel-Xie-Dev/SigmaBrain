import { useHistory } from 'react-router';
import { useStyles } from "./style"
import { useEffect, useState } from "react"
import BODY from "../../../constant/body";
import userApis from "../../../api/user-api";
import default_thumbnail from '../../../images/default_quiz_thumbnail.png'
import quizApis from '../../../api/quiz-api';
const SearchResultCard = ({result})=>{
    const classes = useStyles()
    let history = useHistory()
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    useEffect(()=>{
        const loadName = async ()=>{
            let response = await userApis.getUserDisplayName(result[BODY.USERID])
            if(response.data.length>0){
                setName(response.data[0][BODY.DISPLAYNAME])
            }
        }

        const loadImage = async ()=>{
            try {
                let response = await quizApis.getQuizThumbnail(result[BODY.QUIZID])
                setImage(response.data)
            } catch (error) {
                setImage(default_thumbnail)
            }
        }
        loadName()
        loadImage()
    },[result])

    const redirectToQuizPage = ()=>{
        console.log("redirect to quiz page")
        // history.push(`/quizDescription/${result[BODY.QUIZID]}
    }

    return(
        <div className={classes.searchResultContainer} onClick={redirectToQuizPage}>
            <div className={classes.imgContainer}>
                <img className={classes.imgSize} src={image} alt=""/>
            </div>
            <div className={classes.cardContainer}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <div>
                    <div>{result[BODY.QUIZNAME]}</div>
                    <div>
                        Quiz View : {result[BODY.TAKECOUNTS]} <br />
                        Quiz Author : {name} <br />
                        Likes: {result[BODY.LIKES]}    Dislikes: {result[BODY.DISLIKES]}
                    </div>
                </div>
            </div>
        </div>
    )    
}

export default SearchResultCard