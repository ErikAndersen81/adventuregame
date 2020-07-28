import React, { useState } from 'react';
import Controller from '../Controller';
import PlayerInfo, {HealthBar} from '../PlayerInfo';
import { PlayerContext, GraphicsContext } from '../Context';
import World from '../World';
import { floors, doors, walls, keys, player } from '../Resources';

const Game = props => {
    const [playerMoving, setPlayerMoving] = useState(false);
    const [playerDirection, setPlayerDirection] = useState("down");
    
    const playerCtx = {
	moving:playerMoving,
	setMoving:setPlayerMoving,
	direction:playerDirection,
	setDirection:setPlayerDirection,
    }

    const graphicsCtx = {
	floors:floors,
	doors:doors,
	walls:walls,
	keys:keys,
	player:player
    }
    
    return (
	<PlayerContext.Provider value={playerCtx}>
	  <GraphicsContext.Provider value={graphicsCtx}>
	    <World level={props.level} />
	    <div className="w3-content overlay">
	      <HealthBar />
	      <Controller />
	    </div>
	    {null && <PlayerInfo />}
	  </GraphicsContext.Provider>
	</PlayerContext.Provider>
    ); 
}


export default Game;
