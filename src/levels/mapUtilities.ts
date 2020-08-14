import { objectType, MapObjectI } from '../common/types';


export const blockSize = 32;

export function translateBitmap(bitmap:Array<number>, src:string) {
    // The bitmap is an Array(32) of 32-bit Integers. 0 marks no block, 1 marks a block
    // Returns an array of 2D-coordinates of the blocks' positions.
    let blocks:Array<MapObjectI> = [];
    
    for(let yIdx=0; yIdx<bitmap.length; yIdx++) {
	var n = 2147483648; // hardcoded value of 2**32-2**31 i.e. 100...0
	var m = bitmap[yIdx];
	while (m > 0) {
	    if (n <= m) {
		var xIdx = 32 - n.toString(2).length;
		blocks.push({x:xIdx*blockSize  , y:yIdx*blockSize, type:objectType.wall, key:"blockX"+xIdx+"Y"+yIdx, src:src});
		m = m^n;
	    }
	    n = n>>>1;
	}
    }
    return blocks;
}
