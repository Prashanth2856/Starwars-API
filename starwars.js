var starwars_div = document.getElementById("starwar");

var timerId;

function throttleFun() {
  if (timerId) {
    return false;
  }

  timerId = setTimeout(() => {
    main();
    timerId = undefined;
  }, 500);
}

async function searchData() {
  let query = document.getElementById("query").value;

  if (query.length <= 2) {
    return false;
  }

  let res = await fetch(`https://swapi.dev/api/people/?search=${query}`);
  let data = await res.json();

  return data.results;
}

function appendData(results) {
  starwars_div.innerHTML = null;
  results.forEach(({ name, birth_year }) => {
    let p = document.createElement("p");
    p.setAttribute("id", "charName");
    let year = document.createElement("p");
    year.setAttribute("id", "yob");

    p.innerText = name;
    year.innerText = birth_year;

    starwars_div.append(p, year);
  });
}

async function main() {
  let movies = await searchData();

  appendData(movies);
}

//--------------------------------------------//



var canva = document.getElementById("canva");
var bgFancy = canva.getContext("2d");

canva.width = innerWidth;
canva.height = innerHeight;

window.onresize = function () {
  canva.width = innerWidth;
  canva.height = innerHeight;
};

var Star = function () {
  this.myX = Math.random() * innerWidth;
  this.myY = Math.random() * innerHeight;
  this.myColor = 0;
};

var xMod = 0;
var yMod = 0;
var warpSpeed = 0;

document.onkeydown = function (event) {
  if (!event) event = window.event;
  var code = event.keyCode;
  if (event.charCode && code == 0) code = event.charCode;
  switch (code) {
    case 32:
      warpSpeed = 1;
      break;
    case 37:
      xMod < 6 ? (xMod += 0.3) : (xMod = 6);
      break;
    case 38:
      yMod < 6 ? (yMod += 0.3) : (yMod = 6);
      break;
    case 39:
      xMod > -6 ? (xMod -= 0.3) : (xMod = -6);
      break;
    case 40:
      yMod > -6 ? (yMod -= 0.3) : (yMod = -6);
      break;
  }
};
document.onkeyup = function (event) {
  if (!event) event = window.event;
  var code = event.keyCode;
  if (event.charCode && code == 0) code = event.charCode;
  switch (code) {
    case 32:
      warpSpeed = 0;
      break;
    case 37:
      xMod = 0.5;
      break;
    case 38:
      yMod = 0.5;
      break;
    case 39:
      xMod = 0.5;
      break;
    case 40:
      yMod = 0.5;
      break;
  }
  event.preventDefault();
};
document.onmousedown = function (event) {
  warpSpeed = 1;
};
document.onmouseup = function (event) {
  warpSpeed = 0;
};

Star.prototype.updatePos = function () {
  var speedMult = 0.009;
  if (warpSpeed) {
    speedMult = 0.01;
  }
  this.myX += xMod + (this.myX - innerWidth / 2.1) * speedMult;
  this.myY += yMod + (this.myY - innerHeight / 2.1) * speedMult;
  this.updateColor();

  if (this.myX > innerWidth || this.myX < 0) {
    this.myX = Math.random() * innerWidth;
    this.myColor = 0;
  }
  if (this.myY > innerHeight || this.myY < 0) {
    this.myY = Math.random() * innerHeight;
    this.myColor = 0;
  }
};

Star.prototype.updateColor = function () {
  if (this.myColor < 255) {
    this.myColor += 10;
  } else {
    this.myColor = 255;
  }
};

var starSpace = [];
var starCount = 0;

while (starCount < 120) {
  var newStr = new Star();
  starSpace.push(newStr);
  starCount++;
}

function start() {
  canva.focus();
  window.requestAnimationFrame(drawing);
}

function drawing(event) {
  if (warpSpeed == 0) {
    bgFancy.fillStyle = "rgba(0,0,0,0.8)";
    bgFancy.fillRect(0, 0, innerWidth, innerHeight);
  }
  for (var i = 0; i < starSpace.length; i++) {
    bgFancy.fillStyle =
      "rgb(" +
      starSpace[i].myColor +
      "," +
      starSpace[i].myColor +
      "," +
      starSpace[i].myColor +
      ")";
    bgFancy.fillRect(
      starSpace[i].myX,
      starSpace[i].myY,
      starSpace[i].myColor / 128,
      starSpace[i].myColor / 128
    );
    starSpace[i].updatePos();
  }
  window.requestAnimationFrame(drawing);
}

start();
