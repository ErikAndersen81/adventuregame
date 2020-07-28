import React from 'react';
import Blocks from '../Blocks';
import { floors }  from '../Resources';

const Floor = props => {
    return <Blocks id="floor" blocks={props.blocks} resource={floors[0].src} />
};


export default Floor;
