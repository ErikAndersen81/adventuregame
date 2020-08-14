import React from 'react';
import { CoordinatesI, setValue } from '../../common/types';


export interface animateMovementParameters {
    playerRef:React.RefObject<HTMLCanvasElement>|null,
    imgRef:React.RefObject<HTMLImageElement>, 
    position:CoordinatesI|null,
    setPosition:setValue<CoordinatesI>|null,
    collisionCheck:collisionCheck,
    moving:boolean|null,
    setMoving: setValue<boolean>|null,
    sourceOffset:CoordinatesI,
    deltaOffset:CoordinatesI,
}

export const animateMovement = (params:animateMovementParameters) => {
    return () => {
        let moving = params.moving;
        let {x , y} = params.position ? params.position : {x:null, y:null};
        let {x:dx, y:dy} = params.deltaOffset;
        let {x:sx, y:sy} = params.sourceOffset;
        if (params.playerRef && params.playerRef.current && params.imgRef.current){
            const ctx = params.playerRef.current.getContext("2d");
            const img = params.imgRef.current;
            if (ctx && img && x && y) {
                ctx.clearRect(x-4, y-4, 42, 42);
                ctx.drawImage(img, sx*(+!!moving), sy, 32, 32, x, y, 32, 32);
            }
        }
        const move = () => {
            if (params.moving && params.setPosition && x && y) params.setPosition({x:x+dx, y:y+dy});
            else global.clearTimeout(timer);
        }

        if (x && y && params.collisionCheck({x:x+dx, y:y+dy}) && params.setMoving) {
            dx=0;
            dy=0;
            params.setMoving(false);}
        let timer = global.setTimeout(move, 10);
    }       
}

export const spriteOffset = (state:number, direction:string):CoordinatesI => {
    let translate:{[direction:string]:number} = {
        "down":0,
        "left":32,
        "up":64,
        "right":96 
    };
    let x:number = [64, 32, 64, 96,128, 96][state];
    let y:number = translate[direction];
    return {x,y};
}

export interface animateSpriteParams {
    setSpriteIdx: (spriteIdx:number) => void,
    spriteIdx:number,
    moving:boolean,
}

export const animateSprite = (params:animateSpriteParams) => {
    return () => {
        const nextSprite = () => params.setSpriteIdx((params.spriteIdx + 1) % 6);
        let timer = setTimeout(nextSprite, 150);
        if (!params.moving) {
            clearTimeout(timer);
            params.setSpriteIdx(0)
        }
    }
}

export type collisionCheck = (coordinates:CoordinatesI) => boolean;

export const positionDelta = (direction:string):CoordinatesI => {
    let baseScalar:{[direction:string]:number} = {'up':-1, 'left':-1, 'down':1, 'right':1};
    let coord:number = baseScalar[direction];
    if (direction === 'up' || direction === 'down') return {x:0,y:coord};
    return {x:coord,y:0};
}