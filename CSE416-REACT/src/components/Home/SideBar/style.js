import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({
    sideBarContainer: {
        borderStyle: "solid",
        borderWidth: "0px 1px 0px 0px",
        height: "100%",
        width: "15vw",
        // marginTop: "50px",
        position: "fixed",
        overflowY: "auto",
    },

    sideBarSelection: {
        borderStyle: "solid",
        borderWidth: "0px 0px 1px 0px",
    },

    sideBarSelect: {
        paddingTop: "10px",
        paddingLeft:"17px",
        textAlign:"left",
        lineHeight:"200%",
        cursor: "pointer",
        '&:hover':{
            backgroundColor: "whitesmoke"
        }
    },

    subscriptionTop: {
        textAlign: "left",
        paddingTop: "10px",
        // overflowY: "auto",
        // height: "50vh"
    },
    image_setting:{
        width:'19px',
    },
    container:{

    },

    settingBar:{
        height: "30vh"
    },

    title:{
        fontWeight: "bold",
        paddingLeft: "2%"
    }
})