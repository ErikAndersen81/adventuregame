import {translateBitmap, blockType} from './mapUtilities.js';

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
    
    locks:[
	{x:96, y:128, color:'blue', type:blockType.lock},
	{x:352,y:128, color:'orange', type:blockType.lock},
	{x:224,y:288, color:'turquoise', type:blockType.lock},
	{x:352,y:288, color:'blue', type:blockType.lock},
    ],
    
    keys:[
	{x:128, y:32, color:'blue', type:blockType.key},
	{x:32, y:256, color:'orange', type:blockType.key},
	{x:224, y:64, color:'red', type:blockType.key},
    ],
    food:[
	{x:64, y:64, image:'hotdog', type:blockType.food},
    ]    
}

