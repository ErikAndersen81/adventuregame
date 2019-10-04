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
	<button className='block' style={{left:block.x, top:block.y}} key={block.x +","+block.y} /> );
}

export function Locks(props) {
    return props.locks.map( (lock) =>
			    <button className={'lock ' + lock.color +'Lock'} style={{left:lock.x, top:lock.y}} key={lock.x +","+lock.y} />
    );
}

export function Keys(props) {  
    return props.keys.map( (key) =>
			   <button className={'key ' + key.color +'Key' } style={{left:key.x, top:key.y}} key={key.x +","+key.y} />);
}


export default { Locks, Keys, Blocks, Traps };
