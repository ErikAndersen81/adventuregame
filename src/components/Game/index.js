import React, {useState } from 'react';
import Player from '../Player';
import Controller from '../Controller';
import Walls from '../Walls';

const Game = props => {
    const [playerMoving, setPlayerMoving] = useState(0);
    const [playerDirection, setPlayerDirection]=useState([0,0]);
    const [playerPosition, setPlayerPosition]=useState(props.lvl.spawnPoint);

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
	const newPosition = playerPosition.map((x,i) => x + playerDirection[i]);
	setPlayerPosition(newPosition);
    }

    const handleTransitionEnd = e => {
	e.preventDefault();
	if (playerMoving === 1) move();
	if (playerMoving === 2) setPlayerMoving(0);
    }
    
    return (
	    <div>
	      <Walls blocks={props.lvl.blocks} floor={props.lvl.floor}/>
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
