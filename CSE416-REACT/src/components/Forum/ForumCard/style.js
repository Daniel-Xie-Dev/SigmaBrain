import { borderRadius, height } from '@mui/system'
import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({
    container:{
        cursor: "pointer",
        width: "90%",
        margin: "auto",
        backgroundColor: "#f5f5f5",
        marginTop: "2%",
        padding:10
    },

    Block_Background:{
        width:"96%",
        borderRadius:10,
        backgroundColor: "#E6E6E6",
        marginLeft: '2%',
        marginRight: '2%',
    },
    gray_box:{
        height:'70px',
        backgroundColor:'#cfcfcf',
    
        fontSize:'30px'
        
    },
    white_box:{
        weight:'70%',
        width:"98%",
        backgroundColor:'#ffffff',
        fontSize:'20px',
        textAlign:"Left",
        borderRadius:10,
        overflowWrap:"break-word",
        marginLeft:"1%",
    },
    infoGrid:{
        display:"grid",
        width:"40%",
        gridTemplateColumns:"30% auto",
        textAlign:"left",
        left:0

    },
    UserName:{
        fontWeight:"bold"
    },
    DateText:{
        fontSize:10
    },
    imageStyle:{
        boxSizing:3,
        borderRadius:"50%",
        width: "50px",
        height: "50px",
    },
    titleText:{
        fontSize:30,
        textAlign:"left",
        fontWeight:"bold"
    },
    imgSize:{
        height: "100%",
        width: "100%",
        borderRadius: "20px"
    },
    top10:{
        borderRadius: '25px',
        background: '#FFDF4F',
        textAlign:'center'
    },
    top10Container:{
        width:"35%"
    }

})