import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({
    quizContainer: {
        display: "flex",
        // flexDirection: "column",
        flexWrap: "wrap",
        // width: "80vw",
        marginLeft: "3.75%",
        gridArea: "quiz"
        // border: "solid"
    },

    rankContainer: {
        gridArea: "ranking",
        marginRight:"100%"
    },

    RankingsText:{
        fontSize:"25px",
        fontWeight:"bold"
    },
    headerContainer: {
        gridArea: "header",
        border: "solid",
        borderWidth: "0px 0px 1px 0px",
        marginLeft: "1%",
        display: "flex"
    },

    title: {
        textAlign: "left",
        marginLeft: "2.4%",
        fontSize:"26px",
        fontWeight:"bold"
    },

    displayBoardContainer: {
        display: "grid",
        gridTemplateColumns: "60% 40%",
        gridTemplateRows: "auto",
        gridTemplateAreas:`
        "header ."
        "quiz ranking"
        `,
        width: "85vw",
        marginTop: "4%",
        columnGap: "5%",

    },

    noQuizContainer:{
        width: "60%"
    },

    card:{
        cursor: "pointer",
        //fontSize:10
    },

    btn:{
        marginLeft: "auto"
    },

    btnDesign:{
        border: "solid",
        height: "20px",
        width: "50px",
        cursor: "pointer",
        borderColor: "gray",
        borderWidth: "1px",
        '&:hover':{
            backgroundColor: "whitesmoke"
        },
        marginRight: "2.5%",
        marginTop: "2%"
    },

    btnText:{
        textAlign: "center",
        margin: "auto",
        paddingTop: "5%",
        color: "gray",
        fontSize: "12px"
    }
    
})