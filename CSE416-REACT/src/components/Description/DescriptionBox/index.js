import { useStyles } from './style'
import { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import quizApis from '../../../api/quiz-api'
import BODY from '../../../constant/body'
import Button from "@mui/material/Button"
import AuthContext from '../../../context/auth-context'
import HEADER from '../../../constant/header'
import NoUserModal from '../../NoUserModal'
import userApis from '../../../api/user-api'
import default_thumbnial from '../../../images/default_quiz_thumbnail.png'
import RecommendListCard from '../../RecommendListCard'
import AdminModal from '../../AdminModal'
import default_profile from '../../../images/Default_profile.png'
const DescriptionBox = (props) => {
    const classes = useStyles()
    const { quizId } = useParams()
    const [quiz, setQuiz] = useState()
    // const [image, setImage] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [ownerName, setOwnerName] = useState("")
    const [userImage, setUserImage] = useState("")
    const [level, setLevel] = useState(0)
    const [showModal, setShowModal] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [likedStatus, setLikedStatus] = useState(2)
    const [saveStatus, setSaveStatus] = useState(false)
    const [subscribeStatus, setSubscribeStatus] = useState(false)
    const [self, setSelf] = useState(false)
    const [relevant, setRelevant] = useState([])
    const { auth } = useContext(AuthContext)
    const history = useHistory()
    const [remove, setRemove] = useState(false)
    const [block, setBlock] = useState(false)
    const [likeCounts, setLikeCounts] = useState(0)
    const [dislikeCounts, setDislikeCounts] = useState(0)
    const adminRemoveMsg = "Are you going to remove this quiz using admin privilege?"
    const adminBlockMsg = "Are you going to block this quiz using admin privilege?"
    useEffect(() => {

        const loadRelevantQuiz = async (quizName, quizOwner) => {
            let body = {
                [BODY.USERID]: quizOwner,
                [BODY.QUIZNAME]: quizName
            }
            let response = await quizApis.getRelevantQuiz(body)
            setRelevant(response.data)
        }

        const loadQuiz = async () => {
            let response = await quizApis.getQuizWithUser(props.quizId)
            if (response.data.length <= 0) {
                return
            }
            setQuiz(response.data[0])
            setLevel(response.data[0][BODY.USERLEVEL])
            setOwnerName(response.data[0][BODY.DISPLAYNAME])
            loadQuizThumbnail(response.data[0][BODY.QUIZID])
            loadUserImage(response.data[0][BODY.USERID])
            getSubscribeStatus(response.data[0][BODY.USERID])
            loadRelevantQuiz(response.data[0][BODY.QUIZNAME], response.data[0][BODY.USERID])
            setLikeCounts(response.data[0][BODY.LIKES])
            setDislikeCounts(response.data[0][BODY.DISLIKES])
        }



        const loadQuizThumbnail = async (quizId) => {
            try {
                let response2 = await quizApis.getQuizThumbnail(quizId)
                if (response2.data == null || response2.data == "") {
                    setThumbnail(default_thumbnial)
                    return
                }
                setThumbnail(response2.data)
            } catch {
                setThumbnail(default_thumbnial)
            }
        }

        const loadUserImage = async (userId) => {
            try {
                let response = await userApis.getProfileImage(userId)
                if (response.data == null || response.data == "") {
                    setUserImage(default_profile)
                    return
                }
                setUserImage(response.data)
            } catch {
                setUserImage(default_profile)
            }
        }

        const loadQuizAdmin = async () => {
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN]: token
            }
            let response = await quizApis.obtainUserQuizAdmin(quizId, headers)
            if (response.data.length <= 0) {
                return
            }
            setQuiz(response.data[0])
            loadQuizThumbnail(response.data[0][BODY.QUIZID])
            loadUserImage(response.data[0][BODY.USERID])
        }

        const checkAdmin = async () => {
            if (auth.user != null && auth.user !== undefined) {
                let uid = auth.user.uid
                let response = await userApis.getUserInfo(uid)
                if (response.data.length > 0 && response.data[0][BODY.ISADMIN] === 1) {
                    setAdmin(true)
                    if (quiz === undefined) {
                        loadQuizAdmin()
                    }
                }
            }
        }

        const getLikedStatus = async () => {
            if (auth.user != null && auth.user !== undefined) {
                const token = await auth.user.getIdToken()
                let headers = {
                    [HEADER.TOKEN]: token
                }
                let response = await quizApis.getLikedStatusOnQuiz(quizId, headers)
                console.log(response.data, quizId)
                if (response.data.length > 0) {
                    setLikedStatus(response.data[0][BODY.LIKEDSTATUS])
                }
                else{
                    setLikedStatus(2)
                }
            }
        }

        const getSavelaterStatus = async () => {
            if (auth.user != null && auth.user !== undefined) {
                const token = await auth.user.getIdToken()
                let headers = {
                    [HEADER.TOKEN]: token
                }
                let response = await quizApis.getTakeLaterStatus(quizId, headers)
                if (response.data.length > 0) {
                    setSaveStatus(true)
                }
                else {
                    setSaveStatus(false)
                }
            }
        }

        const getSubscribeStatus = async (uid) => {
            if (auth.user != null && auth.user !== undefined) {
                if (auth.user.uid === uid) {
                    setSelf(true)
                    return
                }
                const token = await auth.user.getIdToken()
                let headers = {
                    [HEADER.TOKEN]: token
                }
                let response = await userApis.checkSubscribeStatus(uid, headers)
                if (response.data.length > 0) {
                    setSubscribeStatus(true)
                }
                else {
                    setSubscribeStatus(false)
                }
            }
        }

        loadQuiz()
        checkAdmin()
        getLikedStatus()
        getSavelaterStatus()
    }, [quizId, auth.user])

    /*Can integrate together with a like status parameter*/
    const changeLikedStatusOnQuiz = async (like) => {
        if (!auth.loggedIn) {
            setShowModal(true);
            return
        }

        updateLikeCounts(like)

        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN]: token
        }
        let payload = {
            [BODY.QUIZID]: quizId,
            [BODY.LIKEDSTATUS]: like
        }
        setLikedStatus(like)
        await quizApis.likedQuiz(payload, headers)
    }

    const takeLater = async () => {
        if (!auth.loggedIn) {
            setShowModal(true);
            return
        }
        let payload = {
            [BODY.QUIZID]: quizId
        }
        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN]: token
        }
        await quizApis.takeLaterQuiz(payload, headers)
        setSaveStatus(true)
    }

    const removeTakeLater = async () => {
        if (!auth.loggedIn) {
            setShowModal(true);
            return
        }
        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN]: token
        }
        await quizApis.removeTakeLaterQuiz(quizId, headers)
        setSaveStatus(false)
    }

    const startQuiz = async () => {
        if (!auth.loggedIn) {
            setShowModal(true);
            return
        }
        history.push(`/quizTaking/${props.quizId}`);
        var date = new Date()
        var dateString = date.getUTCFullYear() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds()
        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN]: token
        }
        let payload = {
            [BODY.QUIZID]: props.quizId,
            [BODY.HISTORYTIME]: dateString
        }
        await quizApis.createQuizHistory(payload, headers)
    }

    const redirectToProfile = (userId) => {
        history.push(`/profile/${userId}`)
    }

    const onSubscribe = async () => {
        if (auth.user != null && auth.user !== undefined) {
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN]: token
            }
            let payload = {
                [BODY.SUBSCRIBETO]: quiz[BODY.USERID]
            }
            await userApis.subscribe(payload, headers)
            setSubscribeStatus(true)
        }
    }

    const unsubscribe = async () => {
        if (auth.user != null && auth.user !== undefined && quiz !== undefined) {
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN]: token
            }
            let payload = {
                [BODY.SUBSCRIBETO]: quiz[BODY.USERID]
            }
            await userApis.unsubscribe(payload, headers)
            setSubscribeStatus(false)
        }
    }

    const adminBlockQuiz = async () => {
        if (auth.user != null && auth.user !== undefined) {
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN]: token
            }
            let payload = {
                [BODY.QUIZID]: quiz[BODY.QUIZID],
                [BODY.ISPUBLISHED]: 2
            }
            await quizApis.adminBlockQuiz(payload, headers)
            let newQuiz = { ...quiz }
            newQuiz[BODY.ISPUBLISHED] = 2
            setQuiz(newQuiz)
            setBlock(false)
        }
    }

    const adminUnblockQuiz = async () => {
        if (auth.user != null && auth.user !== undefined) {
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN]: token
            }
            let payload = {
                [BODY.QUIZID]: quiz[BODY.QUIZID],
                [BODY.ISPUBLISHED]: 1
            }
            await quizApis.adminBlockQuiz(payload, headers)
            let newQuiz = { ...quiz }
            newQuiz[BODY.ISPUBLISHED] = 1
            setQuiz(newQuiz)
        }
    }

    const adminRemoveQuiz = async () => {
        if (auth.user != null && auth.user !== undefined) {
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN]: token
            }
            await quizApis.removeUserQuizAdmin(quizId, headers)
            history.push('/')
        }
    }

    const updateLikeCounts = (like)=>{
        if(like===2 && likedStatus===1){
            setLikeCounts(likeCounts-1)
        }
        else if(like===2 && likedStatus===0){
            setDislikeCounts(dislikeCounts-1)
        }
        else if(likedStatus===2){
            if(like===1){
                setLikeCounts(likeCounts+1)
            }
            else if(like===0){
                setDislikeCounts(dislikeCounts+1)
            }
        }
        else if(like !== likedStatus){
            if(like===1){
                setLikeCounts(likeCounts+1)
                setDislikeCounts(dislikeCounts-1)
            }
            else if(like===0){
                setLikeCounts(likeCounts-1)
                setDislikeCounts(dislikeCounts+1)
            }
        }
    }

    const reformatDate = (date) => {
        return date.slice(0, 10)
    }


    if (quiz === undefined) {
        return (
            <div>loading</div>
        )
    }


    return (
        <div>
            <div>
                <NoUserModal show={showModal} continue={true} handleClose={() => setShowModal(false)}></NoUserModal>
            </div>
            <AdminModal showModal={remove} setModal={setRemove} remove={remove} confirm={adminRemoveQuiz} msg={adminRemoveMsg} />
            <AdminModal showModal={block} setModal={setBlock} block={block} confirm={adminBlockQuiz} msg={adminBlockMsg} />
            <div className={classes.bigContainer}>
                <div className={classes.cardContainer}>
                    <div className={classes.userBox}>
                        <div onClick={() => { redirectToProfile(quiz[BODY.USERID]) }} className={`${classes.circle}`}>
                            <div className={classes.userImageSize}>
                                <img alt="user profile" className={classes.userImageSize} src={userImage} />
                            </div>
                        </div>

                        <div className={classes.nameBtnContainer}>
                            <div className={classes.userDisplayName}>
                                {ownerName} . Level {level}
                            </div>

                            {!self && !subscribeStatus && <div onClick={onSubscribe} className={`${classes.subscribeBtn} ${classes.btn} ${classes.colorGreen}`}>Subscribe</div>}
                            {!self && subscribeStatus && <div onClick={unsubscribe} className={`${classes.subscribeBtn} ${classes.btn} ${classes.colorRed}`}>Unsubscribe</div>}
                        </div>
                    </div>

                    <div className={classes.cardSize}>
                        <img className={classes.imgSize} variant="top" src={thumbnail} />
                    </div>
                    <div className={classes.informationBox}>
                        <div className={classes.quizName}>{quiz[BODY.QUIZNAME]}</div>
                        <div className={classes.subtitle}>
                            <span>{quiz[BODY.TAKECOUNTS]} views</span>
                            <span> &#8226; </span>
                            <span>{reformatDate(quiz[BODY.CREATIONTIME])}</span>
                        </div>
                        <div className={classes.subtitleLikes}>
                            <span>{likeCounts} likes</span>
                            <span> &#8226; </span>
                            <span>{dislikeCounts} dislikes</span>
                        </div>
                    </div>
                    <div className={classes.quizDescription}>
                        {quiz[BODY.QUIZDESCRIPTION]}
                    </div>
                    <Button onClick={startQuiz}>Start Quiz</Button>

                    <div className={classes.buttonBar}>
                        {likedStatus === 1 ?
                            <div onClick={() => { changeLikedStatusOnQuiz(2) }} className={`${classes.buttonMargin} ${classes.colorBlue}`}>Like</div> :
                            <div onClick={() => { changeLikedStatusOnQuiz(1) }} className={`${classes.buttonMargin}`}>Like</div>
                        }
                        {
                            likedStatus === 0 ?
                                <div onClick={() => { changeLikedStatusOnQuiz(2) }} className={`${classes.buttonMargin} ${(likedStatus === 0 && classes.colorBlue)}`}>Dislike</div>
                                : <div onClick={() => { changeLikedStatusOnQuiz(0) }} className={`${classes.buttonMargin} ${(likedStatus === 0 && classes.colorBlue)}`}>Dislike</div>
                        }
                        {
                            saveStatus ?
                                <div onClick={removeTakeLater} className={`${classes.buttonMargin} ${classes.colorBlue}`}>Saved Later</div>
                                : <div onClick={takeLater} className={`${classes.buttonMargin}`}>Saved Later</div>
                        }
                    </div>
                    {
                        admin && <div>
                            <div className={classes.buttonBar}>
                                <div className={classes.adminText}>Administraive Operation: </div>
                                {quiz[BODY.ISPUBLISHED] == 2 ? <div onClick={adminUnblockQuiz} className={`${classes.buttonMargin} ${classes.colorGreen}`}>Unblock</div> : <div onClick={() => { setBlock(true) }} className={`${classes.buttonMargin} ${classes.colorRed}`}>Block</div>}
                                <div onClick={() => { setRemove(true) }} className={`${classes.buttonMargin} ${classes.colorRed}`}>Remove</div>
                            </div>
                        </div>
                    }
                </div>
                <div className={classes.relevantBoard}>
                    <div className={classes.relevantText}>More Relevant Quiz</div>
                    <div className={classes.relevantQuizContainer}>
                        {relevant.map((quiz, i) => {
                            return <RecommendListCard key={i} quiz={quiz} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DescriptionBox