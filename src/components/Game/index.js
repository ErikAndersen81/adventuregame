import React, {useState, useRef, useEffect } from 'react';
import Player from '../Player';
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
    
    const collisionDetected = () => {
	/* TODO */
	return false;
  	const [x, y] = playerPosition.map((c,i) => c + playerDirection[i]);
  	return props.lvl.walls.find((pos) =>  pos.x === x && pos.y === y);
    }

    const canvasRef = useRef(null);
    const playerCanvasRef = useRef(null);
   
    return (
	<>
	  <CanvasContext.Provider value={canvasRef} >
	    <canvas ref={canvasRef} width="1024px" height="384px" />
	    <canvas ref={playerCanvasRef} width="1024px" height="384"/>
	    <Walls blocks={props.lvl.walls} />
	    <Floor blocks={props.lvl.floor} />
	    <Doors blocks={props.lvl.locks} />
	    <Keys blocks={props.lvl.keys} />
	  </CanvasContext.Provider>
	  <PlayerCanvasContext.Provider value={playerCanvasRef} >
	    <Player position={playerPosition}
		    setPosition={setPlayerPosition}
		    moving={playerMoving}
		    direction={playerDirection}/>
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

export default Game;
