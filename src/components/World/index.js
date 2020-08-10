import React, {useState, useRef, useEffect, useContext } from 'react';
import Player from '../Player';
import Walls from '../Walls';
import Floor from '../Floor';
import Doors from '../Doors';
import Keys from '../Keys';
import CanvasContext from '../Context/CanvasContext.js';
import PlayerContext from '../Context/PlayerContext.js';

const World = props => {    
    const [playerPosition, setPlayerPosition] = useState(props.level.spawnPoint);
    const [canvasOffset, setCanvasOffset] = useState({x:0,y:0});
    const { direction } = useContext(PlayerContext);
    
    const collisionCheck = (playerNextPos) => {
	let proximate = getProximate(playerNextPos, props.level.walls);
	let collisions = proximate.map(block => collides(playerNextPos, block));
	return collisions.includes(true);
    }

    const backgroundCanvasRef = useRef(null);
    const objectsCanvasRef = useRef(null);
    const playerCanvasRef = useRef(null);
    
    
    const moveCanvases = (canvases, delta) => {
	canvases.forEach( canvasRef => {
	    const ctx = canvasRef.current.getContext("2d");
	    ctx.clearRect(0,0,props.level.width, props.level.height);
	    ctx.translate(delta.x, delta.y);
	});
	setCanvasOffset({x:canvasOffset.x+delta.x,
			   y:canvasOffset.y+delta.y});
    }

    const canvasOverflow = (delta) => {
	if (props.level.width + canvasOffset.x < 0
	    || canvasOffset.x+delta.x > 0
	    || props.level.height + canvasOffset.y < 0
	    || canvasOffset.y+delta.y > 0) return true;
	return false;
    }

    const getCanvasDelta = () => {
	var delta = {x:0, y:0};
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
	return delta;
    }
    
    const calibrateView = () => {
	let delta = getCanvasDelta();
	if (delta.x+delta.y === 0 || canvasOverflow(delta)) return;
	moveCanvases([backgroundCanvasRef, objectsCanvasRef, playerCanvasRef], delta);
    }


    useEffect(calibrateView, [playerPosition]);
    
    return (
	<>
	  <CanvasContext.Provider value={{backgroundRef:backgroundCanvasRef, objectsRef:objectsCanvasRef, playerRef:playerCanvasRef}} >	    
	    <canvas ref={backgroundCanvasRef}
		    width={props.level.width}
		    height={props.level.height}/>
	    <canvas ref={objectsCanvasRef}
		    width={props.level.width}
		    height={props.level.height}/>
	    <canvas ref={playerCanvasRef}
		    width={props.level.width}
		    height={props.level.width}/>
	    <Walls blocks={props.level.walls} />
	    <Floor blocks={props.level.floor} />
	    <Doors blocks={props.level.doors} />
	    <Keys blocks={props.level.keys} />
	    <Player position={playerPosition}
		    setPosition={setPlayerPosition}
		    direction={direction}
		    collisionCheck={collisionCheck}
		    />
	  </CanvasContext.Provider>
	</>
    ); 
}


/*
 * This collision detection is based on the assumption that any object is
 * rectangular s.t. its sides are parallel to one of the basis vectors,
 * (0,1) and (1,0).
 */

const getProximate = (playerPosition, blocksPosition) => {
    const manhattanDist = (a,b) => Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
    const withinProximity = (pos) => manhattanDist(playerPosition, pos) <= 64;
    return blocksPosition.filter(pos => withinProximity(pos))
}

const collides = (A, B) => {
    return (Math.abs(A.x-B.x) < 28) && (Math.abs(A.y-B.y)<31);
}

export default World;
