import React, { useRef, useEffect, useContext, useState } from 'react';
import PlayerCanvasContext from '../Context/PlayerCanvasContext.js';
import { player } from '../Resources';
import PlayerContext from '../Context/PlayerContext.js';

const Player = props => {
    const [spriteIdx, setSpriteIdx] = useState(0);
    let [x,y] = [props.position.x, props.position.y];
    const {moving, setMoving, direction} = useContext(PlayerContext);
    const {sx, sy} = spriteOffset(spriteIdx, direction);
    const {dx, dy} = positionDelta(direction);
    const imgRef = useRef(null);
    const canvasRef = useContext(PlayerCanvasContext);
    
    const draw = () => {
	const ctx = canvasRef.ref.current.getContext("2d");
	const img = imgRef.current;
	ctx.clearRect(x-4, y-4, 42, 42);
	ctx.drawImage(img, sx*moving, sy, 32, 32, x, y, 32, 32);
    }

    const animateMovement = () => {
	draw();
	const move = () => {
	    props.setPosition({x:x+dx, y:y+dy});
	}
	if (moving) {
	    if (props.collisionCheck()) setMoving(false);
	    else setTimeout(move, 10);
	} else clearTimeout(move);
    }

    const animateSprite = () => {
	const nextSprite = () => setSpriteIdx((spriteIdx + 1) % 6);
	const reset = () => setSpriteIdx(0);
	if (moving) {
	    clearTimeout(reset);
	    setTimeout(nextSprite, 150);
	} else {
	    clearTimeout(nextSprite);
	    setSpriteIdx(0)
	}
    }
    
    useEffect(animateMovement, [x, y, moving]);
    useEffect(animateSprite, [spriteIdx, moving]);
    return (
	    <img alt=""
		 src={player.src}
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
    return {sx:sx, sy:sy};
}


const positionDelta = (direction) => {
    let baseScalar = {'up':-1, 'left':-1, 'down':1, 'right':1};
    let coord = baseScalar[direction];
    if (direction === 'up' || direction === 'down') return {dx:0,dy:coord};
    return {dx:coord,dy:0};
}

export { positionDelta };

export default Player;
