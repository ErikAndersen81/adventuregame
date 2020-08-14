import React from 'react';
import Blocks from '../Blocks';
import { floors }  from '../../resources';
import { MapObjectI } from '../../common/types';

interface FloorsProps {
    blocks:Array<MapObjectI>,
}
const Floor = (props:FloorsProps) => {
    return <Blocks id="floor" blocks={props.blocks} resource={floors[0].src} />
};

export default Floor;
