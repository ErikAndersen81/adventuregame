import React from 'react';
import Blocks from '../Blocks';
import floor from '../../resources/Floor/Stone Mosaic 2 Floor.png';

const Floor = props => {
    return <Blocks id="floor" blocks={props.blocks} resource={floor} />
};


export default Floor;
