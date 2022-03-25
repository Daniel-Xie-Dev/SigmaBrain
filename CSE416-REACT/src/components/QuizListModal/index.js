
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography  from '@mui/material/Typography'
import { useContext } from 'react'
import { useStyles } from './style'
import quizApis from '../../api/quiz-api'
import QuizCard from '../QuizCard'
import BODY from '../../constant/body'
import AuthContext from '../../context/auth-context'
import HEADER from '../../constant/header'
import Default_Quiz_Thumbnail from '../../images/default_quiz_thumbnail.png'
const QuizListModal = (props)=>{
    const classes = useStyles()
    const { auth } = useContext(AuthContext)

    const handleClose = ()=>{
        props.setOpen(false)
    }

    const pickQuiz = async (event,i)=>{
        const payload = {
            [BODY.QUIZID]: props.quizzes[i][BODY.QUIZID]
        }
        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN]: token
        }

        await quizApis.setUserTopFeatureQuiz(payload, headers)
        props.onChangeQuiz(i)
        props.setOpen(false)
        updateImage(i)
    }

    const updateImage = async (i)=>{
        try{
            let response = await quizApis.getQuizThumbnail(props.quizzes[i][BODY.QUIZID])
            props.updateImage(response.data)
        }catch(e){
            props.updateImage(Default_Quiz_Thumbnail)
        }
    }



    return(
        <Modal
            open={props.open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
            >
                <Box className={classes.modal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Quiz List
                    </Typography>

                        <div className={classes.quizContainer}>
                            {props.quizzes.map((quiz, i)=>{
                                return <div key={i} onClick={(event)=>{pickQuiz(event, i)}}>
                                    <QuizCard key={i} quiz={quiz}/>
                                </div>
                            })}
                        </div>
         
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </Box>
        </Modal>
    )
}

export default QuizListModal