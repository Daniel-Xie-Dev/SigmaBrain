import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({
    
    searchBarContainer:{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "90% 10%",
        gridTemplateRows: "40px",
        paddingRight: "50px",
        marginLeft: "25%"
        
    },

    searchBar:{
        width: "100%",
        borderRadius: '0px',
        paddingLeft: '12px',
        outline: 'none'
        
    },

    searchResult:{
        position: "absolute",
        marginTop: "3%",
        backgroundColor: "white",
        boxShadow: "1px 1px 10px gray",
        width: "40%"
    },

    resultBox: {
        cursor: "pointer",
        border: "solid",
        background: "white",
        borderStyle: "none none none none",
        display: "flex"

    },

    resultText: {
        textAlign: "left",
        float: "right",
        clear: "both",
        display: "inline-block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        borderRadius:"10px 0px 0px 10px",
        outline:'none',
        paddingLeft: "2.5%",
        paddingTop: "2.5%",
        '&:hover':{
            backgroundColor: "whitesmoke"
        }
    },
    buttonBar:{
        borderRadius: "15px",
        backgroundColor:"#B1D2D4",
        color:'black',
        marginLeft: "-50px",
        fontWeight: "bold"

    }

})