import { fontWeight } from '@mui/system'
import { createUseStyles } from 'react-jss'

export const userStyles = createUseStyles({
    modal: {
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
    boldSpan:{
        fontWeight:'bold'
    },
    instructions:{
        paddingBottom:'20px'
    },
    inputField: {
        padding: '2px',
        borderWidth: '1px',
        borderStyle: 'solid',
    },
    titleText: {
        paddingLeft: '15px',
        paddingTop: '15px',
        fontSize: '30px',
        fontWeight: 'bold',
        paddingBottom: '10px',
        backgroundColor: '#7FFFD4'
    },
    divider: {
        height: '1px',
        backgroundImage: "linear-gradient(to right, transparent, rgb(48,49,51), transparent)"
    },

    subSection: {
        paddingLeft: '35px',
        paddingTop: '20px',
        paddingBottom: '20px',
        minWidth: "50vw",
    },

    subTitle: {
        textAlign: "left",
        fontSize: "20px"
        // fontFamily: "Serif"
    },

    questionNameField: {
        width: "80%",
        height: "5vh",
        //marginLeft:"10px",
        marginBottom: "10px",
        fontSize: '20px',
        padding: '2px',
        borderWidth: '1px',
        borderStyle: 'solid',


    },

delete: {
    paddingLeft: "1%",
        cursor: "default",
            color: 'red'
},

errorMsg: {
    margin: '0 15px',
        fontSize: '12px',
            color: 'red',
                textAlign: 'left'
},
buttonPosition: {
    display: "flex",
        justifyContent: "right"
},
buttonstyle: {
    backgroundColor: "#9DCADB",
        color: "white",
            width: "90px",
                height: "25px",
                    fontWeight: "bold",
                        textAlign: "center",
                            marginLeft: 10,
                                borderRadius: 20,
                                    marginTop: 10,
                                        marginBottom: 10
},
tableSelector: {
    width: '5%'
},
tableNumber: {
    width: '10%'
},
tableChoices: {
    width: '30%'
},
tableDelete: {
    width: '35%'
}
})