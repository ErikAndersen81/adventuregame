import React, { useRef, useEffect } from 'react';
import wall from '../../resources/Floor/Wood Floor.png';
import floor from '../../resources/Floor/Stone Mosaic 2 Floor.png';

const Walls = props => {
    const canvasRef = useRef(null);
    const floorRef = useRef(null);
    const wallRef = useRef(null);

    useEffect( () => {
	const ctx = canvasRef.current.getContext("2d");
	const floorImg = floorRef.current;
	const wallImg = wallRef.current;
	props.blocks.forEach(b => ctx.drawImage(wallImg, b.x, b.y));
	props.floor.forEach(b => ctx.drawImage(floorImg, b.x, b.y));
    },[props.blocks])
    
    return (
	<div>
	  <canvas ref={canvasRef} width={1024} height={425} />
	  <img ref={wallRef} src={wall} alt="" style={{opacity:0}} />
	  <img ref={floorRef} src={floor} alt="" style={{opacity:0}} />
	</div>
    );
};

export default Walls;
