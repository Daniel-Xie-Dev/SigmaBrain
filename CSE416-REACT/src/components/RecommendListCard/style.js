import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    imgSzie:{
        width: "50%",
        height: "100%",
    },
    cardSize:{
        width: "20rem",
        border: "solid",
        marginBottom: "2%",
        cursor: "pointer",
        '&:hover':{
            backgroundColor: "whitesmoke"
        }
    },
    cardText:{
        // fontWeight: "bold",
        fontSize: "16px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textAlign: "left",
        width: "80%"
    },

    quizInfo:{
        fontSize: "10px",
        marginBottom: "auto",
        textAlign: "left"
    }
    
})
