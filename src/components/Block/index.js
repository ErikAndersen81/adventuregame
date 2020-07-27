import React, { useEffect, useContext, useRef } from 'react';
import CanvasContext from '../Context/CanvasContext.js';

const Block = props => {
    let [x, y] = props.position;
    const imgRef = useRef(null);
    const canvasRef = useContext(CanvasContext);
    useEffect( () => {
	const ctx = canvasRef.ref.current.getContext("2d");
	const img = imgRef.current;
	ctx.drawImage(img, x, y);
    },[canvasRef, x, y]);
    
    return (
	<img src={props.resource}
	     className="mapObject"
	     ref={imgRef}
	     alt=""/>
    );
}

export default Block;
