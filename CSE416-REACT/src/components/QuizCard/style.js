import { createUseStyles } from "react-jss";

export const userStyles = createUseStyles({

    container:{
    //    display: "flex",
    //    border: "solid",
    //    borderRadius: "10px",
    //    margin: "5px"
        '&:hover':{
            backgroundColor: "whitesmoke"
        }
    },  
    img:{
        height:"20vh",
    },
    quizCardContainer: {
        width: '12.8vw',
        cursor: "pointer",
        margin:20
    },
    imgSize:{
        width:"100%",
        height: "100%"
    },

    cursor:{
        cursor: "pointer"
    },
    titleText:{
        textAlign:"left",
        fontSize:16,
        fontWeight:"bold",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",

    },
    descriptionText:{
        textAlign:"left",
        fontSize:13
    },
    dateText:{
        textAlign:"left",
        fontSize:10
    },
    informationContainer:{
        display: "grid",
        gridTemplateColumns: "50% 50%",
    },
    viewNumberContainer:{
        textAlign:"right",
        fontSize:10
    },
    viewNumberImage:{
        width:"10%"
    }
})