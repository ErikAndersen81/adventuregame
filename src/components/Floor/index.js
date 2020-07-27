import React from 'react';
import Blocks from '../Blocks';
import floor from '../../resources/Floor/StoneMosaicFloor1.png';

const Floor = props => {
    return <Blocks id="floor" blocks={props.blocks} resource={floor} />
};


export default Floor;
