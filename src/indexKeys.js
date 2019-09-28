import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Player} from './player.js'
import {Coins, Blocks} from './world.js'

function translateBitmap(bitmap) {
    // The bitmap is an Array(32) of 32-bit Integers. 0 marks no block, 1 marks a block
    // Returns an array of 2D-coordinates of the blocks' positions.
    var blocks = [];
    var blockSize = 34;
    for(var yIdx=0; yIdx<bitmap.length; yIdx++) {
	var n = 2147483648; // hardcoded value of 2**32-2**31 i.e. 100...0
	var m = bitmap[yIdx];
	while (m > 0) {
	    if (n <= m) {
		var xIdx = 32 - n.toString(2).length;
		blocks.push([ xIdx*blockSize  , yIdx*blockSize]);
		m = m^n;
	    }
	    n = n>>>1;
	}
    }
    return blocks;
}

class Game extends React.Component {
    constructor(props) {
	super(props);
	const blocks = translateBitmap([0xffff,0x8001, 0x8001, 0x8001, 0x8001, 0x8001, 0x8001, 0xffff]);
	console.log(blocks);
	const coins = [[102,102], [204,204]];
	this.state = {
	    blocks: blocks,
	    coins: coins,
	    playerPos:[68,68],
	    playerMoving: null
	};
	this.playerDelta = [0,0];
	this.handleKeyDown = this.handleKeyDown.bind(this);
	document.body.addEventListener('keydown',this.handleKeyDown);
	// this.handleKeyUp = this.handleKeyUp.bind(this);
	// document.body.addEventListener('keyup',this.handleKeyup);
    }

    componentDidUpdate() {
	if ( this.state.playerMoving ) {
	    this.move();
	    this.setState({playerMoving:null});
	    setInterval( () => {
		this.playerDelta = [0,0];
	    }, 300 );
	}
    }

    move() {
	var delta;
	switch (this.state.playerMoving) {
	case 'ArrowUp':
	    delta = this.collisionDetect(this.state.playerPos, [0,-34]);
	    break;
	case 'ArrowDown':
	    delta = this.collisionDetect(this.state.playerPos, [0,34]);
	    break;
	case 'ArrowLeft':
	    delta = this.collisionDetect(this.state.playerPos, [-34,0]);
	    break;
	case 'ArrowRight':
	    delta = this.collisionDetect(this.state.playerPos, [34,0]);
	    break;
	default:
	    break;
	}
	if (delta) {
	    var xPos = this.state.playerPos[0]+delta[0];
	    var yPos = this.state.playerPos[1]+delta[1];
	    this.playerDelta = delta;
	    this.setState({
		playerPos:[xPos, yPos]});
	} 
    }

    handleKeyDown (event) {
	var keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
	var deltaSum = this.playerDelta[0]+this.playerDelta[1];
	if ( deltaSum === 0 && this.state.playerMoving === null && keys.indexOf(event.key) > -1 ) {
	    this.setState({
		playerMoving:event.key,
	    });
	}
    }

    collisionDetect(pos,delta) {
	const newPos = [pos[0]+delta[0],pos[1]+delta[1]];
	const collidee = this.state.blocks.find((block) =>
				     (block[0] === newPos[0]) && (block[1] === newPos[1])
				    );
	if (collidee) {
	    console.log("bump");
	    return null;
	} else {
	    return delta;
	}
    }

    render () {
	return (
		<div>
		<Blocks blocks={this.state.blocks} />,
	        <Coins coins={this.state.coins} />,
		<Player
	            pos={this.state.playerPos}
	            deltaX={this.playerDelta[0]}
	            deltaY={this.playerDelta[1]}
	        />
		</div>
	);
    };
}

ReactDOM.render(<Game />, document.getElementById('root'));
