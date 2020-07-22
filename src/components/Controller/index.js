import React from 'react';

const Controller = props => {
    return (<div className="Controller">
	<ControllerBtn id="upBtn" direction={icons.up} move={props.move} />
	<ControllerBtn id="downBtn" direction={icons.down} move={props.move} />
	<ControllerBtn id="leftBtn" direction={icons.left} move={props.move}/>
	<ControllerBtn id="rightBtn" direction={icons.right} move={props.move}/>
    </div>);
};

const ControllerBtn = props => {
    return <button id={props.id} className="ControllerBtn" onClick={props.move}>{props.direction}</button>
}


const icons = {
    left:"\u2B05",
    right:"\u27A1",
    up:"\u2B06",
    down:"\u2B07"
}

export default Controller;
