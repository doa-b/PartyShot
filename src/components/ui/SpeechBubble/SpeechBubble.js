import React from 'react';

import classes from './SpeechBubble.module.css'

/**
 * Created by Doa on 30-1-2020.
 */
const SpeechBubble = ({children}) => {
    return (<div className={classes.speechBubbleDs}>
        {children}
        <div className={classes.speechBubbleDsArrow}></div>
    </div>);
};

export default SpeechBubble;