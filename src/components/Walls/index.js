import React from 'react';
import Blocks from '../Blocks';
import { walls } from '../../resources';

const Walls = props => {
    return <Blocks id="walls" blocks={props.blocks} resource={walls[0].src} />
};


export default Walls;
