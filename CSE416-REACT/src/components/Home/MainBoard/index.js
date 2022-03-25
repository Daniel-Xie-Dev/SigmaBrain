import {useEffect, useState, useRef, useContext} from 'react';
import { useStyles } from './style';
import FeatureCard from '../FeatureCard';
import CategoryBar from '../CategoryBar';
import QuizDisplayBoard from '../QuizDisplayBoard';
import quizApis from '../../../api/quiz-api';
import userApis from '../../../api/user-api';
import BODY from '../../../constant/body';
import CatgeorySideBar from '../CategorySideBar';
import AuthContext from '../../../context/auth-context';
import HEADER from '../../../constant/header';
import QUIZ_CATEGORY, { QUIZ_CATEGORY_DICT, QUIZ_CATEGORY_NAME } from '../../../constant/quiz-category';
import default_thumbnail from '../../../images/default_quiz_thumbnail.png';
const MainBoard = () => {
    const classes = useStyles()
    const {auth} = useContext(AuthContext)
    const [quiz, setQuiz] = useState()
    const [quizzes, setQuizzes] = useState([])
    const [image, setImage] = useState("")
    const [images, setImages] = useState(Array(3).fill(null))
    const [bar, setBar] = useState([])
    const refs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ]

    useEffect(()=>{

        const loadPopularQuiz = async () =>{
            try{
                let response = await quizApis.getMostPopularQuiz()
                let data = response.data
                setQuizzes(data)
                let img_array = Array(data.length).fill(null)
                if(data.length <= 0){
                    return
                }
                setQuiz(data[0])
                try{
                    response = await quizApis.getQuizThumbnail(data[0][BODY.QUIZID])
                    if(response.data==null || response.data==""){
                        setImage(default_thumbnail)
                        img_array[0] = default_thumbnail
                    }
                    else{
                        setImage(response.data)
                        img_array[0] = response.data
                    }
                    setImages(img_array)
                }catch{
                    setImage(default_thumbnail)
                    img_array[0] = default_thumbnail
                    setImages(img_array)
                }
            }catch(e){
                console.log(e)
            }

        }

        const loadPreferences = async()=>{
            if(auth.user!=null && auth.user!==undefined){
                const token = await auth.user.getIdToken()
                let headers = {
                    [HEADER.TOKEN] : token
                }
                let response = await userApis.obtainUserCategoryPreference(headers)
                let newlist = [{'categoryId': 0}]
                for(var i = 0; i < response.data.length; i++){
                    newlist.push(response.data[i])
                }
                setBar(newlist)
            }
        }

        const loadDefaultCategoryForNotLoggedIn = ()=>{
            let TEMP_QUIZ_CATEGORY = [...QUIZ_CATEGORY_NAME]
            TEMP_QUIZ_CATEGORY.splice(0, 1) //REMOVE THE FIRST ONE
            TEMP_QUIZ_CATEGORY.sort(() => 0.5 - Math.random())
            if(auth.user===undefined||auth.user==null){
                let defaultCategory = [
                    {'categoryId':QUIZ_CATEGORY.ALL},
                ]
                for(var i = 0; i < 5; i++){
                    defaultCategory.push({'categoryId':QUIZ_CATEGORY_DICT[TEMP_QUIZ_CATEGORY[i]]})
                }
                setBar(defaultCategory)
            }
        }

        loadPreferences()
        loadPopularQuiz()
        loadDefaultCategoryForNotLoggedIn()
        return ()=>{
            setQuiz()
            setImage()
        }
    }, [auth.user])

    const loadPreferences = async()=>{
        if(auth.user!=null && auth.user!==undefined){
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN] : token
            }
            let response = await userApis.obtainUserCategoryPreference(headers)
            let newlist = [{'categoryId': 0}]
            for(var i = 0; i < response.data.length; i++){
                newlist.push(response.data[i])
            }
            setBar(newlist)
        }
    }

    const changeFeatureQuiz = async (i)=>{
        setQuiz(quizzes[i])
        if(images[i]==null){
            let newImages = [...images]
            try{
                let response = await quizApis.getQuizThumbnail(quizzes[i][BODY.QUIZID])
                if(response.data==null || response.data==""){
                    newImages[i] = default_thumbnail
                }
                else{
                    newImages[i] = response.data
                }
            }catch{
                newImages[i] = default_thumbnail
            }
            setImages(newImages)
            setImage(newImages[i])
        }
        else{
            setImage(images[i])
        }
    }

    return (
        <div className={classes.mainContainer}>
            <CategoryBar
            bar={bar}/>
            <FeatureCard
                total={quizzes.length}
                quiz={quiz}
                quizzes={quizzes}
                image={image}
                changeFeatureQuiz={changeFeatureQuiz}
                rotate={true}/>
            {bar.map((c,i)=>{
                return (
                <div key={i} ref={refs[i]}>
                    <QuizDisplayBoard key={i} category={c['categoryId']}/>
                </div>
                )
            })}

         <CatgeorySideBar
            loadPreferences={loadPreferences}
            bar={bar}
            refs={refs}/>
           
        </div>
    )
}

export default MainBoard