import React from 'react';
import { useStyles } from './style';

const Category = () => {
    const classes = useStyles()
    return(
        <div>
            <div className={classes.Block_Background}>
                <table>
                    <thead>
                        <tr>
                            <td>
                                <div className={classes.gray_box}>
                                    FORUM&nbsp;&nbsp;   
                                </div>
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}
export default Category