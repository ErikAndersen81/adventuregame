import React from 'react';

const Block = props => {
    let [x, y] = props.position;
    return (
	<img src={props.resource}
	     className="mapObject"
	     alt=""
	     style={{left: x+"px ",top: y + "px"}}/>
    );
}

export default Block;
