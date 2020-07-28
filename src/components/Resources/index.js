import React, { useContext, useEffect } from 'react';
import images from './images.js';
import { GraphicsContext } from '../Context';

const Resources = props => {
    const { setRefs } = useContext(GraphicsContext);
    const refs = Object.assign({}, ...images.map((x) => ({[x.id]: x.group})));
    const imgs = images.map(({id, src, group}) => (<img key={id} src={src} group={group} />));
    useEffect(() => {
	setRefs(refs);
    }, []);
    
    return imgs;
}

export default Resources;
