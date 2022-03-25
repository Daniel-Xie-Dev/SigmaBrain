import { createUseStyles } from "react-jss"
export const useStyles = createUseStyles({
    containerStyles: {
        height: '20',
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: '50',
        margin: '50'
      },
    
    fillerStyles :{
        height: '100%',
        transition: 'width 1s ease-in-out',
        borderRadius: 'inherit',
        textAlign: 'right'
    },
    
    labelStyles:{
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        overflow:'hidden'
    }
})