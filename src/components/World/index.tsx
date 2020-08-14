import React, {useState, useRef, useEffect, useContext } from 'react';
import Player from '../Player';
import Walls from '../Walls';
import Floor from '../Floor';
import Doors from '../Doors';
import Keys from '../Keys';
import CanvasContext from '../Context/CanvasContext.js';
import PlayerContext from '../Context/PlayerContext.js';

import { LevelI, CoordinatesI } from '../../common/types';

type setCanvasOffset = (coordinates:CoordinatesI) => void;

const moveCanvases = (canvases:Array<React.RefObject<HTMLCanvasElement>>, delta:CoordinatesI, width:number, height:number, canvasOffset:CoordinatesI, setCanvasOffset:setCanvasOffset) => {
	canvases.forEach( canvasRef => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
    	    ctx.clearRect(0,0,width, height);
            ctx.translate(delta.x, delta.y);
            }
        }   
    });
	setCanvasOffset({x:canvasOffset.x+delta.x,	
			   y:canvasOffset.y+delta.y});			
}   

const canvasOverflow = (delta:CoordinatesI, width:number, height:number, canvasOffset:CoordinatesI) => {
	if (width + canvasOffset.x < 0	
	    || canvasOffset.x+delta.x > 0	
	    || height + canvasOffset.y < 0
	    || canvasOffset.y+delta.y > 0) return true;
	return false;
    }

const getCanvasDelta = (backgroundCanvasRef:React.RefObject<HTMLCanvasElement>, playerPosition:CoordinatesI, canvasOffset:CoordinatesI) => {
    let delta:CoordinatesI = {x:0, y:0};
    if (backgroundCanvasRef.current) {
        let height = backgroundCanvasRef.current.clientHeight;
        let width = backgroundCanvasRef.current.clientWidth;
        if (playerPosition.x + canvasOffset.x > width-64) {
            delta.x = -width/2;
        } else if (playerPosition.x + canvasOffset.x <= 64) {
            delta.x = width/2;
        } else if (playerPosition.y + canvasOffset.y < 64) {
            delta.y = height/2;
        } else if (playerPosition.y + canvasOffset.y >= height-64) {
            delta.y = -height/2;
        }
    }
    return delta;
}

const collisionCheck = (walls:Array<CoordinatesI>) => {
    return (playerNextPos:CoordinatesI) => {
	    let proximate = getProximate(playerNextPos, walls);
        let collisions = proximate.map( (block:CoordinatesI) => collides(playerNextPos, block));
        return collisions.includes(true);
    }
}

const calibrateView = (backgroundCanvasRef:React.RefObject<HTMLCanvasElement>, objectsCanvasRef:React.RefObject<HTMLCanvasElement>, playerCanvasRef:React.RefObject<HTMLCanvasElement>, playerPosition:CoordinatesI, width:number, height:number, canvasOffset:CoordinatesI, setCanvasOffset:setCanvasOffset) => {
    return () => {
        let delta = getCanvasDelta(backgroundCanvasRef, playerPosition, canvasOffset);
	    if (delta.x+delta.y === 0 || canvasOverflow(delta, width, height, canvasOffset)) return;
        moveCanvases([backgroundCanvasRef, objectsCanvasRef, playerCanvasRef], delta, width, height, canvasOffset, setCanvasOffset);
    }
}

const World = (props:LevelI) => {    
    const [canvasOffset, setCanvasOffset] = useState({x:0,y:0});
    const { position } = useContext(PlayerContext);
    const backgroundCanvasRef = useRef(null);
    const objectsCanvasRef = useRef(null);
    const playerCanvasRef = useRef(null);

    useEffect(calibrateView(backgroundCanvasRef, 
        objectsCanvasRef, 
        playerCanvasRef, 
        position?position:{x:0,y:0}, 
        props.width, 
        props.height, 
        canvasOffset, 
        setCanvasOffset), 
    [position]);

    return (
	<>
        <CanvasContext.Provider value={{backgroundRef:backgroundCanvasRef, objectsRef:objectsCanvasRef, playerRef:playerCanvasRef}} >	    
	        <canvas ref={backgroundCanvasRef}
		        width={props.width}
		        height={props.height}/>
	        <canvas ref={objectsCanvasRef}
		        width={props.width}
		        height={props.height}/>
            <canvas ref={playerCanvasRef}
                width={props.width}
                height={props.width}/>
            <Walls blocks={props.walls} />
            <Floor blocks={props.floor} />
            <Doors blocks={props.doors} />
            <Keys blocks={props.keys} />
            <Player collisionCheck={collisionCheck(props.walls)} />
        </CanvasContext.Provider>
    </>
    ); 
}


/*
 * This collision detection is based on the assumption that any object is
 * rectangular s.t. its sides are parallel to one of the basis vectors,
 * (0,1) and (1,0).
 */

const getProximate = (playerPosition:CoordinatesI, blocksPosition:Array<CoordinatesI>) => {
    const manhattanDist = (a:CoordinatesI,b:CoordinatesI) => Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
    const withinProximity = (pos:CoordinatesI) => manhattanDist(playerPosition, pos) <= 64;
    return blocksPosition.filter((pos:CoordinatesI) => withinProximity(pos))
}

const collides = (A:CoordinatesI, B:CoordinatesI) => {
    return (Math.abs(A.x-B.x) < 28) && (Math.abs(A.y-B.y)<31);
}

export default World;
