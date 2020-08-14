import images from './images';
const floors = images.filter(img => img.group === 'floor');
const walls = images.filter(img => img.group === 'wall');
const keys = images.filter(img => img.group === 'key');
const doors = images.filter(img => img.group === 'door');
const players = images.filter(img => img.group === 'player');
export { floors, walls, keys, doors, players };
//# sourceMappingURL=index.js.map