import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles({
    rankCardContainer:{
        display:'grid',
        gridTemplateColumns:'20% 50% 30%',
        '&:hover':{
            cursor:'pointer'
        },
    },
    rankNumber:{
        textAlign:'center'
    }
})
