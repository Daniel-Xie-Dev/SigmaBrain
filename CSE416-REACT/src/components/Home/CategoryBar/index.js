import { useStyles } from './style';
import QUIZ_CATEGORY from '../../../constant/quiz-category';
import { QUIZ_CATEGORY_NAME, QUIZ_CATEGORY_DICT } from "../../../constant/quiz-category"
import { useState, useEffect } from 'react'
import { Modal, Box, Typography, Autocomplete, TextField, Button } from '@mui/material'
import { useHistory } from 'react-router-dom'

const CategoryBar = ({bar}) =>{
    const classes  = useStyles()
    const [categoryBar, setCategoryBar] = useState([QUIZ_CATEGORY.ALL])
    const [categoryList, setCategoryList] = useState([])
    const [category, setCategory] = useState()
    const [open, setOpen] = useState(false)
    const history = useHistory()
    const onAutoChange = (event, value)=>{
        if(value!=null){
            setCategory(value['value'])
        }
    }

    const onSearch = ()=>{
        console.log("searching", category)
        history.push(`/category/${category}`)
        setOpen(false)
    }

    const openSearch = ()=>{
        setOpen(true)
    }

    const redirectToCategoryPage = (categoryId) => {
        history.push(`/category/${categoryId}`)
    }

    useEffect(()=>{
        const loadBar = ()=>{
            let newCategoryBar = []
            for(var i = 0; i < bar.length; i++){
                newCategoryBar.push(bar[i]["categoryId"])
            }
            setCategoryBar(newCategoryBar)
        }
        let categorylist = []
        for(var key in QUIZ_CATEGORY_DICT){
            categorylist.push({label: key, value: QUIZ_CATEGORY_DICT[key]})
        }
        setCategoryList(categorylist)
        loadBar()
    },[bar])
    return(
        <div className={classes.categoryBarContainer}>
            {
                categoryBar.map((categoryBar,i)=>{
                    return (
                    <div key={i} onClick={()=>{redirectToCategoryPage(categoryBar)}} className={classes.categoryBox}>
                        {QUIZ_CATEGORY_NAME[categoryBar]}
                    </div>
                    )
                })
            }

            <div onClick={openSearch} className={classes.categoryBox}>
                ...
            </div>
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
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categoryList}
                        isOptionEqualToValue={(option,value)=>option.value===value.value}
                        sx={{ width: 300 }}
                        onChange={onAutoChange}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                    />
                    <div className={classes.searchType} onClick={onSearch}>Search</div>
                </Box>
            </Modal>
        </div>
    )

}

export default CategoryBar