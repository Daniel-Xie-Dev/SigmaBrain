import React from 'react';
import { useStyles } from './style';

const TitleBar = () => {
    const classes = useStyles()
    return(
        <div>
        <div className={classes.Block_BackgroundImage}>
            Background image
        </div>
        <div className={classes.Block_Background}>
            <table>
                <tr>
                    <td>
                        <div className={classes.Profile}>
                             profile
                        </div>
                    </td>
                    <td>
                        <div className={classes.TitleText}>#TITLE</div>
                        <div>description.....</div>
                    </td>
                    <td>
                        <button>subscribe</button>
                    </td>
                </tr>
            </table>
        </div>
        
        </div>
        
    )
}
export default TitleBar