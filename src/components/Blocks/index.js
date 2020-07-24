import React, { useRef, useEffect } from 'react';
import '../../css/canvas.css';

const Blocks = props => {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);

    useEffect( () => {
	const ctx = canvasRef.current.getContext("2d");
	const img = imgRef.current;
	if (props.blocks) {
	    props.blocks.forEach(b => ctx.drawImage(img, b.x, b.y));
	}
    },[props.blocks]);
    
    return (
	<>
	  <canvas id={props.id + "Canvas"}
		  ref={canvasRef}
		  width={1024}
		  height={425} />
	  <img ref={imgRef}
	       alt=""
	       src={props.resource}
	       style={{opacity:0}} />
	</>
    );
};



export default Blocks;
