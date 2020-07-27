import React, { useContext } from 'react';
import '../../css/controller.css';
import PlayerContext from '../Context/PlayerContext.js';

const Controller = props => {
    return (
	<div className="w3-display-bottomright Controller">
	  <ControllerBtn id="upBtn"
			 icon={icons.up}
			 direction="up"
			 />
	  <ControllerBtn id="downBtn"
			 icon={icons.down}
			 direction="down"
			 />
	  <ControllerBtn id="leftBtn"
			 icon={icons.left}
			 direction="left"
			 />
	  <ControllerBtn id="rightBtn"
			 direction="right"
			 icon={icons.right}
			 />
	</div>
    );
};

const ControllerBtn = props => {
    const {moving, setMoving, setDirection} = useContext(PlayerContext);
    const startMoving = e => {
	e.preventDefault();
	if (moving) return;
	setMoving(true);
	setDirection(props.direction);
    }

    const stopMoving = e => {
	e.preventDefault();
	if (moving) setMoving(false);
    }
    return (
	<button id={props.id}
		className="w3-circle w3-black"
		onMouseDown={startMoving}
		onMouseUp={stopMoving}
		onMouseLeave={stopMoving}
	  >{props.icon}</button>
    );
}


const icons = {
    left:"\u2B05",
    right:"\u27A1",
    up:"\u2B06",
    down:"\u2B07"
}

export default Controller;
