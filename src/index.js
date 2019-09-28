import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Health, Player} from './player.js'
import {Locks, Traps, Blocks} from './world.js'
import {translateBitmap, blockSize, blockType} from './utility.js';

// Todo: fix player facing down before every move


class Game extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    playerPos: [34,34],
	    playerDirection: [0,0],
	    playerTargetPos: [0,0],
	    playerMoving: false,
	    playerHealth:3,
	};
	
	this.blocks = translateBitmap([0xffffffff,
					0x84000001,
					0x84000001,
					0x84000001,
					0xee000001,
					0x80000001,
					0xff000001,
					0x80000001,
					0x80000001,
					0x80000001,
					0x80000001,
					0xffffffff]);

	this.traps = [
	    {x:34,y:68, triggered:false, type:blockType.trap},
	    {x:204, y:238, triggered:false, type:blockType.trap}
	];
	this.locks = [{x:102, y:136, color:'rgba(0,0,255,255)', type:blockType.lock}];
	this.handleClick = this.handleClick.bind(this);
	this.move = this.move.bind(this);
    }

    handleClick (event) {
	if (this.state.playerMoving) {
	    //this.setState({playerTargetPos:this.state.playerPos});
	    return;
	}
	const deltaX = this.state.playerPos[0] - event.clientX;
	const deltaY = this.state.playerPos[1] - event.clientY;
	var direction;
	var target;
	if (Math.abs(deltaX) < Math.abs(deltaY)) {
	    if (deltaY < 0) {
		target = [this.state.playerPos[0], Math.floor(event.clientY/blockSize) * blockSize];
		direction = [0,34];
	    } else {
		target = [this.state.playerPos[0], Math.floor(event.clientY/blockSize) * blockSize];
		direction = [0,-34];
	    }
	} else {
	    if (deltaX < 0) {
		target = [Math.floor(event.clientX/blockSize) * blockSize, this.state.playerPos[1]]
		direction = [34,0];
	    } else {
		target = [Math.floor(event.clientX/blockSize) * blockSize, this.state.playerPos[1] ]
		direction = [-34,0];
	    }
	}
	this.setState({
	    playerMoving:true,
	    playerInitMove:true,
	    playerDirection:direction,
	    playerTargetPos:target});
    }
    
    componentDidUpdate() {
	if (this.state.playerHealth === 0) {
	    alert("Game Over!");
	    return;
	}
	if (this.state.playerMoving) {
	    const x = this.state.playerPos[0];
	    const y = this.state.playerPos[1];
	    const x1 = this.state.playerTargetPos[0];
	    const y1 = this.state.playerTargetPos[1];
	    if (x === x1 && y === y1) {
		this.setState({playerMoving:false})
		return;
	    } else {
		setTimeout(this.move, 300);
	    }
	}
    }
    
    move() {
	const collidee = this.collisionDetect();
	var health = this.state.playerHealth;
	if (collidee) {
	    if (collidee.type === blockType.trap ) {
		health -= 1;
		collidee.triggered = true;
	    } else return;
	}
	if (this.state.playerDirection[0] !== 0 || this.state.playerDirection[1] !== 0 ) {
	    this.setState({
		playerPos:[this.state.playerPos[0]+this.state.playerDirection[0], this.state.playerPos[1]+this.state.playerDirection[1]],
		playerInitMove:false,
		playerHealth:health});
	}
	// reset any triggered traps
	this.traps.forEach((trap, idx , arr) => trap.triggered=false);
    }
    
    collisionDetect() {
	const pos = this.state.playerPos;
	const deltaX = this.state.playerDirection[0];
	const deltaY = this.state.playerDirection[1];
	const newPos = [pos[0]+deltaX,pos[1]+deltaY];
	const objects = this.blocks.concat(this.traps).concat(this.locks);
	const collidee = objects.find(function(block) { return block.x === newPos[0] && block.y === newPos[1];});
	return collidee;
    }

    render () {
	return (
		<div className='fullScreen' onClick={this.handleClick}>
		<Blocks blocks={this.blocks} />,
		<Player
	    pos={this.state.playerPos}
	    initialMove={this.state.playerInitMove}
	    deltaX={this.state.playerDirection[0]}
	    deltaY={this.state.playerDirection[1]}
	        />
		<Health health={this.state.playerHealth} />,
	    	<Traps traps={this.traps} />,
		<Locks locks={this.locks} />
		</div>
	);
    };
}


ReactDOM.render(<Game />, document.getElementById('root'));
