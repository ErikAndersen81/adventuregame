import React from 'react';
import Block from '../Block';

const Doors = (props) => {
    return props.blocks.map(door => (
	<Block key={"door" +door.position.x+door.position.y}
	       position={door.position}
	       resource={door.src} />
    ));
}


export default Doors;
