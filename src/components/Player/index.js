import React from 'react';
import '../../css/player.css';

const Player = props => {
    const [x,y] = props.position;
    var classes = 'mapObject guy ';
    classes += facing(props.direction);
    if ( props.moving ) classes += 'guyMoving';
    return (
	<button className={classes}
		onTransitionEnd={props.handleTransitionEnd}
		style={{
    		    left:x + "px",
    		    top:y + "px"
		}} />
    );
}

const facing = (direction) => {
    let translate = {
	"0,0":"guyFacingDown ",
	"0,-32":"guyFacingUp ",
	"0,32":"guyFacingDown ",
	"-32,0":"guyFacingLeft ",
	"32,0":"guyFacingRight " };
    return translate[String(direction)];
}

export default Player;
