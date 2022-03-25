import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    featureCardContainer: {
        display: "grid",
        gridTemplateColumns: "40% 60%",
        gridTemplateRows: "200px",
        gridTemplateAreas:`
        "description img"
        `,
        width: "70vw",
        // height:"10vw",
        border: "solid",
        marginLeft: "2.5%",
        borderWidth: "2px",
        marginTop: "2.5%",
        borderRadius: "20px"
    },

    description:{
        gridArea: "description",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },

    img:{
        // height:"100%",
    },

    imgSize:{
        width:"100%",
        height: "100%",
        borderRadius: "20px"
    },

    titleName:{
        fontSize:'40px',
        fontWeight:'bold'
    },

    imgContainer:{
        height:'100%',
        gridArea: "img",
    },

    popularTitle:{
        fontFamily: "cursive",
    },

    quizBox: {
        paddingTop: "5%",
        paddingRight: "60%",    
        paddingBottom: "2%"
    },

    quizName: {
        textAlign:"Left",
        marginLeft:"30%",
        fontFamily: "fantasy",
        fontSize:30,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: "300px"
    },

    quizDescription:{
        textAlign:"left",
        marginLeft:"30%",
        fontSize:16,
        fontFamily: "serif",
        width: "200px",
        height: "50px",
        textOverflow: "ellipsis",
        whiteSpace: "pre-wrap",
        overflow: "hidden",
    },
    clickButton:{
        backgroundColor:"#9BAFD8",
        position:"center",
        color:"white",
        textAlign:"Left",
        marginLeft:"30%",
        marginTop:"5%",
        fontSize:15,
        fontWeight:"bold",
        width:90,
        height:30,
        borderRadius:50,
        padding:4,
        cursor: "pointer"
    },

    dotContainer:{
        display: 'flex',
        marginLeft: "35%",
        marginTop: "1.5%"
    },

    dot: {
        height: "10px",
        width: "10px",
        backgroundColor: "white",
        borderRadius: "50%",
        display: "inline-block",
        border: "solid",
        marginLeft: "15px",
        borderWidth: "1px"
      },

      dotted:{
          backgroundColor: "black"
      },

})