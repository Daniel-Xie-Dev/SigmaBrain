import { createUseStyles } from 'react-jss'

const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }

export const useStyles = createUseStyles({
    quizListContainer: {
        marginTop: "5%",
        margin: "20%"
    },
    displayBoardContainer: {
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "2.5%",
        marginTop: "2.5%"
    },
    pageContainer: {
        marginTop: "50px",
        margin: "20%"
    },


    rankContainer:{
        paddingTop: "5%"
    },

    title:{
        fontSize: "25px",
    },

    subtitle:{
        fontWeight: "bold"
    },
    table: {
        borderCollapse: "collapse",
        borderSpacing: "100px 0",
      },

      leaderboard:{
          paddingTop: "5%"
      }
})
