import React, {useState } from 'react';
import Player from '../Player';
import Controller from '../Controller';
import Walls from '../Walls';
import Floor from '../Floor';
import Doors from '../Doors';
import Keys from '../Keys';

const Game = props => {
    const [playerMoving, setPlayerMoving] = useState(0);
    const [playerDirection, setPlayerDirection] = useState([0,0]);
    const [playerPosition, setPlayerPosition] = useState(props.lvl.spawnPoint);

    const startMoving = e => {
	e.preventDefault();
	if (playerMoving > 0) return;
	const direction = getDirection(e.target.id);
	setPlayerMoving(1);
	setPlayerDirection(direction);
	const newPosition = playerPosition.map((x,i) => x + direction[i]);
	setPlayerPosition(newPosition);
    }

    const stopMoving = e => {
	e.preventDefault();
	if (playerMoving === 1) setPlayerMoving(2);
    }

    const move = () => {
	if (collisionDetected()) {
	    setPlayerMoving(0);
	    return;}
	const newPosition = playerPosition.map((x,i) => x + playerDirection[i]);
	setPlayerPosition(newPosition);
    }

    const handleTransitionEnd = e => {
	e.preventDefault();
	if (playerMoving === 1) move();
	if (playerMoving === 2) setPlayerMoving(0);
    }

    const collisionDetected = () => {
  	const [x, y] = playerPosition.map((c,i) => c + playerDirection[i]);
  	return props.lvl.walls.find((pos) =>  pos.x === x && pos.y === y);
    }
    
    return (
	    <div>
	      <Walls blocks={props.lvl.walls} />
	      <Floor blocks={props.lvl.floor} />
	      <Doors blocks={props.lvl.locks} />
	      <Keys blocks={props.lvl.keys} />
	    <Player position={playerPosition}
		    moving={playerMoving}
		    direction={playerDirection}
		    handleTransitionEnd={handleTransitionEnd}
		    />
	    <Controller startMoving={startMoving}
			stopMoving={stopMoving}/>
	</div>
    ); 
}

const getDirection = btn => {
    return {
	upBtn:[0,-32],
	downBtn:[0,32],
	leftBtn:[-32,0],
	rightBtn:[32,0]
    }[[btn]]
}

export default Game;
