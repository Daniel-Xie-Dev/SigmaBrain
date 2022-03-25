import { createUseStyles } from 'react-jss'


export const useStyles = createUseStyles({

    pageContainer:{
        backgroundColor:"whitesmoke",
        width: "100%",
        height: "100%",
    },

    descriptionBox:{
        paddingTop: "100px",
    },

    line:{
        border: "solid",
        borderWidth: "0px 0px 2px 0px",
        marginTop: "4.5%",
        width: "60%",
        margin: "auto",
        borderColor: "gray"
    }
})