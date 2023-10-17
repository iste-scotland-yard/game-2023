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
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let id = `${r}-${c}`;
      let tile = document.getElementById(id);
      tile.remove();
    }
  }
  document.getElementById("board").remove();

  let title = document.createElement("img");
  title.src = "Images/result.png";
  title.width = 400;

  let probability = Math.ceil(Math.random()*100);
  if (true) {
    title.style.border = "thick solid #f7f1e5";
    document.getElementById("won").innerText = "Tell them we are coming.";
    document.body.style.backgroundColor = "#232323";
    document.body.style.color = "#f7f1e5";

    document.getElementById("won").classList.add("dark");
  } else {
    title.style.border = "thick solid #232323";
    document.getElementById("won").innerText = "Congratulations, you did it!";
    document.body.style.backgroundColor = "#f7f1e5";
  }
  document.body.appendChild(title);

  document.getElementById("message").innerHTML += 
    "<br>You've got the message- now find out if you've done it best: " + 
    "<br> 1. Screenshot this page" +
    "<br> 2. Tag @istenitk" +
    "<br> 3. Post it on your Instagram story";
}

let imgOrder = shuffle(original);

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
