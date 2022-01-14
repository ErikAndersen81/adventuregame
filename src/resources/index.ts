import images from './images';

const floors:Array<{group:string, src:string}> = images.filter( img => img.group==='floor')
const walls:Array<{group:string, src:string}> = images.filter( img => img.group==='wall')
const keys:Array<{group:string, src:string}> = images.filter( img => img.group==='key')
const doors:Array<{group:string, src:string}> = images.filter( img => img.group==='door')
const players:Array<{group:string, src:string}>= images.filter( img => img.group==='player')

export { floors, walls, keys, doors, players }
