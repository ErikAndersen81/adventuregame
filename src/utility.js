export const blockSize = 32;

export function translateBitmap(bitmap) {
    // The bitmap is an Array(32) of 32-bit Integers. 0 marks no block, 1 marks a block
    // Returns an array of 2D-coordinates of the blocks' positions.
    var blocks = [];
    
    for(var yIdx=0; yIdx<bitmap.length; yIdx++) {
	var n = 2147483648; // hardcoded value of 2**32-2**31 i.e. 100...0
	var m = bitmap[yIdx];
	while (m > 0) {
	    if (n <= m) {
		var xIdx = 32 - n.toString(2).length;
		blocks.push({x:xIdx*blockSize  , y:yIdx*blockSize, type:blockType.wall});
		m = m^n;
	    }
	    n = n>>>1;
	}
    }
    return blocks;
}

export const blockType = {
    wall:1,
    lock:2,
    key:3,
    trap:4,
    food:5,
};
