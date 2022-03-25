import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    modal:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        height: "70%",
        width: "80%",
        // margin: "auto",
        // display: "flex"
    },

    quizContainer: {
        display: "flex",
        // flexDirection: "column",
        flexWrap: "wrap",
        // width: "80vw",
        marginLeft: "2.5%",
        gridArea: "quiz",
        // border: "solid"
        overflow: "auto",
        maxHeight: "100%"
    },

})