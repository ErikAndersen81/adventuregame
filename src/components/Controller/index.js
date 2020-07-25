import React from 'react';
import '../../css/controller.css';

const Controller = props => {
    return (
	<div className="w3-display-bottomright Controller">
	  <ControllerBtn id="upBtn"
			 direction={icons.up}
			 startMoving={props.startMoving}
			 stopMoving={props.stopMoving}
			 />
	  <ControllerBtn id="downBtn"
			 direction={icons.down}
			 startMoving={props.startMoving}
			 stopMoving={props.stopMoving}
			 />
	  <ControllerBtn id="leftBtn"
			 direction={icons.left}
			 startMoving={props.startMoving}
			 stopMoving={props.stopMoving}
			 />
	  <ControllerBtn id="rightBtn"
			 direction={icons.right}
			 startMoving={props.startMoving}
			 stopMoving={props.stopMoving}
			 />
	</div>
    );
};

const ControllerBtn = props => {
    return (
	<button id={props.id}
		className="w3-circle w3-black"
		onMouseDown={props.startMoving}
		onMouseUp={props.stopMoving}
		onMouseLeave={props.stopMoving}
	  >{props.direction}</button>
    );
}


const icons = {
    left:"\u2B05",
    right:"\u27A1",
    up:"\u2B06",
    down:"\u2B07"
}

export default Controller;
