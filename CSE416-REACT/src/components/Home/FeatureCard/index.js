import { useStyles } from "./style"
import BODY from "../../../constant/body"
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
const FeatureCard = (props) =>{
    const classes = useStyles()
    const history = useHistory()
    const [animation, setAnimation] = useState(false)
    const [dot, setDot]= useState(0)
    const viewQuiz = ()=>{
        let quizId = props.quiz[BODY.QUIZID]
        history.push(`/quizDescription/${quizId}`)
    }
    const doAnimation = (i)=>{
        setAnimation(true)
        setDot(i)
        props.changeFeatureQuiz(i)
    }

    const rotateFeatureQuiz = ()=>{
        let newDot = (dot+1)%props.total
        doAnimation(newDot)
    }

    useEffect(()=>{
        if(props.rotate){
            const timerId =  setInterval(rotateFeatureQuiz, 5000)
            return function cleanup(){
                clearInterval(timerId)
            }
        }

    },[dot, props.quizzes])

    if(props.quiz===undefined){
        return <div>No Quiz Found</div>
    }
    return(
        <div>
            <div onAnimationEnd={()=>{setAnimation(false)}} className={`${classes.featureCardContainer} ${animation && 'appear'}`}>
                <div className={classes.description}>
                    {/* <div className={classes.popularTitle} >Most Popular Quiz!!!!</div> */}
                    <div className={classes.quizBox}>
                        <div className={classes.quizName}>{props.quiz[BODY.QUIZNAME]}</div>
                        <div className={classes.quizDescription}>{props.quiz[BODY.QUIZDESCRIPTION]}</div>
                        <div className={classes.clickButton} onClick={viewQuiz}>SEE MORE</div>
                    </div>
                </div>
                <div className={classes.img}>
                    <img className={classes.imgSize} src={props.image} alt="feature card thumbnial"/>
                </div>
            </div>
            {
                props.rotate && <div className={classes.dotContainer}>
                    {
                        [...Array(props.total)].map((e, i)=>{
                            return <div key={i} className={`${classes.dot} ${i===dot && classes.dotted}`} onClick={()=>{doAnimation(i)}}/>
                        })
                    }
                </div>
            }
        </div>
    )

}

export default FeatureCard