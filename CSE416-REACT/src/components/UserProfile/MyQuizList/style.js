import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    quizListContainer: {
        // border: "solid",
        // marginTop: "1%",
        height: "50vh",
        fontSize:50,
        textAlign:'left',
        fontWeight:"bold"
        
    },
    displayBoardContainer: {
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "2.5%",
    },
})