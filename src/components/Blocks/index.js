import React, { useRef, useEffect, useContext } from 'react';
import '../../css/canvas.css';
import CanvasContext from '../Context/CanvasContext.js';

const Blocks = props => {
    const imgRef = useRef(null);
    const canvasRef = useContext(CanvasContext);
    useEffect( () => {
	const ctx = canvasRef.ref.current.getContext("2d");
	const img = imgRef.current;
	if (props.blocks) {
	    props.blocks.forEach(b => ctx.drawImage(img, b.x, b.y));
	}
    },[props.blocks, canvasRef]);
    
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
