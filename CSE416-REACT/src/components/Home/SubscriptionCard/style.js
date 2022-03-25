import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles(
    {
        userCardContainer:{
            // display: "flex",
            cursor: "pointer",
            display: "grid",
            gridTemplateColumns: "30% auto",
            gridTemplateRows: "auto",
            gridTemplateAreas:`
            "img name"
            `,
            marginLeft: "2%",
            marginBottom: "5%",
            '&:hover':{
                backgroundColor: "whitesmoke"
            }
        },

        userName:{
            marginLeft: "1%",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            marginTop: "auto",
            marginBottom: "5%",
            
        },

        imgSize:{
            width:"100%",
            height: "100%",
            borderRadius: "50%",
        },

        circle: {
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            // borderStyle: "solid",
            // marginLeft: "1.5%",
            // marginTop: "1%"
        },

        imgContainer: {
            position: "relative",
            textAlign: "center",
        },
    }
)