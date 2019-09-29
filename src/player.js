import React from 'react';

export function Player(props) {
    const deltaX = props.deltaX;
    const deltaY = props.deltaY;
    var animation='guy ';
    if (deltaX>0) { animation += 'guyFacingRight '; }
    else if (deltaX<0) { animation += 'guyFacingLeft '; }
    else if (deltaY<0) { animation += 'guyFacingDown '; }
    else if (deltaY>0) { animation += 'guyFacingUp '; };
    if (props.moving && !props.initialMove ) {animation += 'guyMoving';}
    else if (!props.moving && !props.initialMove && deltaX+deltaY !== 0) {animation += 'guyLastMove';}
    var Guy = <button className={animation} alt="" style={{
    	    left:props.posX + "px",
    	    top:props.posY + "px"
    	}} />
    return Guy;
}

function Health(props) {
    var pos=[]
    for (var i=0; i<props.health; i++) {
	pos.push(12+(i*35) + "px");
    }
    const hearts = pos.map((p) => <img className="heart" alt="" key={"heart "+p} /> );
    return hearts;
}

function Keys(props) {
    const keys = props.keys.map( col => <img className="key" style={{ backgroundColor:col }} alt="" key={"key "+ col} /> );
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
