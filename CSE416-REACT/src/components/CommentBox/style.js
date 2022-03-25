import { createUseStyles } from "react-jss"
export const useStyles = createUseStyles({
    toRight:{
        marginRight: "auto",
        
    },
    commentBox:{
        marginTop: "10px",
        width: "70%",
        margin: "auto",
        background: "white",
        display: "flex"
    },

    comment:{
        paddingLeft: "2%",
        width: "50vw",
        marginRight: "100%",
        textAlign: "left"
    },

    imgSize:{
        width: "100%",
        height: "100%",
        borderRadius: "20px"
    },
    circle: {
        width: "35px",
        height: "35px",
    },
    name: {
        marginLeft: "1%",
        textAlign: "left",
        fontWeight: "bold"
    }
})