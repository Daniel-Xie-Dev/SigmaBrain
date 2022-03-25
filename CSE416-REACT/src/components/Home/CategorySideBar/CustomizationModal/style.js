import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
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

    container: {
        display: "grid",
        gridTemplateColumns: "70% 30%",
    },

    deleteBtn: {
        cursor: "pointer",
        backgroundColor: "red",
        width:"80px",
        color:"white",
        textAlign:"center",
        right:"0px",
        borderRadius:20,
        fontWeight:"bold",
        marginTop:"5px"
    },
    addToList:{
        marginTop:"10px",
        backgroundColor:"#34739C",
        borderRadius:20,
        color:"white",
        width:"140px",
        textAlign:"center",
        fontSize:"20px",
        fontWeight:"bold",
        marginLeft:"6%",
        height:"35px",
        paddingTop:"3px",
        cursor: "pointer"
        
    },
    Update:{
        backgroundColor:"#34739C",
        borderRadius:20,
        color:"white",
        width:"80%",
        marginLeft:"10%",
        textAlign:"center",
        fontSize:"30px",
        fontWeight:"bold",
        marginTop:"5px",
        marginBottom:"5px",
        cursor: "pointer"
    },
    text:{
        fontWeight:"bold",
        marginLeft:"10%"
    },
    AddContainer:{
        display: "grid",
        gridTemplateColumns: "60% 40%",
        marginLeft:"10px"
    }
})