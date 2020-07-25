import React, { useRef, useEffect, useContext, useState } from 'react';
import PlayerCanvasContext from '../Context/PlayerCanvasContext.js';
import playerGif from "../../resources/guy.gif";

const Player = props => {
    const [spriteIdx, setSpriteIdx] = useState(0);
    let [x,y] = props.position;
    const [sx, sy] = spriteOffset(spriteIdx, props.direction);
    const [dx, dy] = positionDelta(spriteIdx, props.direction)
    const imgRef = useRef(null);
    const canvasRef = useContext(PlayerCanvasContext);

    const animate = () => {
	const ctx = canvasRef.current.getContext("2d");
	const img = imgRef.current;
	ctx.clearRect(x-4, y-4, 42, 42);
	ctx.drawImage(img, sx*props.moving, sy, 32, 32, x, y, 32, 32);
    }
    
    useEffect(() => {
	animate();
	const move = () => props.setPosition([x+dx, y+dy]);
	if (props.moving) setTimeout(move, 10);
	else clearTimeout(move);
    }, [x, y, props.moving]);

    useEffect( () => {
	const nextSprite = () => setSpriteIdx((spriteIdx + 1) % 6);
	const reset = () => setSpriteIdx(0);
	if (props.moving) {
	    clearTimeout(reset);
	    setTimeout(nextSprite, 150);
	} else {
	    clearTimeout(nextSprite);
	    setSpriteIdx(0)
	}
    },[spriteIdx, props.moving]);
    
    return (
	    <img alt=""
		 src={playerGif}
		 ref={imgRef}
		 />
    );
}

const spriteOffset = (state, direction) => {
    let translate = {
	"down":0,
	"left":32,
	"up":64,
	"right":96 };
    let sx = [64, 32, 64, 96,128, 96][state];
    let sy = translate[String(direction)];
    return [sx, sy];
}


const positionDelta = (state, direction) => {
    let baseScalar = {'up':-1, 'left':-1, 'down':1, 'right':1};
    let coord = baseScalar[direction];
    if (direction === 'up' || direction === 'down') return [0,coord];
    return [coord,0];
}
export default Player;
