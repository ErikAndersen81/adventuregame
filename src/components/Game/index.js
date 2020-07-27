import React, { useState } from 'react';
import Controller from '../Controller';
import PlayerInfo, {HealthBar} from '../PlayerInfo';
import PlayerContext from '../Context/PlayerContext.js';
import World from '../World';

const Game = props => {
    const [playerMoving, setPlayerMoving] = useState(false);
    const [playerDirection, setPlayerDirection] = useState("down");
    
    const player = {
	moving:playerMoving,
	setMoving:setPlayerMoving,
	direction:playerDirection,
	setDirection:setPlayerDirection,
    }
    
    return (
	<PlayerContext.Provider value={player}>
	  <World level={props.level} />
	  <div className="w3-content overlay">
	    <HealthBar />
	    <Controller />
	  </div>
	  {null && <PlayerInfo />}
	</PlayerContext.Provider>
    ); 
}


export default Game;
