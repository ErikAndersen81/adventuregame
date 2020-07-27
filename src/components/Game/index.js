import React, {useState, useRef, useEffect } from 'react';
import Player, { positionDelta } from '../Player';
import Controller from '../Controller';
import Walls from '../Walls';
import Floor from '../Floor';
import Doors from '../Doors';
import Keys from '../Keys';
import PlayerInfo, {HealthBar} from '../PlayerInfo';
import CanvasContext from '../Context/CanvasContext.js';
import PlayerCanvasContext from '../Context/PlayerCanvasContext.js';

const Game = props => {
    const [playerMoving, setPlayerMoving] = useState(false);
    const [playerDirection, setPlayerDirection] = useState("down");
    const [playerPosition, setPlayerPosition] = useState(props.lvl.spawnPoint);
    const [canvasPosition, setCanvasPosition] = useState({x:0,y:0});
    const wallCenters = props.lvl.walls.map(pos => {return {x:pos.x+16, y:pos.y+16}})
    const startMoving = e => {
	e.preventDefault();
	if (playerMoving) return;
	const direction = getDirection(e.target.id);
	setPlayerMoving(true);
	setPlayerDirection(direction);
    }

    const stopMoving = e => {
	e.preventDefault();
	if (playerMoving) setPlayerMoving(0);
    }
    
    const collisionCheck = () => {
	let {x,y} = {x:playerPosition.x+16, y:playerPosition.y+16};
	let {dx, dy} = positionDelta(playerDirection);
	let playerNextPos = {x:x+dx, y:y+dy}
	let proximate = getProximate(playerNextPos, wallCenters);
	let collisions = proximate.map(block => collides(playerNextPos, block));
	return collisions.includes(true);
    }

    const canvasRef = useRef(null);
    const playerCanvasRef = useRef(null);
    
    const moveCanvases = (canvases, delta) => {
	canvases.forEach( canvasRef => {
	    const ctx = canvasRef.current.getContext("2d");
	    ctx.clearRect(0,0,props.lvl.width, props.lvl.height);
	    ctx.translate(delta.x, delta.y);
	});
	setCanvasPosition({x:canvasPosition.x+delta.x,
			   y:canvasPosition.y+delta.y});
    }
    
    const calibrateView = () => {
	let height = canvasRef.current.clientHeight;
	let width = canvasRef.current.clientWidth;
	const ctx = canvasRef.current.getContext("2d");
	const playerCtx = playerCanvasRef.current.getContext("2d");
	var delta = {x:0, y:0};
	if (playerPosition.x + canvasPosition.x > width * 0.80) {
	    delta.x = -width/2;
	} else if (playerPosition.x + canvasPosition.x < width * 0.20) {
	    delta.x = width/2;
	} else if (playerPosition.y + canvasPosition.y < height * 0.20) {
	    delta.y = height/2;
	} else if (playerPosition.y + canvasPosition.y > height * 0.80) {
	    delta.y = -height/2;
	} else return;
	moveCanvases([canvasRef, playerCanvasRef], delta);
    }

    useEffect(calibrateView, [playerPosition]);
    
    return (
	<>
	  <CanvasContext.Provider value={{ref:canvasRef, position:canvasPosition}} >
	    <canvas ref={canvasRef}
		    width={props.lvl.width}
		    height={props.lvl.height}
		    />
	    <canvas ref={playerCanvasRef}
		    width={props.lvl.width}
		    height={props.lvl.width}
		    />
	    <Walls blocks={props.lvl.walls} />
	    <Floor blocks={props.lvl.floor} />
	    <Doors blocks={props.lvl.locks} />
	    <Keys blocks={props.lvl.keys} />
	  </CanvasContext.Provider>
	  <PlayerCanvasContext.Provider value={{ref:playerCanvasRef, position:canvasPosition}} >
	    <Player position={playerPosition}
		    setPosition={setPlayerPosition}
		    moving={playerMoving}
		    setMoving={setPlayerMoving}
		    direction={playerDirection}
		    collisionCheck={collisionCheck}
		    />
	  </PlayerCanvasContext.Provider>
	  <div className="w3-content overlay">
	    <HealthBar />
	    <Controller startMoving={startMoving}
			stopMoving={stopMoving}/>
	  </div>
	  {null && <PlayerInfo />}
	</>
    ); 
}

const getDirection = btn => {
    return btn.slice(0,-3);
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

export default Game;
