import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    container:{
        display: "grid",
        gridTemplateColumns: "30% 70%",
        gridTemplateAreas:`
        "img descriptio "
        `,
        marginTop: "5%",
        paddingBottom: "2.5%",
        border: "solid",
        borderWidth: "1px 0px 0px 0px",
        borderColor: "gray",
        cursor: "pointer",
        '&:hover':{
            backgroundColor: "whitesmoke"
        }
    },

    quizName:{
        textAlign: "left",
        marginLeft: "5%",
        fontSize: "30px",
        fontWeight: "bold"
    },

    imgSize:{
        width: "250px",
        height: "150px",
    },
    subtitle: {
        whiteSpace: "nowrap",
        fontSize: "12px",
        textAlign: "left",
        marginLeft: "5%",
        color: "gray"
    },
    quizDescription:{
        textAlign: "left",
        marginLeft: "5%"
    },
})