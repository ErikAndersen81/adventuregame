import React, { useRef, useEffect, useContext, useState } from 'react';
import CanvasContext from '../Context/CanvasContext.js';
import { players } from '../../resources';
import PlayerContext from '../Context/PlayerContext.js';
import {animateMovement, animateMovementParameters, spriteOffset, collisionCheck, positionDelta, animateSpriteParams, animateSprite } from './animation';

interface PlayerProps {
    collisionCheck: collisionCheck
}

const Player = (props:PlayerProps) => {   
    const player = players[2].src;
    const [spriteIdx, setSpriteIdx] = useState(0);
    const {moving, setMoving, direction, position, setPosition} = useContext(PlayerContext);
    const imgRef = useRef(null);
    const { playerRef } = useContext(CanvasContext);
    
    let animationParams:animateMovementParameters = {
        playerRef:playerRef,
        position:position,
        collisionCheck:props.collisionCheck,
        deltaOffset:direction ? positionDelta(direction):{x:0, y:0},
        imgRef:imgRef,
        moving:moving,
        setMoving:setMoving,
        setPosition:setPosition,
        sourceOffset:direction ? spriteOffset(spriteIdx, direction): {x:0,y:0}, 
    }

    let spriteParams:animateSpriteParams = {
        moving:moving ? moving: false,
        setSpriteIdx:setSpriteIdx,
        spriteIdx:spriteIdx
    }

    useEffect(animateMovement(animationParams), [position , moving]);
    useEffect(animateSprite(spriteParams), [spriteIdx, moving]);
    return (
	    <img alt="" src={player} ref={imgRef}/>
    );
}


export default Player;
