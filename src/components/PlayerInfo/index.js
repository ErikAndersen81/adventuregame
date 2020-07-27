import React, { useState } from 'react';
import '../../css/playerinfo.css';

const PlayerInfo = props => {
    return <HealthBar/>;
}

const HealthBar = props => {
    const [health, setHealth] = useState(100);
    if (false) setHealth(129);
    return (
	<div className="w3-display-topright">
	  <div className="w3-panel">
	  <svg xmlns="http://www.w3.org/2000/svg"
	       viewport="-10 -10 110 110"
	       width="64px">
	    <path d={"M50,0 L50 100" }
		  stroke="white"
		  strokeLinecap="round"
		  strokeWidth="10"/>
	    <path d={"M50 0 L50 "+ health }
		  stroke="red"
		  strokeLinecap="butt"
		  strokeWidth="8"/>
	  </svg></div>
	</div>
    );
}

export {HealthBar}

export default PlayerInfo;
