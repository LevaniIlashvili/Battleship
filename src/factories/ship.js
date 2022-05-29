export default function Ship(length, sunk) {
  this.length = length;
  this.sunk = sunk;
  this.hit = (position) => {
    const hit = [];
    hit.push(position);
  };
  this.isSunk = () => {
    // idk what to do here
  };
}
