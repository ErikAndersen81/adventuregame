import React from 'react';
import Blocks from '../Blocks';
import blue from '../../resources/Wood Wall/Wood Door_Blue.png'
import green from '../../resources/Wood Wall/Wood Door_Green.png'
import orange from '../../resources/Wood Wall/Wood Door_Orange.png'
import purple from '../../resources/Wood Wall/Wood Door_Purple.png'
import red from '../../resources/Wood Wall/Wood Door_Red.png'
import turquoise from '../../resources/Wood Wall/Wood Door_Turquoise.png'
import Block from '../Block';

const colors = {
    "blue":blue,
    "green":green,
    "orange":orange,
    "purple":purple,
    "red":red,
    "turquoise":turquoise
}

const Doors = (props) => {
    return props.blocks.map(door => (
	<Block id={"door"}
	       position={[door.x, door.y]}
	       resource={colors[door.color]} />
    ));
}


export default Doors;
