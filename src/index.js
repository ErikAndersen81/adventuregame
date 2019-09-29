import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Info, Player} from './player.js'
import {Locks, Keys, Traps, Blocks} from './world.js'
import {translateBitmap, blockSize, blockType} from './utility.js';

class Game extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    playerPosX: 32,
	    playerPosY: 256,
	    playerDirectionX: 0,
	    playerDirectionY: 0,
	    playerTargetPosX: 0,
	    playerTargetPosY: 0,
	    playerMoving: false,
	    playerInitMove: false,
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
	    this.setState({playerTargetPosX:this.state.playerPosX, playerTargetPosY:this.state.playerPosY });
	    return;
	}
	const deltaX = this.state.playerPosX + 0.5*blockSize - event.clientX;
	const deltaY = this.state.playerPosY + 0.5*blockSize - event.clientY;
	var direction;
	var target;
	if (Math.abs(deltaX) < Math.abs(deltaY)) {
	    if (deltaY < 0) {
		target = [this.state.playerPosX, Math.floor(event.clientY/blockSize) * blockSize];
		direction = [0,32];
	    } else {
		target = [this.state.playerPosX, Math.floor(event.clientY/blockSize) * blockSize];
		direction = [0,-32];
	    }
	} else {
	    if (deltaX < 0) {
		target = [Math.floor(event.clientX/blockSize) * blockSize, this.state.playerPosY]
		direction = [32,0];
	    } else {
		target = [Math.floor(event.clientX/blockSize) * blockSize , this.state.playerPosY ]
		direction = [-32,0];
	    }
	}
	this.setState({
	    playerMoving:true,
	    playerInitMove:true,
	    playerDirectionX:direction[0],
	    playerDirectionY:direction[1],
	    playerTargetPosX:target[0],
	    playerTargetPosY:target[1]});
    }
    
    componentDidUpdate() {
	if (this.state.playerHealth === 0) {
	    alert("Game Over!");
	    return;
	}
	if (this.state.playerMoving) {
	    const x = this.state.playerPosX;
	    const y = this.state.playerPosY;
	    const x1 = this.state.playerTargetPosX;
	    const y1 = this.state.playerTargetPosY;
	    if (x === x1 && y === y1) {
		this.setState({
		    playerMoving:false})
		setTimeout(this.move, 300);
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
		} 
		break;
	    default:
		
	    }
	    this.setState({
		playerLastMove:true});
	    return
	}
	if (this.state.playerMoving) {
	    const x = this.state.playerDirectionX + this.state.playerPosX;
	    const y = this.state.playerDirectionY + this.state.playerPosY;
	    this.setState({
		playerPosX:x,
		playerPosY:y,
		playerInitMove:false,
		playerLastMove:false,
		playerHealth:health});
	} else {
	    this.setState({
		playerLastMove:true});
	}
	// reset any triggered traps
	this.traps.forEach((trap, idx , arr) => trap.triggered=false);
    }
    
    collisionDetect() {
	const posX = this.state.playerPosX;
	const posY = this.state.playerPosY;
	const deltaX = this.state.playerDirectionX;
	const deltaY = this.state.playerDirectionY;
	const newPos = [posX+deltaX,posY+deltaY];
	
	const collidee = this.objects.find(function(block) { return block.x === newPos[0] && block.y === newPos[1];});
	return collidee;
    }

    render () {
	return (
		<div className='fullScreen' onClick={this.handleClick}>
		<Blocks blocks={this.blocks} />,
		<Player
	    posX={this.state.playerPosX}
	    posY={this.state.playerPosY}
	    initialMove={this.state.playerInitMove}
	    lastMove={this.state.playerLastMove}
	    moving={this.state.playerMoving}
	    deltaX={this.state.playerDirectionX}
	    deltaY={this.state.playerDirectionY}
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
