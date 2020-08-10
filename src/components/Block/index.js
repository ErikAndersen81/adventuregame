import React, { useEffect, useContext, useRef } from 'react';
import CanvasContext from '../Context/CanvasContext.js';

const Block = props => {
    let {x, y} = props.position;
    const imgRef = useRef(null);
    const { objectsRef:ref } = useContext(CanvasContext);
    useEffect( () => {
	const ctx = ref.current.getContext("2d");
	const img = imgRef.current;
	ctx.drawImage(img, x, y);	
    },[ref, x, y]);
    
    return (
	<img src={props.resource}
	     ref={imgRef}
	     alt=""/>
    );
}

export default Block;
