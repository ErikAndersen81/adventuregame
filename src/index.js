import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Info, Player} from './player.js'
import {Locks, Keys, Traps, Blocks} from './world.js'
import {translateBitmap, blockSize, blockType} from './utility.js';

// Todo: fix player facing down before every move


class Game extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    playerPos: [32,32],
	    playerDirection: [0,0],
	    playerTargetPos: [0,0],
	    playerMoving: false,
	    playerHealth:3
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
	    {x:32,y:64, triggered:false, type:blockType.trap}
	];
	this.locks = [{x:96, y:128, color:'rgba(0,0,255,255)', type:blockType.lock}];
	this.keys = [{x:128, y:32, color:'rgba(0,0,255,255)', type:blockType.key}]
	this.playerKeys = [];
	this.objects = this.blocks
	    .concat(this.traps)
	    .concat(this.locks)
	    .concat(this.keys);
	
	
	this.handleClick = this.handleClick.bind(this);
	this.move = this.move.bind(this);
    }

    handleClick (event) {
	if (this.state.playerMoving) {
	    this.setState({playerTargetPos:this.state.playerPos});
	    return;
	}
	const deltaX = this.state.playerPos[0] - event.clientX;
	const deltaY = this.state.playerPos[1] - event.clientY;
	var direction;
	var target;
	if (Math.abs(deltaX) < Math.abs(deltaY)) {
	    if (deltaY < 0) {
		target = [this.state.playerPos[0], Math.floor(event.clientY/blockSize) * blockSize];
		direction = [0,32];
	    } else {
		target = [this.state.playerPos[0], Math.floor(event.clientY/blockSize) * blockSize];
		direction = [0,-32];
	    }
	} else {
	    if (deltaX < 0) {
		target = [Math.floor(event.clientX/blockSize) * blockSize, this.state.playerPos[1]]
		direction = [32,0];
	    } else {
		target = [Math.floor(event.clientX/blockSize) * blockSize, this.state.playerPos[1] ]
		direction = [-32,0];
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
	    switch (collidee.type) {
	    case blockType.trap:
		health -= 1;
		collidee.triggered = true;
		break;
	    case blockType.key:
		this.playerKeys.push(collidee.color);
		this.keys=this.keys.filter( k => k.color !== collidee.color );		
		break;
	    case blockType.lock:
		const match = this.playerKeys.find( k => k === collidee.color );
		if (match) {
		    this.locks = this.locks.filter( k => k.color !== collidee.color );
		    this.objects = this.objects.filter( k => k.color !== collidee.color);
		} else { return;}
		break;
	    default:
		return;
	    }
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
	
	const collidee = this.objects.find(function(block) { return block.x === newPos[0] && block.y === newPos[1];});
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
	        />,
	    	<Traps traps={this.traps} />,
		<Locks locks={this.locks} />,
		<Keys keys={this.keys} />,
		<Info keys={this.playerKeys} health={this.state.playerHealth} />
		</div>
	);
    };
}


ReactDOM.render(<Game />, document.getElementById('root'));
