import React from 'react';
import useStyles from './styles';

const Loader = () => {
    const classes = useStyles();

    return (
        <div className={classes.loaderContainer}>
            <div className={classes.clockLoader}></div>
            <div className={classes.loadingText}>gathering data</div>
        </div>
    )
}

export default Loader;