import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    container:{
    },
    userContainer:{
        display: "grid",
        gridTemplateColumns: "10% 70% 20%",
        gridTemplateAreas:`
        "img username btn"
        `,
        marginTop: "5%",
        paddingBottom: "2.5%",
        border: "solid",
        borderWidth: "0px 0px 1px 0px",
        borderColor: "gray"
    },

    userName:{
        textAlign: "left",
        fontSize: "20px",
        fontWeight: "lighter"
    },

    imgSize:{
        width: "50px",
        height: "50px",
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

    
})