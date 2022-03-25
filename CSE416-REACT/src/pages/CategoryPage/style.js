import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({

    quizContainer: {
        display: "flex",
        // flexDirection: "column",
        flexWrap: "wrap",
        // width: "80vw",
        gridArea: "quiz",
        // border: "solid"
        // marginTop: "2.5%",
        marginLeft: "15vw",
    },

    pageContainer: {
        marginTop: "50px",
        margin: "20%"
    },


    title: {
        fontWeight: "bold",
        fontSize: "15px",
        paddingTop: "5%",
        textAlign: "left"
    },

    toLeft:{
        textAlign: "left"
    },

    boardContainer:{
        // display: "absolute",
        // marginTop: "7%"
        // width: "80vw"
    }
})