import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({
    pageContainer: {
        marginTop: "50px",
        margin: "20%"
    },
    displayBoardContainer: {
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "2.5%",
        marginTop: "2.5%"
    },

    endLine: {
        border: "solid",
        borderWidth: "1px 0px 0px 0px",
        borderColor: "gray",
        marginTop: "5%"
    },

    title:{
        fontWeight: "bold",
        fontSize: "15px",
        paddingTop: "5%",
        textAlign: "left"
    }
})