import { createUseStyles } from 'react-jss'
export const useStyles = createUseStyles({
    // homeContainer: {
    //     display: "grid",
    //     gridTemplateColumns: "15% 40% 25% 15% auto",
    //     gridTemplateRows: "auto",
    //     gridTemplateAreas:`
    //     "header header header header header"
    //     "sidebar main main main ."
    //     `
    // },

    homeContainer: {
        marginTop: "50px",
    },
    notLoginHomeContainer:{
        marginTop: "50px",
        position: "absolute",
        right: "100px",
    },

    main:{
        // gridArea: "main",
        // gridColumnStart: "1",
        // paddingLeft: "20vw"
    },

    sidebar:{
        gridArea: "sidebar",
    }

})
