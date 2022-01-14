import React from 'react';
import Block from '../Block';
import { MapObjectI } from '../../common/types';

interface DoorsProps {
    blocks:Array<MapObjectI>
}

const Doors = (props:DoorsProps) => {
    let blocks = props.blocks.map((door:MapObjectI) => <Block {...door} /> );
    return <> {blocks} </>
}


export default Doors;
