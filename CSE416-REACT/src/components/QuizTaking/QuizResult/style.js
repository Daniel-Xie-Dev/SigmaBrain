import { createUseStyles } from "react-jss";

export const userStyles = createUseStyles({
    
    questionCardcontainer:{
        overflowY: "auto",
        height: "55vh",
    },

    congratualtionCardContainer: {
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#ffffff',
        marginBlock: '20px'
    },

    resultCorrectCardContainer: {
        width: '30vw',
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#5cb85c',
        marginBlock: '10px'
    },

    resultWrongtCardContainer: {
        width: '30vw',
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#d9534f',
        marginBlock: '10px'
    },

    resultNoSelectionCardContainer: {
        width: '30vw',
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#f0ad4e',
        marginBlock: '10px'
    },
    titleFont: {
        fontSize: '50px'
    },

    quizTextFont: {
        fontSize: '25px'
    },

    buttonMargin: {
        margin: '5px',
       
    },
    buttonContainer:{
        display: "grid",
        gridTemplateColumns: "50% 50%",
    },
    optionButton:{
        backgroundColor:"#417CA2",
        width:"150px",
        height:"30px",
        color:"white",
        borderRadius:10,
        textAlign:"center",
        cursor: "pointer"
    }
})