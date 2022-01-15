import {translateBitmap } from './mapUtilities';
import {doors, keys, walls, floors } from '../resources';
import { LevelI, objectType } from '../common/types'

const lvl1Structure = [
    0xffffffff,
    0x84400381,
    0x840ef601,
    0x84442281,
    0xeeefa881,
    0x80442efd,
    0xbf742201,
    0x8115f777,
    0x81442221,
    0x806f7021,
    0x81c00221,
    0xffffffff
];

const empty32x32Structure = [
    0xffffffff,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0x80000001,
    0xffffffff
];

export const empty32x32 = {
    spawnPoint:{x:512,y:256},
    width:1024,
    height:1024,
    walls:translateBitmap(empty32x32Structure, walls[0].src),
    floor:translateBitmap(empty32x32Structure.map(x => ~x), floors[0].src),
    locks:[],
    keys:[]
}

export const lvl1:LevelI = {
    spawnPoint:{x:32,y:32},
    width:1024,
    height:384,

    walls:translateBitmap(lvl1Structure, walls[0].src),
    floor:translateBitmap(lvl1Structure.map(x => ~x), floors[0].src),
    
    
    doors:[
	{x:96, y:128, key:"doorX"+96+"Y"+128, type:objectType.door, src:doors[0].src},
	{x:352,y:128, key:"doorX"+352+"Y"+128, type:objectType.door, src:doors[1].src},
	{x:224,y:288, key:"doorX"+224+"Y"+288, type:objectType.door, src:doors[2].src},
	{x:352,y:288, key:"doorX"+352+"Y"+288, type:objectType.door, src:doors[3].src},
    ],
    
    keys:[
	{x:128, y:32, key:"keyX"+128+"Y"+32,type:objectType.key, src:keys[0].src},
	{x:32, y:256, key:"keyX"+32+"Y"+156,type:objectType.key, src:keys[1].src},
	{x:224, y:64, key:"keyX"+224+"Y"+64,type:objectType.key, src:keys[2].src},
    ],    
}

