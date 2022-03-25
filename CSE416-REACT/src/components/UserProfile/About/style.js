import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    aboutContainer:{
        textAlign: "left",
        height: "50vh",
        marginTop:"3%",
        fontSize:"20px",
    },

    editContainer:{
        textAlign: "left",
        height: "50vh",
        width: "100%",
        border:"solid",
        borderWidth:"2px",
        marginTop:"5%",

    },

    aboutText:{
        fontSize:50,
        textAlign:'left',
        fontWeight:"bold",

    },
    Container:{
        display:'grid',
        gridTemplateColumns:'60% 20% 20%',
        width: '95%',
        border: "solid",
        borderWidth: "0px 0px 2px 0px"
    },
    ButtonStyle:{
        height:"35px",
        backgroundColor:"#34739C",
        marginTop:"20%",
        color:"white",
        fontWeight:"bold",
        marginLeft:"10%",
        borderRadius:20,
        fontSize:"20px",
        
    }
})