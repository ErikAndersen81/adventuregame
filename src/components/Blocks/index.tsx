import React, { useRef, useEffect, useContext } from 'react';
import CanvasContext from '../Context/CanvasContext.js';
import { MapObjectI } from '../../common/types';

interface BlocksProps {
    blocks:Array<MapObjectI>,
    resource:string,
    id:string
}

const Blocks = (props:BlocksProps) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const { backgroundRef } = useContext(CanvasContext);
    useEffect( () => {
        if (backgroundRef && backgroundRef.current) {
	    const ctx = backgroundRef.current.getContext("2d");
	    const img = imgRef.current;
	    if (props.blocks && ctx && img) {
	        props.blocks.forEach(b => ctx.drawImage(img, b.x, b.y));
	    }}
    },[props.blocks, backgroundRef]);
    
    return (
	<>
	  <img ref={imgRef}
	       alt=""
	       src={props.resource}
	       style={{opacity:0}} />
	</>
    );
};



export default Blocks;
