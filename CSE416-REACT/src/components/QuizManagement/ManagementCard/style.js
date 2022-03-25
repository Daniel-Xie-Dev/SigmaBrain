import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    quizContainer:{
        display: "flex",
        marginBottom: "2%",
        cursor: "pointer",
        '&:hover':{
            backgroundColor: "whitesmoke"
        }
    },


    imgSize:{
        width: "200px",
        height: "150px",
    },

    imgContainer:{
        marginLeft: "5%",
    },

    nameContainer:{
        marginLeft: "5%",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        marginTop: "15%"
    }
})