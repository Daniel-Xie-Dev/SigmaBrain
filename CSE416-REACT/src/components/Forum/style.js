import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({

    homeContainer: {
        marginTop: "50px",
        height: "80vh"
    },

    postContainer: {
        minHeight: "50vh",
        // border: "solid",
        width: "100%",
        margin: "auto",
        overflowY: "auto",
        // height: "70vh",
        borderWidth: "2px",
        borderRadius: "20px",
        marginBottom: "5%"
    },

    forumContainer:{
        display: "grid",
        gridTemplateColumns: "70% 30%",
    },
})