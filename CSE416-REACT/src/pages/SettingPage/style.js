import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    container: {
        marginTop: "50px"
    },
    text_input:{ //or your class 
        width: "30%",
        display: "inline-block",
        marginRight:"20px" // to set some margin in the right
     },

     inputField:{
        display: "inline-block",
        width: "130px"
     },

     nameField:{
         display: "inline-block",
         width: "150px"
     },

     btn:{
         cursor: "pointer",
         backgroundColor:"#9DCADB",
         color:"white",
         borderRadius:20,
         width:"25%",
         textAlign:"center"
     },

     changePasswordContainer:{
         width: "50vw",
         margin: "auto",
         textAlign:"left",
        marginLeft:"20%"
     },
     
     modal:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        minHeight: "50vh",
        minWidth: "50vw"
    },
    TitleText:{
        fontSize:"30px",
        textAlign:"left",
        marginLeft:"10%",
        marginBottom:"2%",
        fontWeight:"bold"
    },
    Nametext:{
        textAlign:"left",
        marginLeft:"20%"
    },
    subTitle:{
        fontSize:"25px",
        textAlign:"left",
        marginLeft:"15%",
        fontFamily:"Monospace",
        fontWeight:"bold"
    },
    lowContainer:{
        marginBottom:"1%"
    }
})