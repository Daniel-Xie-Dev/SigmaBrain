import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    container: {
        backgroundColor: "whitesmoke",
        maxWidth: "80vw",   
        margin: "auto",
        marginTop: "20px"
    },
    commentTextBox: {
        minHeight: "20vh",
        minWidth: "60vw",
        resize: "none"
    },

    userComments: {
        paddingTop: "20px",
        marginTop: "20px",
        minHeight: "50vh",
        
    },

    commentTitle:{
        marginRight: "80%",
        fontSize: "30px",
        fontWeight: "lighter"
    },

    commentInputContainer:{
        width: "80%",
        margin: "auto"
    },

    commentBtn:{
        paddingLeft: "80%"
    },

    line:{
        border: "solid",
        borderWidth: "0px 0px 2px 0px",
        marginTop: "2.5%",
        width: "77%",
        margin: "auto",
        borderColor: "gray"
    },

})