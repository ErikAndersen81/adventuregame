import React from 'react';
import { PlayerContextI } from '../../common/types';


const PlayerContext = React.createContext<PlayerContextI>({
    direction:null, 
    setDirection:null, 
    moving:null, 
    setMoving:null, 
    position:null, 
    setPosition:null });

export default PlayerContext;