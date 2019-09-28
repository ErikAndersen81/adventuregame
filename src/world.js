import React from 'react';
import './index.css';

export function Traps(props) {
    return props.traps.map(function(trap) {
	if (trap.triggered) {
	    return <button className='trapTriggered' style={{left:trap.x, top:trap.y}} key={trap.x +","+trap.y} />;
	}
	return <button className='trap' style={{left:trap.x, top:trap.y}} key={trap.x +","+trap.y} />;
    })
}

export function Blocks(props) {
    return props.blocks.map((block) =>
	<button className='block' style={{left:block.x, top:block.y}} key={block.x +","+block.y} /> );
}

export function Locks(props) {
    return props.locks.map( (lock) =>
	<button className='lock' style={{left:lock.x, top:lock.y, backgroundColor:lock.color}} key={lock.x +","+lock.y} />
    );
}

export default { Locks, Blocks, Traps };
