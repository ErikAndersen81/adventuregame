import React from 'react';
import Blocks from '../Blocks';
import { walls } from '../../resources';
import { MapObjectI } from '../../common/types';

const Walls = (props:{blocks:Array<MapObjectI>}) => {
    return <Blocks id="walls" blocks={props.blocks} resource={walls[0].src} />
};


export default Walls;
