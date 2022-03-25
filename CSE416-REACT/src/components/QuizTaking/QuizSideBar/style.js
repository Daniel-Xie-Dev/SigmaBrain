import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({

    sideBarContainer: {
        borderWidth: "0px 1px 0px 0px",
        height: "100%",
        width: "15vw",
        // marginTop: "50px",
        position: "fixed",
        backgroundColor:"white",
        overflowY: "auto"
    },

    sideBarSelect: {
        paddingTop: "15px"
    },

    buttonSelected: {
        backgroundColor: "#444140",
        color: "#0275d8",
        borderStyle: "solid"
    },

    buttonDefault: {
        color: "white",
        borderStyle: "solid",
        borderRadius: "10px",
    },
})