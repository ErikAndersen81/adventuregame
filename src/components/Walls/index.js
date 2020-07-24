import React from 'react';
import Blocks from '../Blocks';
import wall from '../../resources/Floor/Wood Floor.png';

const Walls = props => {
    return <Blocks id="walls" blocks={props.blocks} resource={wall} />
};


export default Walls;
