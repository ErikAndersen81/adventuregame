import React from 'react';
import Block from '../Block';
import { MapObjectI } from '../../common/types';

interface KeysProps {
    blocks:Array<MapObjectI>
}

const Keys = (props:KeysProps) => {
    let blocks = props.blocks.map((k:MapObjectI) => <Block {...k} /> );
    return <> { blocks } </>;
}


export default Keys;
