import React, { useState } from 'react';
import Controller from '../Controller';
import PlayerInfo, {HealthBar} from '../PlayerInfo';
import { PlayerContext } from '../Context';
import World from '../World';
import { LevelI, PlayerContextI } from '../../common/types';

const Game = (props:{level:LevelI}) => {
    const [playerMoving, setPlayerMoving] = useState(false);
    const [playerDirection, setPlayerDirection] = useState("down");
	const [playerPosition, setPlayerPosition] = useState(props.level.spawnPoint);
	
    const playerCtx:PlayerContextI = {
		moving:playerMoving,
		setMoving:setPlayerMoving,
		direction:playerDirection,
		setDirection:setPlayerDirection,
		position:playerPosition,
		setPosition:setPlayerPosition
	}
	
    return (
	<PlayerContext.Provider value={playerCtx}>
	    <World {...props.level} />
	    <div className="w3-content overlay">
	      <HealthBar />
	      <Controller />
	    </div>
	    {null && <PlayerInfo />}
	</PlayerContext.Provider>
    ); 
}


export default Game;
