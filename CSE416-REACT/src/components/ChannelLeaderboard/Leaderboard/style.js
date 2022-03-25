import { createUseStyles } from 'react-jss'

const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' }

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
        background: '#ffffff'
    },
    titleWrapper: {
        width: '100%',
        marginBottom: '25px'
    },
    title: {
        color: 'black',
        fontWeight: '600',
        fontSize: '30px'
    },
    textToLeft: {
        textAlign: "left"
    },
})
