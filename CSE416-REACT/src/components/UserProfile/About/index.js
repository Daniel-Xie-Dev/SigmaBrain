import { useEffect, useState, useContext } from 'react'
import userApis from '../../../api/user-api'
import { useParams } from 'react-router-dom'
import BODY from '../../../constant/body'
import HEADER from '../../../constant/header'
import { useStyles } from './style'
import AuthContext from '../../../context/auth-context'
import {Button} from '@mui/material'
const About = ({ self }) => {
    //sets the character limit in the about me page
    const CHARACTER_LIMIT = 500

    const { auth } = useContext(AuthContext)
    const { userId } = useParams()

    const [isEditing, setIsEditing] = useState(false)
    const classes = useStyles()

    const [about, setAbout] = useState("")
    const [editAbout, setEditAbout] = useState("")

    useEffect(() => {
        const loadAbout = async () => {
            try {
                let response = await userApis.getUserDescription(userId)
                setAbout(response.data[BODY.USERDESCRIPTION])
            } catch (e) {

            }
        }

        loadAbout()
    }, [userId])


    const updateAboutMe = async () => {
        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN]: token
        }
        let config = {
            headers: headers
        }
        let payload = {
            [BODY.USERDESCRIPTION]: editAbout
        }
        setAbout(editAbout)
        await userApis.setUserDescription(payload, config)
    }

    const handleSubmit = async () => {
        updateAboutMe()
        setIsEditing(false)
    }

    return (
        self ?
            <div>
                <div className={classes.Container}>
                    <div className={classes.aboutText}>About Me!</div>
                    <div className={classes.ButtonStyle} onClick={() => setIsEditing(!isEditing)}>{isEditing ? "cancel" : "edit"}</div>
                    <div className={classes.ButtonStyle} onClick={() => handleSubmit()}>submit</div>
                </div>
                {isEditing ?
                    <textarea className={classes.editContainer} defaultValue={about} onChange={e => setEditAbout(e.target.value)} />
                    :
                    <div className={classes.aboutContainer}>{about}</div>
                }


            </div>
            :
            <div>
                <div>About Me!</div>
                <div className={classes.aboutContainer}>{about}</div>
            </div>
    )
}

export default About