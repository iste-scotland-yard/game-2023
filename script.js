let rows = 4;
let cols = 4;

let turns = 0;

let original = Array.from({length: 16}, (x, i) => i+1);

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function isValid([x, y]) {
  return (x >= 0 && y >= 0 && x < 4 && y < 4);
}

function getValidCoords(currX, currY) {
  up   = [currX-1, currY];
  down = [currX+1, currY];
  right= [currX, currY+1];
  left = [currX, currY-1];

  coords = [up, down, left, right].filter(coord => isValid(coord));
  return coords;
}

function shiftTile(event) {
  if (event.target.src.split('/').pop() === "16.png") {
    return;
  }

  let [currTileX, currTileY] = event.target.id.split('-').map(Number);

  for (coord of getValidCoords(currTileX, currTileY)) {
    let id = `${coord[0]}-${coord[1]}`;
    let tile = document.getElementById(id);

    if (tile.src.split('/').pop() === "16.png") {
      let image = event.target.src;
      event.target.src = tile.src;
      tile.src = image;
      turns += 1;
      document.getElementById("turns").innerText = turns;

      checkHasWon();
      return;
    }
  }
}

function checkHasWon() {
  let counter = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let id = `${r}-${c}`;
      let tile = document.getElementById(id);
      let name = tile.src.split('/').pop(); 

      if (name !== `${counter}.png`) {
        return;
      }
      counter++;
    }
  }

  document.getElementById("won").innerText = "Hurray! You won!";
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let id = `${r}-${c}`;
      let tile = document.getElementById(id);
      tile.remove();
    }
  }
  document.getElementById("board").remove();
  document.getElementById("title").style.visibility = "visible";
}

let imgOrder = original;

for (let r=0; r < rows; r++) {
  for (let c=0; c < cols; c++) {
    
    let tile = document.createElement("img");
    tile.id = r.toString() + "-" + c.toString();
    tile.src = `Images/${imgOrder.shift()}.png`;

    tile.addEventListener("click", (e) => shiftTile(e));

    document.getElementById("board").append(tile);
  }
}
checkHasWon();
