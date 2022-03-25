import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    container:{
        // marginTop: "10%"
    },

    subsection: {
        border: "solid",
        width: "80vw",
        borderWidth: "0px 0px 1px 0px",
        paddingTop: '8%',
        fontWeight: "bold",
        fontSize: "30px"
    },

    subsection2: {
        border: "solid",
        width: "80vw",
        borderWidth: "0px 0px 1px 0px",
        paddingTop: '2.5%',
    },

    flex:{
        display: "flex"
    },

    marginLeft:{
        marginLeft: "10%"
    },

    selection:{
        cursor: "pointer",
        fontSize: "20px",
        '&:hover':{
            backgroundColor: "whitesmoke"
        }
    },

    selectColor:{
        color: "gray"
    }
})