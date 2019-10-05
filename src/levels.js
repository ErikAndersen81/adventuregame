import {translateBitmap, blockType} from './utility.js';

export const lvl1 = {
    initialState:{
	playerPosX: 32,
	playerPosY: 32,
	playerDirectionX: 0,
	playerDirectionY: 0,
	playerTargetPosX: 0,
	playerTargetPosY: 0,
	playerMoving: false,
	playerInitMove: false,
	playerLastMove: false,
	playerHealth:3
    },
    
    blocks:translateBitmap([
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
    ]),
    
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
	{x:96, y:128, color:'pink', type:blockType.lock},
	{x:352,y:128, color:'orange', type:blockType.lock},
	{x:224,y:288, color:'pink', type:blockType.lock},
	{x:352,y:288, color:'green', type:blockType.lock},
    ],
    
    keys:[
	{x:128, y:32, color:'pink', type:blockType.key},
	{x:32, y:256, color:'orange', type:blockType.key},
	{x:224, y:64, color:'red', type:blockType.key},
    ]
}
