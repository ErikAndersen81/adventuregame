import blueDoor from './Doors/Door_Blue.gif';
import greenDoor from './Doors/Door_Green.gif';
import orangeDoor from './Doors/Door_Orange.gif';
import purpleDoor from './Doors/Door_Purple.gif';
import redDoor from './Doors/Door_Red.gif';
import turquoiseDoor from './Doors/Door_Turquoise.gif';
import yellowDoor from './Doors/Door_Yellow.gif';

import blueKey from './Keys/Key_Blue.gif';
import greenKey from './Keys/Key_Green.gif';
import orangeKey from './Keys/Key_Orange.gif';
import purpleKey from  './Keys/Key_Purple.gif';
import redKey from  './Keys/Key_Red.gif';
import turquoiseKey from './Keys/Key_Turquoise.gif';
import yellowKey from './Keys/Key_Yellow.gif';

import stoneWall from './Walls/StoneWall.png';
import stoneWallPeek from './Walls/StoneWallPeek.gif';
import woodWall from './Walls/WoodWall.png';
import stoneFloor1 from './Floor/StoneFloor.png';
import stoneFloor2 from './Floor/StoneMosaicFloor1.png';
import stoneFloor3 from './Floor/StoneMosaicFloor2.png';

import player from './player/player.gif'
import player1 from './player/Player1.gif'

const images:Array<{group:string, src:string}> = [
    {group:'door', src:blueDoor},
    {group:'door', src:greenDoor},
    {group:'door', src:orangeDoor},
    {group:'door', src:purpleDoor},
    {group:'door', src:redDoor},
    {group:'door', src:turquoiseDoor},
    {group:'door', src:yellowDoor},

    {group:'key', src:blueKey},
    {group:'key', src:greenKey},
    {group:'key', src:orangeKey},
    {group:'key', src:purpleKey},
    {group:'key', src:redKey},
    {group:'key', src:turquoiseKey},
    {group:'key', src:yellowKey},

    {group:'wall', src:stoneWall},
    {group:'wall', src:woodWall},
    
    {group:'floor', src:stoneFloor1},
    {group:'floor', src:stoneFloor2},
    {group:'floor', src:stoneFloor3},

    {group:'animated wall', src:stoneWallPeek},
    
    {group:'player', src:player},
    {group:'player', src:player1},
];

export default images;
