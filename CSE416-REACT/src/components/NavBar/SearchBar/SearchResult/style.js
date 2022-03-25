import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({
    
    searchResultContainer:{
        width: "50%",
        display: "grid",
        gridArea: "main",
        marginTop: "50px",
        cursor: "pointer"
    },

    cardContainer: {
        width: "50%",
        display: "grid",
        gridArea: "main",
        marginTop: "10px",
        cursor: "pointer"
    },

    container: {
        display: "flex",
        flexGrow: "1",
        padding: "1rem",
    }

})