
import { useStyles } from './style'
import { QUIZ_CATEGORY_NAME } from '../../../constant/quiz-category'
import { useState, useContext } from 'react'
import { Button } from '@mui/material'
import CustomizationModal from './CustomizationModal'
import AuthContext from '../../../context/auth-context'
import NoUserModal from '../../NoUserModal'
const CatgeorySideBar = ({bar, refs, loadPreferences})=>{
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    // const [openSidebar, setOpenSidebar] = useState(false)
    // const [showModal, setShowModal] = useState(false);
    const {auth} = useContext(AuthContext)
    const scroll = (i)=>{
        refs[i].current.scrollIntoView({block:"center"})
    }

    const openCustomizationModal = ()=>{
        if(!auth.loggedIn){
            // setShowModal(true)
            return
        }
        setOpen(true)
    }

    return(
        <div className={classes.fixOnRight}>
            {/* <div className={classes.openBtn}>{openSidebar?"Close Sidebar":"Open Sidebar"}</div> */}
            {<div className={classes.sidebarContainer}>
                {bar.map((category,i)=>{
                    return <div className={classes.item} key={i} onClick={()=>{scroll(i)}} title={QUIZ_CATEGORY_NAME[category['categoryId']]}>{QUIZ_CATEGORY_NAME[category['categoryId']]}</div>
                })}
                {auth.loggedIn && 
                <div >
                    <Button onClick={openCustomizationModal}>Customize</Button>
                </div>
                }  
            </div>}

            <CustomizationModal
                open={open}
                setOpen={setOpen}
                bar={bar}
                loadPreferences={loadPreferences}/>
            {/* <div>
                <NoUserModal show={showModal} continue={true} handleClose={() => setShowModal(false)}></NoUserModal>
            </div> */}
        </div>
    )
}

export default CatgeorySideBar