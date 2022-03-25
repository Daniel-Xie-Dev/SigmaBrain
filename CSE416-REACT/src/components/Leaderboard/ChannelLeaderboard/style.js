import { color } from '@mui/system'
import { createUseStyles } from 'react-jss'

const flexCenter = { display: 'flex', alignItems: 'center' }

export const useStyles = createUseStyles({
    channelLeaderboardForm: {
        width: '100%',
        height: 'auto',
        maxWidth: '500px',
        minHeight: '400px',
        padding: '40px',
        borderRadius: '14px',
        ...flexCenter,
        flexDirection: 'column',
        background: '#ffffff',
    },
    gridContainer:{
        display:'grid',
        gridTemplateRows: '10% 10% 80%',
        width:'100%',
        alignItems: 'stretch'
    },
    titleWrapper: {
        width: '100%',
    },
    title: {
        color: 'black',
        fontWeight: '600',
        fontSize: '30px'
    },
    textToLeft: {
        textAlign: "left",
        width:'100%',
        marginTop: "5%",
    },
    rankCardContainer:{
        display:'grid',
        gridTemplateColumns:'20% 50% 30%',
        width:'100%',
        textAlign:'left',
        marginBottom:'10px',
        backgroundColor:"#34739C"
    },
    table: {
        borderCollapse: "collapse",
        borderSpacing: "100px 0",
      },
      
    td: {
    padding: "10px 0"
    },
    container:{
        paddingBottom: "2.5%"
    },

    name:{
        width: "20vw"
    }
})
