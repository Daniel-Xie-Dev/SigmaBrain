import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({

    container:{
        // gridTemplateColumns: "40% 60%",
        // gridTemplateAreas: "image text",
        display: "flex",
        width: "20vw",
        paddingTop: "20px",
        '&:hover':{
            backgroundColor: "whitesmoke"
        }
    },

    text:{
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        paddingLeft: "10px",
        textAlign: "left",
    },

    imgSize:{
        width:"100%",
        height: "100%"
    },

    topQuizName:{
        paddingLeft: "5%",
        width: "10vw",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textAlign: "left"
    },

    topQuizText:{
        textOverflow: "ellipsis",
        overflow: "hidden",
    },

    imgContainer:{
        width: "5vw",
        height: "5vh",
        paddingLeft: "5%"
    },
})