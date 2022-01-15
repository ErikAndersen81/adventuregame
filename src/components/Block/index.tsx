import React, { useEffect, useContext, useRef } from 'react';
import CanvasContext from '../Context/CanvasContext';
import { MapObjectI } from '../../common/types';

const Block = (props:MapObjectI) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const { objectsRef } = useContext(CanvasContext);
    useEffect( () => {
        if (objectsRef && objectsRef.current && imgRef.current) {
    	const ctx = objectsRef.current.getContext("2d");
	    const img = imgRef.current;
	    if (ctx && img ) ctx.drawImage(img, props.x, props.y);}
    },[objectsRef, props.x, props.y]);
    
    return (
	<img src={props.src}
	     ref={imgRef}
	     alt=""/>
    );
}

export default Block;
