import React from 'react'
import { useStyles } from './style'
const LOGO = () => {
    const classes = useStyles()

    return (
        <div className={classes.changeCursor}>
            SigmaBrain Forum
        </div>
    )
}

export default LOGO
