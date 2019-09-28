import React from 'react';
import './index.css';

export function Traps(props) {
    return props.traps.map(function(trap) {
	var cls = 'trap';
	if (trap.triggered) {
	    cls += ' trapTriggered';
	}
	return <button className={cls} style={{left:trap.x, top:trap.y}} key={trap.x +","+trap.y} />;
    })
}

export function Blocks(props) {
    return props.blocks.map((block) =>
	<img className='block' alt="" style={{left:block.x, top:block.y}} key={block.x +","+block.y} /> );
}

export function Locks(props) {
    return props.locks.map( (lock) =>
	<button className='lock' style={{left:lock.x, top:lock.y, backgroundColor:lock.color}} key={lock.x +","+lock.y} />
    );
}

export function Keys(props) {  
    return props.keys.map( (key) =>
	<button className='key' style={{left:key.x, top:key.y, backgroundColor:key.color}} key={key.x +","+key.y} />);
}


export default { Locks, Keys, Blocks, Traps };
