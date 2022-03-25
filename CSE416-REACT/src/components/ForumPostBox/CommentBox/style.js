import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    container: {
        marginTop: "1%",
        //marginLeft:"5%",
        width:"50vw",
        minHeight: "10vh",
        display: "flex",
        backgroundColor:"#E6E6E6"
    },

    commentContainer: {
        // marginLeft: "10%"
        marginRight: "auto",
        width:"45vw",
        textAlign:"left",
        overflowWrap:"break-word",
    },

    userbox:{
        width:"20%"
    },
    namebox:{
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: "80%",
        textAlign: "left",
        fontWeight: "bolder"
    },
    imgSize:{
        width:"30px",
        height: "30px",
        borderRadius: "50%",
    },
    commentTittleContainer:{
        marginLeft:"5px"
    },
    levelbox: {
        textAlign: "left",
        fontSize: "10px"
    }
})