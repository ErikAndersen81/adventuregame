import React from 'react';
import './index.css';
import wall from './resources/wall.png';

export function Traps(props) {
    return props.traps.map(function(trap) {
	var cls = 'mapObject trap';
	if (trap.triggered) {
	    cls += ' trapTriggered';
	}
	return <button className={cls} style={{left:trap.x, top:trap.y}} key={trap.x +","+trap.y} />;
    })
}

export class Blocks extends React.Component {
    constructor(props) {
	super(props);
	this.blocks = props.blocks;
    }

    componentDidMount() {
	const canvas = this.refs.canvas;
	const ctx = canvas.getContext("2d");
	const img = this.refs.image;
	this.blocks.forEach(b => ctx.drawImage(img, b.x, b.y));
    }
    
    render() {
	return(
		<div>
		<canvas ref="canvas" width={1024} height={425} />
		<img ref="image" src={wall} style={{opacity:0}} />
		</div>
	)
    }
}

export function Locks(props) {
    return props.locks.map( (lock) =>
			    <button className={'mapObject  ' + lock.color +'Lock'} style={{left:lock.x, top:lock.y}} key={lock.x +","+lock.y} />
    );
}

export function Keys(props) {  
    return props.keys.map( (key) =>
			   <button className={'mapObject  ' + key.color +'Key' } style={{left:key.x, top:key.y}} key={key.x +","+key.y} />);
}


export default { Locks, Keys, Blocks, Traps };
