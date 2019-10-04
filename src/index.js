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
	    playerPosY: 32,
	    playerDirectionX: 0,
	    playerDirectionY: 0,
	    playerTargetPosX: 0,
	    playerTargetPosY: 0,
	    playerMoving: false,
	    playerInitMove: false,
	    playerLastMove: false,
	    playerHealth:3
	};
	
	this.blocks = translateBitmap([0xffffffff,
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
					0xffffffff]);

	this.traps = [
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
	    
	];
	
	this.locks = [
	    {x:96, y:128, color:'pink', type:blockType.lock},
	    {x:352,y:128, color:'orange', type:blockType.lock},
	    {x:352,y:288, color:'green', type:blockType.lock},
	];
	
	this.keys = [
	    {x:128, y:32, color:'pink', type:blockType.key},
	    {x:128, y:64, color:'red', type:blockType.key},
	    {x:32, y:256, color:'orange', type:blockType.key},
		    ]
	
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
	// reset any triggered traps
	this.traps.forEach((trap, idx , arr) => trap.triggered=false);
	
	if (this.state.playerHealth === 0) {
	    alert("Game Over!");
	    return;
	}
	if (this.state.playerInitMove) {
	    this.move();
	}
	else if (this.state.playerMoving) {
	    setTimeout(this.move, 300);  
	}
    }
    
    move() {
	const collidee = this.collisionDetect();
	var health = this.state.playerHealth;
	var x = this.state.playerDirectionX + this.state.playerPosX;
	var y = this.state.playerDirectionY + this.state.playerPosY;
	var lastMove =  x === this.state.playerTargetPosX && y === this.state.playerTargetPosY;
	
	if (this.state.playerLastMove) {
	    this.setState({playerMoving:false, playerInitMove:false, playerLastMove:false});
	    return;
	}
	
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
		    break;
		}
		// fall-through to default behaviour (i.e. solid block) if no match
	    default:
		x = this.state.playerPosX;
		y = this.state.playerPosY;
		lastMove = true;
	    }
	}
	this.setState({
		playerPosX:x,
		playerPosY:y,
		playerInitMove:false,
		playerLastMove:lastMove,
		playerMoving:true,
		playerHealth:health});
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
