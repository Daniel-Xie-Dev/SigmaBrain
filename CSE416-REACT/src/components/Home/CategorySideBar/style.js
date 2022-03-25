import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    fixOnRight: {
        position: "fixed",
        right: 20,
        top: "25%",
    },

    sidebarContainer:{
        minHeight: "50vh",
        border: "solid",
        borderWidth: "1px",
        borderRadius: "20px",
        width: "10vw"
    },

    item: {
        cursor: "pointer",
        borderRadius:'25px',
        borderWidth:'thin',
        lineHeight:"200%",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        '&:hover':{
            backgroundColor: "whitesmoke"
        }
    },

    openBtn:{
        cursor:"pointer",
    }

    
})