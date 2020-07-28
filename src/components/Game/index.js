import React, { useState } from 'react';
import Controller from '../Controller';
import PlayerInfo, {HealthBar} from '../PlayerInfo';
import { PlayerContext, GraphicsContext } from '../Context';
import World from '../World';
import Resources from '../Resources';

const Game = props => {
    const [playerMoving, setPlayerMoving] = useState(false);
    const [playerDirection, setPlayerDirection] = useState("down");
    const [refs, setRefs] = useState(null);
    
    const player = {
	moving:playerMoving,
	setMoving:setPlayerMoving,
	direction:playerDirection,
	setDirection:setPlayerDirection,
    }
    
    return (
	<PlayerContext.Provider value={player}>
	  <GraphicsContext.Provider value={{refs:refs, setRefs:setRefs}}>
	    <Resources />
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
