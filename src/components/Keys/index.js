import React from 'react';
import Block from '../Block';

const Keys = (props) => {
    return props.blocks.map(k => (
	<Block key={"key"+ k.position.x+k.position.y}
	       position={k.position}
	       resource={k.src} />
    ));
}


export default Keys;
