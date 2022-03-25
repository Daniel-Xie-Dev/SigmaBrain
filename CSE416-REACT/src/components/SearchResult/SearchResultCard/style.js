import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    searchResultContainer:{
        width: "100%",
        display: "flex",
        paddingTop: "5%",
        cursor: "pointer",
    },

    imgSize:{
        width:"100%",
        height: "100%"
    },

    imgContainer:{
        width: "20vw",
        height: "25vh"
    },

    cardContainer: {
        width: "100vh",
        // display: "grid",
        gridArea: "main",
        marginTop: "10px",
        cursor: "pointer",
        paddingRight: "50%"
    },
})