import blueDoor from '../sprites/Doors/Door_Blue.gif';
import greenDoor from '../sprites/Doors/Door_Green.gif';
import orangeDoor from '../sprites/Doors/Door_Orange.gif';
import purpleDoor from '../sprites/Doors/Door_Purple.gif';
import redDoor from '../sprites/Doors/Door_Red.gif';
import turquoiseDoor from '../sprites/Doors/Door_Turquoise.gif';
import yellowDoor from '../sprites/Doors/Door_Yellow.gif';

import blueKey from '../sprites/Keys/Key_Blue.gif';
import greenKey from '../sprites/Keys/Key_Green.gif';
import orangeKey from '../sprites/Keys/Key_Orange.gif';
import purpleKey from  '../sprites/Keys/Key_Purple.gif';
import redKey from  '../sprites/Keys/Key_Red.gif';
import turquoiseKey from '../sprites/Keys/Key_Turquoise.gif';
import yellowKey from '../sprites/Keys/Key_Yellow.gif';

import stoneWall from '../sprites/Walls/StoneWall.png';
import stoneWallPeek from '../sprites/Walls/StoneWallPeek.gif';
import woodWall from '../sprites/Walls/WoodWall.png';
import stoneFloor1 from '../sprites/Floor/StoneFloor.png';
import stoneFloor2 from '../sprites/Floor/StoneMosaicFloor1.png';
import stoneFloor3 from '../sprites/Floor/StoneMosaicFloor2.png';

import player from '../sprites/player/player.gif'
import player1 from '../sprites/player/Player1.gif'

const images = [
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
