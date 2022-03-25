import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    quizContainer: {
        display: "flex",
        // flexDirection: "column",
        flexWrap: "wrap",
        // width: "80vw",
        marginLeft: "2.5%",
        gridArea: "quiz"
        // border: "solid"
    },

    rankContainer: {
        gridArea: "ranking"
    },

    headerContainer: {
        gridArea: "header"
    },

    title: {
        textAlign: "left",
        marginLeft: "2.5%",
        fontSize:50,
        fontWeight:"bold"
    },

    displayBoardContainer: {
        display: "grid",
        gridTemplateColumns: "80% 10%",
        gridTemplateRows: "auto",
        gridTemplateAreas:`
        "header ."
        "quiz ranking"
        `,
        width: "85vw",
        marginTop: "5%"
    },

    card:{
        cursor: "pointer"
    }
})