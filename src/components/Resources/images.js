import blueDoor from '../../resources/Doors/Door_Blue.gif';
import greenDoor from '../../resources/Doors/Door_Green.gif';
import orangeDoor from '../../resources/Doors/Door_Orange.gif';
import purpleDoor from '../../resources/Doors/Door_Purple.gif';
import redDoor from '../../resources/Doors/Door_Red.gif';
import turquoiseDoor from '../../resources/Doors/Door_Turquoise.gif';
import yellowDoor from '../../resources/Doors/Door_Yellow.gif';

import blueKey from '../../resources/Keys/Key_Blue.gif';
import greenKey from '../../resources/Keys/Key_Green.gif';
import orangeKey from '../../resources/Keys/Key_Orange.gif';
import purpleKey from  '../../resources/Keys/Key_Purple.gif';
import redKey from  '../../resources/Keys/Key_Red.gif';
import turquoiseKey from '../../resources/Keys/Key_Turquoise.gif';
import yellowKey from '../../resources/Keys/Key_Yellow.gif';

import stoneWall from '../../resources/Walls/StoneWall.png';
import stoneWallPeek from '../../resources/Walls/StoneWallPeek.gif';
import woodWall from '../../resources/Walls/WoodWall.png';
import stoneFloor1 from '../../resources/Floor/StoneFloor.png';
import stoneFloor2 from '../../resources/Floor/StoneMosaicFloor1.png';
import stoneFloor3 from '../../resources/Floor/StoneMosaicFloor2.png';

import player from '../../resources/player/player.gif'

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
    
    {group:'player', src:player}
];

export default images;
