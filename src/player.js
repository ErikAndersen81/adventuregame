import React from 'react';

export function Player(props) {
    var animation='mapObject guy ';
    animation += facing[String(props.direction)];
    if (!props.lastMove && !props.moving) {animation += 'guyLastMove';}
    else if ( props.moving ) {animation += 'guyMoving';}
    var Guy = <button className={animation} alt="" style={{
    	left:props.posX + "px",
    	top:props.posY + "px"
    }} />;
    return Guy;
}

function Health(props) {
    var pos=[]
    for (var i=0; i<props.health; i++) {
	pos.push(12+(i*35) + "px");
    }
    const hearts = pos.map((p) => <button className="heart" alt="" key={"heart "+p} /> );
    return hearts;
}

function Keys(props) {
    const keys = props.keys.map( col => <button className={"key " + col + "Key" } key={"key "+ col} /> );
    return keys;
}

export function Info(props) {
    return (<div className='info'>
	    <p className='infoText' >{'Health:'}</p>,
	    <div className='infoItem' > <Health health={props.health} /> </div>,
	    <p className='infoText' >{'Keys:'}</p>,
	    <div className='infoItem' > <Keys keys={props.keys} /> </div>,
	    </div>)
}

const facing = {
    "0,-32":"guyFacingUp",
    "0,32":"guyFacingDown",
    "-32,0":"guyFacingLeft",
    "32,0":"guyFacingRight"
}
