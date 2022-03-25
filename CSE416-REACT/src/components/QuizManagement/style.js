import { createUseStyles } from 'react-jss'

const cellSize = { width: "30%", height: "30%" }
const backgroundColor = {backgroundColor: "white"}

export const useStyles = createUseStyles({
    profileContainer: {
        marginTop: "5%",
        border: "solid",
        borderWidth: "0px 0px 1px 0px",
    },
    homeContainer: {
        marginTop: "50px"
    },
    quizContainer: {
        border: "solid",
        marginTop: "15%",
        height: "10vh",
        borderWidth: "0px 0px 1px 0px",
        display: "grid",
        gridTemplateColumns: "60% 40%",
        gridTemplateRows: "auto",
        gridTemplateAreas: `
        "quizImg description"
        `,
    },
    title: {
        gridArea: "title",
        fontFamily: "serif",
        fontSize: "30px",
        paddingLeft: "70px",
        paddingTop: "5px"
    },
    back: {
        gridArea: "back"
    },
    th: {
        padding: '15px',
        textAlign: 'left'
    },
    cell:{
        width: "30%", height: "30%"
    },
    quizSelector:{
        width: "5%", 
        height: "30%",
        alignItems:"center"
    },
    quizAll:{
        width: "50%", height: "30%"
    },
    quizStatusHeading:{
        width: "10%", height: "30%"
    },
    quizDateHeading:{
        width: "10%", height: "30%"
    },
    quizView:{
        width: "5%", height: "30%"
    },
    quizPublishBtn:{
        width: "10%", height: "30%"
    },
    
    btn: {
        cursor: "pointer",
        fontSize: "20px",
        '&:hover': {
            backgroundColor: "whitesmoke"
        }
    },

    managementContainer: {
        marginLeft: "10%"
    },

    colorGreen: {
        color: 'green'
    },
    colorYellow: {
        color: 'orange'
    },
    colorRed: {
        color: "red"
    },
    titleBar: {
        paddingRight: "100%",
        whiteSpace: "nowrap",
        width: "100%",
        height: "8vh",
        ...backgroundColor
    },

    consoleContainer: {
        width: "100%",
        height: "100%",
        ...backgroundColor
    },

    consoleBarContainer: {
        display: 'grid',
        gridTemplateColumns: "80% 20%",
        // border: "solid",
        height: "9vh",
        // borderWidth: "0px 0px 1px 0px",
        // display: "grid",
        // gridTemplateAreas:`
        // "filter button"
        // `,
        //position: "fixed",
        //left: "30%",
        // borderWidth: "2px 2px 2px 0px",
        // border: "solid",
        //  zIndex: "-1",
        ...backgroundColor
    },

    buttonContainer: {
        //marginLeft: '850px',
        display: 'grid',
        gridTemplateColumns: "50% 50%"
    },

    rowContainer: {
        border: "solid",
        marginLeft: "5px",
        marginRight: "5px",
        marginBottom: "5px",
        borderWidth: "0px 0px 1px 0px",
        borderColor: "gray",
    },
    image_setting: {
        width: '50px'
    },

    iconBox: {
        cursor: 'pointer',
        marginTop: '5%',
        //marginBottom: "50%",
        '&:hover': {
            backgroundColor: "whitesmoke"
        }
    }

})