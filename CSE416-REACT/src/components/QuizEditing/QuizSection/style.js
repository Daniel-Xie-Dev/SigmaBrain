import { createUseStyles } from "react-jss";
const titlePadding = '20px'
const borderColors = '#000000'
export const useStyles = createUseStyles({
    centerContainer:{
        alignItems:'center',
        paddingLeft:'20%',
        paddingRight:'20%',
        
    },
    creationCardContainer: {
        width: '50vw',
        height: '100%',
        // display:' flex',
        // flexWrap: 'wrap',
        alignItems: 'center',
        backgroundColor:"white",
        // overflowY: "auto"
    },
    divider:{
        height:'1px',
        backgroundImage:"linear-gradient(to right, transparent, rgb(48,49,51), transparent)"
    },
    paddingTopAndBottom: {
        paddingBottom: "5%",
        paddingTop: '5%',
    },
    creationCardTitleSize: {
        fontSize: '30px'
    },

    inputContainer: {
        display: 'flex',
        textAlign: "center",
        color: "black",
        border: '0px',
        fontSize: '25px',
        backgroundColor: "white",
        marginTop: '5px',
        marginBottom: '3px',
        flexWrap: 'flexwrap',

    },

    imageContainer: {
        width: '220px',
        height: '220px',
        marginTop: '20px',
        objectFit: 'cover'
    },

    title: {
        display: "flex",
        
        width: "50vw",
        borderWidth: "0px 0px 4px 0px",
        borderColor: "black",
        justifyContent: "space-between",
        paddingTop: '5%',
        paddingBottom: "1%",
    },

    titleText:{
        fontFamily: "serif",
        fontSize: "30px",
        paddingLeft: titlePadding
    },

    quizName: {
        
        width: "50vw",
        
        paddingTop: '20px',
        paddingBottom: '30px',
        borderColor: borderColors,
    },

    cover:{
        
        width: "50vw",
        height: "50vh",
        
        paddingTop: '20px',
        borderColor: borderColors,
    },

    subTitle:{
        textAlign: "left",
        paddingLeft: "1%",
        fontSize: "20px",
        fontWeight: "lighter",
        paddingLeft: titlePadding,
        paddingBottom: '20px'
        // fontFamily: "Serif"
    },

    introduction: {
        
        width: "50vw",
        
        borderColor: borderColors,
        height: "35vh",
        paddingTop: '20px',
        paddingBottom:'20px'
    },

    timeLimit: {
        
        width: "50vw",
        
        height: "18vh",
        borderColor: borderColors,
        paddingTop: '20px',
    },

    toRight: {
        float: 'right',
        paddingTop:'20px',
        paddingBottom: '30px'
    },

    toLeft: {
        float: 'left'
    },

    introductionBox: {
        width: "90%",
        height: "20vh",
        resize: "none",
        borderRadius: "20px",
        borderColor: "gray",
        backgroundColor: "whitesmoke"
    },

    imgTag:{
        display: "none"
    },

    imgSize:{
        width:"50%",
        height: "50%"
    },
    
    btn:{
        cursor: "pointer",
        borderColor: "#7FFFD4",
        borderWidth: "2px",
        paddingRight: titlePadding
    },

    btnText: {
        border: "solid",
        height: "35px",
        width: "80px",
        borderRadius: "20px",
        textAlign: "center",
        fontWeight:'bold',
        margin: "auto",
        color: "#006400"
    },

    quizNameField: {
        width: "40vw",
        borderRadius: "20px",
        height: "40px",
        backgroundColor: "whitesmoke",
        textAlign: "center"
    },

    plusContainer:{
        border: "solid",
        height: "150px",
        width: "200px",
        margin: "auto",
        borderRadius: "20px",
        cursor: "pointer",
        marginTop: "2.5%",
        borderColor: "gray"
    },

    plus: {
        textAlign: "center",
        margin: "auto",
        paddingTop: "25%",
        color: "gray",
        fontSize: "30px"
    },

    imgContainer:{
        width: "50vw",
        height: "50vh",
        marginTop: "2%"
    },

    toCenter: {
        margin: "auto",
        marginBottom: "2%"
    },

    flexBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    unit: {
        marginLeft: "0.5%",
        fontWeight: "lighter"
    },

    timeBox: {
        width: "20%",
        resize: "none",
        borderRadius: "20px",
        borderColor: "gray",
        backgroundColor: "whitesmoke",
        textAlign: "center"
    },

    quizCategory: {
        
        width: "100%",
        
        borderColor: borderColors,
        height: "23vh",
        paddingTop: '20px',
    },

    questionContainer:{
        
        width: "50vw",
        
        borderColor: borderColors,
        minHeight: "23vh",
        paddingTop: '20px',
    },

    checkboxPadding:{
        margin: "auto",
        display: "grid",
        gridTemplateColumns:'10% 60% 15% 15%'
    },

    checkboxPaddingHeader:{
        margin: "auto",
        display: "grid",
        gridTemplateColumns:'10% 60% 15% 15%',
        fontSize:'20px',
        fontWeight:'bold',
        paddingBottom:'20px'

    },

    questionMargin: {
        marginLeft: "12%"
    },

    questionText:{
        fontWeight: "lighter"
    },

    alignTextLeft:{
        textAlign:'left'
    },
    alignTextCenter:{
        textAlign:'center'
    },

    delete: {
        paddingLeft: "1%",
        cursor: "pointer",
        color: "red"
    },

    errorMsg: {
        margin: '0 15px',
        fontSize: '12px',
        color: 'red',
        textAlign: 'center'
    },

    autoContainer:{
        marginLeft: "25%"
    },

    tableContainer:{
        borderCollapse: "separate",
        borderSpacing: "50px 0"
    },

    editBtn:{
        cursor: "pointer",
        borderColor: "gray",
        borderRadius: "10px",
        borderWidth: "1px",
        color: "green"
    }
})