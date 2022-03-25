import { useStyles } from './style'
import { useRef, useContext, useState, useEffect } from 'react'
import BODY from '../../constant/body'
import HEADER from '../../constant/header'
import userApis from '../../api/user-api'
import AuthContext from '../../context/auth-context'
import Button from '@mui/material/Button'
import default_banner from "../../images/default_banner.png"
const UserBanner = (props) => {
    const classes = useStyles()
    const imgRef = useRef()
    const {auth} = useContext(AuthContext)
    const [image, setImage] = useState("")
    const [edit, setEdit] = useState(true)
     
    const clickUpload = ()=>{
        imgRef.current.click()
    }
    const onImageUpload = async (event)=>{
        let url = URL.createObjectURL(event.target.files[0])

        const token = await auth.user.getIdToken()
        let headers = {
            [HEADER.TOKEN] : token
        }
        let config = {
            headers: headers
        }

        const data = new FormData()
        data.append(BODY.USERPROFILE_IMAGE_TYPE, BODY.BACKGROUNDIMAGE)
        data.append(BODY.USERPROFILE, event.target.files[0])
        await userApis.setBackgroundImage(data, config)
        setImage(url)
    }


    useEffect(()=>{
        const loadImage = async()=>{
            try{
                let response = await userApis.getBackgroundImage(props.userId)
                if(response.data==null || response.data==""){
                    setImage(default_banner)
                    return
                }
                setImage(response.data)
            }catch(e){
                setImage(default_banner)
            }

        }
        
        if(props.self!==undefined){
            setEdit(props.self)
        }
        loadImage()
    }, [props.userId, props.self])

    if(!props.self){
        return(
            <div className={classes.bannerContainer}>
                <img className={classes.imgSize} src={image} alt="background"/>
            </div>
        )
    }
    return(
        <div>
            <div className={classes.bannerContainer}>
                <input type="file" name="image" id="image" ref={imgRef} onChange={onImageUpload} className={classes.imgTag}/>
                <img className={classes.imgSize} src={image} alt="background"/>
            </div>
            {edit && <Button className={classes.uploadBtn} onClick={clickUpload}>Change Background Image</Button>}
        </div>

    )
}

export default UserBanner