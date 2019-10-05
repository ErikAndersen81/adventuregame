import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Info, Player} from './player.js'
import {Locks, Keys, Traps, Food, Blocks} from './world.js'
import {blockSize, blockType} from './utility.js';
import {lvl1} from './levels.js'

class Game extends React.Component {
    constructor(props) {
	super(props);
	this.lvl=props.lvl;
	this.state = props.lvl.initialState;
	this.blocks = props.lvl.blocks;
	this.traps = props.lvl.traps;
	this.locks = props.lvl.locks;
	this.keys = props.lvl.keys;
	this.food = props.lvl.food;
	
	this.playerKeys = [];
	this.objects = this.blocks
	    .concat(this.traps)
	    .concat(this.locks)
	    .concat(this.keys)
	    .concat(this.food);
	
	this.handleClick = this.handleClick.bind(this);
	this.move = this.move.bind(this);
    }

    initialize() {
	this.setState(this.lvl.initialState);
	this.traps = this.lvl.traps;
	this.locks = this.lvl.locks;
	this.keys = this.lvl.keys;
	this.food = this.lvl.food;
	this.playerKeys = [];
	this.objects = this.blocks
	    .concat(this.traps)
	    .concat(this.locks)
	    .concat(this.keys)
	    .concat(this.food);
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
	    // reset level
	    this.initialize();
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
		this.objects = this.objects.filter(obj => obj.x !== collidee.x || obj.y !== collidee.y );
		break;
	    case blockType.food:
		health += 1;
		this.food=this.food.filter( obj => obj.x !== collidee.x || obj.y !== collidee.y );
		this.objects = this.objects.filter(obj => obj.x !== collidee.x || obj.y !== collidee.y );
		break;
	    case blockType.lock:
		const match = this.playerKeys.find( k => k === collidee.color );
		if (match) {
		    this.locks = this.locks.filter( lock => lock.x !== collidee.x || lock.y !== collidee.y);
		} else {
		    x = this.state.playerPosX;
		    y = this.state.playerPosY;
		    lastMove = true;
		}
		break;
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
		<Food food={this.food} />,
		<Info keys={this.playerKeys} health={this.state.playerHealth} />
		</div>
	);
    };
}


function loadLevel(lvl){
    ReactDOM.render(<Game lvl={lvl}/>, document.getElementById('root'));
}

loadLevel(lvl1);
