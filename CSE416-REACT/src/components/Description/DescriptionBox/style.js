import { createUseStyles } from "react-jss"
import { makeStyles } from '@material-ui/core/styles'
import { width } from "@mui/system";

export const useMuiStyles = makeStyles((theme) => ({
    liked: {
      // to make a red delete button
      color: theme.palette.getContrastText(theme.palette.error.main),
      background: theme.palette.error.main,
    }
  }));

export const useStyles = createUseStyles({
    
    boxContainer: {
        backgroundColor: "white",
        minHeight: "50vh",
        maxWidth: "80vw",
        margin: "auto",
    },
    imgSize:{
        width:"100%",
        height: "25vh"
    },
    cardSize:{
        width: "50%",
        height: "50%",
        margin: "auto",
    },
    // cardContainer:{
    //     maxWidth: "60%",
    //     maxHeight: "30%",
    //     backgroundColor: "white",
    //     margin: "auto",
    //     borderRadius: "20px"
    // },
    cardContainer:{
        width: "90%",
        maxHeight: "100%",
        backgroundColor: "white",
        margin: "auto",
        borderRadius: "20px",
        marginLeft: "10%"
    },
    title: {
        marginRight: "100%",
        whiteSpace: "nowrap",
    },
    subtitle: {
        whiteSpace: "nowrap",
        //marginRight: "20%",
        fontSize: "18px",
        paddingBottom:'20px'
    },
    informationBox:{
        paddingLeft:'25%',
        textAlign:'left'
    },
    
    liked:{

    },

    buttonBar:{
        display: "flex",
        marginLeft: "30%",
        marginTop: "5%",
        paddingBottom: "1%"
    },

    buttonMargin:{
        marginRight: "2.5%",
        cursor: "pointer",
        border: "solid",
        borderWidth: "1px",
        borderRadius: "20px",
        width: "100px",
        '&:hover':{
            backgroundColor: "whitesmoke"
        }
    },

    userImageSize:{
        width:"100%",
        height: "100%",
        borderRadius: "50%",
    },
    circle: {
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        borderStyle: "solid",
        marginLeft: "1.5%",
        marginTop: "1%",
        cursor: "pointer"
    },

    userDisplayName:{
        display: "inline-block",
        marginTop: "10%",
        marginLeft: "5%",
        marginBottom: "5%"
    },

    subscribeBtn:{
        marginLeft: "5%",
        border: "solid",
        width: "100%",
        borderWidth: "1px",
        height: "25px",
        marginTop: "5%"
    },

    userBox:{
        // border: "solid",
        width: "100%",
        marginLeft: "40%",
        display: "flex",
        paddingTop: "1%",
        paddingBottom: "2%"
    },

    btn:{
        cursor: "pointer"
    },

    colorRed: {
        color: "red"
    },

    colorGreen: {
        color: "green"
    },

    colorBlue: {
        color: "blue"
    },

    quizName: {
        fontWeight: "bold",
        //textAlign: "left",
        //marginLeft: "27%",
        fontSize: "30px"
    },

    quizDescription: {
        textAlign: "left",
        marginLeft: "25%",
        fontWeight: "lighter",
    },

    nameBtnContainer:{
        height: "10%",
        width: "15%"
    },

    bigContainer:{
        display: "grid",
        gridTemplateColumns: "60% 40%",
        gridTemplateAreas:`
        "quiz recommend"
        `,
        width: "100%"
    },

    relevantBoard:{
        height: "75vh",
        marginLeft: "2.5%",
        width: "65%"
    },

    relevantText:{
        textAlign: "left",
        fontWeight: "bolder",
        fontSize: "24px"
    },
    
    relevantQuizContainer:{
        overflowY: "auto",
        height: "100%",
    },

    adminText:{
        marginRight: "2%",
        fontWeight: "bold"
    },
    subtitleLikes:{

    }
})