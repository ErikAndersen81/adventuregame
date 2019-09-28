import React from 'react';
import guy from './guy.gif'
import styled, { keyframes } from 'styled-components';

var basicGuy = styled.button`
    background-color: rgba(0,0,0,0);
    background-image: url(${guy});
    background-position-x: 0px;
    background-position-y: 0px;
    position: absolute;
    border: 0px;
    height: 34px;
    width: 34px;
`

export function Player(props) {
    const deltaX = props.deltaX;
    const deltaY = props.deltaY;
    var animateSprite = keyframes`
           from{background-position-x:0px};
           to{background-position-x:128px};
      `;
    var animateMove = keyframes`
           from{transform: translateX(${-deltaX}px) translateY(${-deltaY}px) };
           to{transform: translateX(0) translateY(0)};
      `;
    var spriteYOffset;
    if (deltaX>0) { spriteYOffset=32; }
    else if (deltaX<0) { spriteYOffset=96; }
    else if (deltaY<0) { spriteYOffset=64; }
    else if (deltaY>0) { spriteYOffset=0; };
    var Guy;
    if (props.initialMove) {
   	Guy = styled(basicGuy)`
   	    left: ${props.pos[0]}px;
   	    top: ${props.pos[1]}px;
          `
    } else {
  	Guy = styled(basicGuy)`
              background-position-y: ${spriteYOffset}px;
   	    left: ${props.pos[0]}px;
   	    top: ${props.pos[1]}px;
              animation: ${animateSprite} 0.3s steps(4), ${animateMove} 0.3s linear;
  	`
    }
    return <Guy />;
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
