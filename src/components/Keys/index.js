import React from 'react';
import Blocks from '../Blocks';
import blue from '../../resources/Keys/Key_Blue.png'
import green from '../../resources/Keys/Key_Green.png'
import orange from '../../resources/Keys/Key_Orange.png'
import purple from '../../resources/Keys/Key_Purple.png'
import red from '../../resources/Keys/Key_Red.png'
import turquoise from '../../resources/Keys/Key_Turquoise.png'
import Block from '../Block';

const colors = {
    "blue":blue,
    "green":green,
    "orange":orange,
    "purple":purple,
    "red":red,
    "turquoise":turquoise
}

const Keys = (props) => {
    return props.blocks.map(key => (
	<Block id={"key"}
	       position={[key.x, key.y]}
	       resource={colors[key.color]} />
    ));
}


export default Keys;
