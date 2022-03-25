import { createUseStyles } from 'react-jss'

const flexCenter = { display: 'flex', justifyContent: 'center', alignItems: 'center' };

export const useStyles = createUseStyles({
    quizContainer: {
        ...flexCenter,
        marginTop: '50px',
    },

    sidebar:{
        gridArea: "sidebar",

    }
})
