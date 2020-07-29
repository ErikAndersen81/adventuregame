import {translateBitmap, blockType} from './mapUtilities.js';
import {doors, keys } from '../resources';

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
    walls:translateBitmap(empty32x32Structure),
    floor:translateBitmap(empty32x32Structure.map(x => ~x)),
    locks:[],
    keys:[]
}

export const lvl1 = {
    spawnPoint:{x:32,y:32},
    width:1024,
    height:384,

    walls:translateBitmap(lvl1Structure),
    floor:translateBitmap(lvl1Structure.map(x => ~x)),
    
    traps:[
	{x:288,y:64, triggered:false, type:blockType.trap},
	{x:640,y:64, triggered:false, type:blockType.trap},
	{x:768,y:64, triggered:false, type:blockType.trap},
	{x:224,y:128, triggered:false, type:blockType.trap},
	{x:544,y:128, triggered:false, type:blockType.trap},
	{x:32,y:192, triggered:false, type:blockType.trap},
	{x:640,y:224, triggered:false, type:blockType.trap},
	{x:768,y:224, triggered:false, type:blockType.trap},
	{x:896,y:224, triggered:false, type:blockType.trap},
	{x:960,y:160, triggered:false, type:blockType.trap},
    ],
    
    doors:[
	{position:{x:96, y:128}, src:doors[0].src},
	{position:{x:352,y:128}, src:doors[1].src},
	{position:{x:224,y:288}, src:doors[2].src},
	{position:{x:352,y:288}, src:doors[3].src},
    ],
    
    keys:[
	{position:{x:128, y:32}, src:keys[0].src},
	{position:{x:32, y:256}, src:keys[1].src},
	{position:{x:224, y:64}, src:keys[2].src},
    ],
    food:[
	{x:64, y:64, image:'hotdog', type:blockType.food},
    ]    
}

