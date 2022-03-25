import React from 'react'
import { useState, useEffect } from 'react';
import { useStyles } from './style'

const ExperienceBar = (props) => {
    const { bgcolor, completed } = props;

    //Styles used for the filler
    const filler = {
        width: `${completed}%`,
        backgroundColor: bgcolor,
    }
    const classes = useStyles()
    
    return (
        <div className={classes.containerStyles}>
            <div className={classes.fillerStyles} style={filler}>
            <span className={classes.labelStyles}
                    role="progressbar"
                    aria-valuenow={`${completed}`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >{`${completed}%`}</span>
            </div>
        </div>
    )
}

export default ExperienceBar
