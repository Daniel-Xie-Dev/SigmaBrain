import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({

    titleBox: {
        //border: "solid",
        //borderWidth:"2px",
        width: "100vw",
        //height: "10vh",
        margin: "auto",
        paddingRight: "40%",
        marginBottom: "1%",
        fontSize:24,
        borderRadius:10
    },

    commentsContainer: {
        border: "solid",
        borderWidth:"0.5px",
        height: "25vh",
        width: "50vw",
        margin: "auto",
        marginBottom: "1%",
        overflowY: "auto",
        borderRadius:10
    },

    commentInputBox: {
        width: "50vw",
        border: "solid",
        height: "10vh",
        borderWidth:"0.5px",
        resize: "none",
        borderRadius:10,
        marginTop: "2.5%"
    },
    forumContainer:{
        width:"80vw",
    },
    commentBox:{
        backgroundColor:"#E6E6E6"
    },
    postContainer:{
        width:"40vw",
        marginLeft:"60px",
        overflowWrap:"break-word",
        textAlign:"left"
    },
    buttonStyle:{
        color:"white",
        width:"60px",
        textAlign:"right",
        backgroundColor:"#9DCADB"
    },
    commentsContainer2: {
        //border: "solid",
        //borderWidth:"0.5px",
        // height: "70vh",
        width: "50vw",
        margin: "auto",
        marginBottom: "5%",
        // overflowY: "auto",
        borderRadius:10,
    },

    ownerBox:{
        display: "flex",
        marginLeft: "19%"
    },

    imgSize:{
        height: "50px",
        width: "50px",
        borderRadius: "20px"
    },

    ownerName:{
        marginLeft: "2%",
        fontSize: "18px"
    },

    line:{
        border: "solid",
        borderWidth: "0px 0px 1px 0px",
        marginTop: "2.5%",
        width: "80%",
        margin: "auto",
        borderColor: "black"
    },

    btn:{
        border: "solid",
        height: "35px",
        width: "80px",
        borderRadius: "20px",
        cursor: "pointer",
        borderColor: "gray",
        borderWidth: "1px",
        marginLeft: "18%",
        marginBottom: "2.5%"
        
    },

    btnText: {
        textAlign: "center",
        margin: "auto",
        paddingTop: "5%",
        color: "gray"
    },
})