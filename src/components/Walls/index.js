import React, { useRef, useEffect } from 'react';
import wall from '../../resources/wall.png';

const Walls = props => {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    useEffect( () => {
	const ctx = canvasRef.current.getContext("2d");
	const image = imageRef.current;
	props.blocks.forEach(b => ctx.drawImage(image, b.x, b.y));
    },[props.blocks])
    
    return (
	<div>
	  <canvas ref={canvasRef} width={1024} height={425} />
	  <img ref={imageRef} src={wall} alt="" style={{opacity:0}} />
	</div>
    );
};

export default Walls;
