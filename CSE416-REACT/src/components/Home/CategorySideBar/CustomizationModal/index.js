import { useStyles } from './style'
import { Modal, Box, Typography, Autocomplete, TextField, Button } from '@mui/material'
import { useState, useEffect, useContext } from 'react'
import { QUIZ_CATEGORY_DICT, QUIZ_CATEGORY_NAME } from "../../../../constant/quiz-category"
import HEADER from '../../../../constant/header'
import BODY from '../../../../constant/body'
import AuthContext from '../../../../context/auth-context'
import userApis from '../../../../api/user-api'
const CustomizationModal = ({open, setOpen, bar, loadPreferences})=>{
    const classes = useStyles()
    const [categoryList, setCategoryList] = useState([])
    const [category, setCategory] = useState()
    const [preferences, setPreferences] = useState([])
    const {auth} = useContext(AuthContext)
    useEffect(()=>{
        let categorylist = []
        let preferenceslist = []
        for(var key in QUIZ_CATEGORY_DICT){
            if(QUIZ_CATEGORY_DICT[key]!=0){
                categorylist.push({label: key, value: QUIZ_CATEGORY_DICT[key]})
            }
        }
        for(var i = 1; i < bar.length; i++){
            preferenceslist.push(bar[i]['categoryId'])
        }
        setCategoryList(categorylist)
        setPreferences(preferenceslist)
    }, [bar])

    const onAutoChange = (event, value)=>{
        if(value!=null){
            setCategory(value['value'])
        }
    }

    const addToList = ()=>{
        if(!preferences.includes(category) && preferences.length<10 && category!==undefined){
            let newPreferences = [...preferences]
            newPreferences.push(category)
            setPreferences(newPreferences)
        }
    }

    const removeFromList = (index)=>{
        let newPreferences = [...preferences]
        newPreferences.splice(index, 1)
        setPreferences(newPreferences)
    }

    const updatePreferences = async ()=>{
        if(auth.user!=null && auth.user!==undefined){
            const token = await auth.user.getIdToken()
            let headers = {
                [HEADER.TOKEN] : token
            }
            let payload = {
                [BODY.CATEGORYLIST]: preferences
            }
            await userApis.createPreferenceCateory(payload, headers)
            setOpen(false)
            loadPreferences()
        }
    }

    return(
        <div>
            <Modal
            open={open}
            onClose={()=>{setOpen(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                
                <Box className={classes.modal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Search for other categories
                    </Typography>
                    <div className={classes.AddContainer}>
                        <div>
                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categoryList}
                        isOptionEqualToValue={(option,value)=>option.value===value.value}
                        sx={{ width: 300 }}
                        onChange={onAutoChange}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                        />
                        </div>
                        <div className={classes.addToList}onClick={addToList}>Add To List</div>
                    </div>
                    {preferences.map((v, i)=>{
                        return (
                            <div key={i} className={classes.container}>
                                <div className={classes.text}> {QUIZ_CATEGORY_NAME[v]} </div>
                                <div onClick={()=>{removeFromList(i)}} className={classes.deleteBtn}>delete</div>
                            </div>
                        )
                    })}
                    <div className={classes.Update} onClick={updatePreferences}>Update Preferences List</div>
                </Box>
            </Modal>
        </div>
    )
}


export default CustomizationModal