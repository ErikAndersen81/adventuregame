export interface CoordinatesI {
    x:number, 
    y:number,
}

export enum objectType {
    wall,
    door,
    key,
    trap,
    food,
};

export interface MapObjectI extends CoordinatesI {
    key: string,
    src: string,
    type: objectType
}


export interface LevelI {
    spawnPoint:CoordinatesI,
    walls:Array<MapObjectI>,
    floor:Array<MapObjectI>,
    doors:Array<MapObjectI>,
    keys:Array<MapObjectI>,
    width:number,
    height:number,

}

export interface PlayerContextI {
    moving:boolean | null;
    setMoving:setValue<boolean> | null;
    direction:string | null;
    setDirection: setValue<string> | null;
    position:CoordinatesI | null;
    setPosition: setValue<CoordinatesI> | null;
};

export interface CanvasContextI {
    objectsRef: React.RefObject<HTMLCanvasElement>|null;
    playerRef: React.RefObject<HTMLCanvasElement>|null;
    backgroundRef: React.RefObject<HTMLCanvasElement>|null;
};

export type setValue<T>= (value:T) => void;