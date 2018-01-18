console.log("wow");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var gameOver = false;
var score = 0;

var gameSize = {
  w: 500,
  h: 500
};

var snake = {
  speed: {
    x: 0,
    y: -1
  },
  position: {
    x: Math.floor(gameSize.w / 2 / 20),
    y: Math.floor(gameSize.h / 2 / 20)
  },
  size: {
    x: 20,
    y: 20
  },
  color: "green",
  tail: 3,
  trail: []
};

var apple = {
  position: {
    x: 8,
    y: 8
  },
  size: {
    x: 20,
    y: 20
  },
  color: "yellow"
};

function update() {
  snake.trail.push({ x: snake.position.x, y: snake.position.y });

  while (snake.trail.length > snake.tail) {
    snake.trail.shift();
  }

  snake.position.x += snake.speed.x;
  snake.position.y += snake.speed.y;
}

function checkGameconditions() {
  var x = snake.position.x;
  var y = snake.position.y;
  for (var i = 0; i < snake.trail.length; i++) {
    if (x === snake.trail[i].x && y === snake.trail[i].y) {
      gameOver = true;
    }
  }

  if (
    x < 0 ||
    y < 0 ||
    x >= Math.floor(gameSize.w / snake.size.x) ||
    y >= Math.floor(gameSize.h / snake.size.y)
  ) {
    gameOver = true;
  }
}

function render() {
  ctx.clearRect(0, 0, gameSize.w, gameSize.h);
  ctx.fillStyle = snake.color;
  for (var i = 0; i < snake.trail.length; i++) {
    ctx.fillRect(
      snake.trail[i].x * snake.size.x,
      snake.trail[i].y * snake.size.y,
      snake.size.x - 2,
      snake.size.y - 2
    );
  }

  ctx.fillStyle = apple.color;
  ctx.fillRect(
    apple.position.x * apple.size.x,
    apple.position.y * apple.size.y,
    apple.size.x,
    apple.size.y
  );
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function moveApple() {
  apple.position.x = getRandomNumber(0, Math.floor(gameSize.w / apple.size.x));
  apple.position.y = getRandomNumber(0, Math.floor(gameSize.h / apple.size.y));
}

function checkCollitions() {
  if (
    apple.position.x === snake.position.x &&
    apple.position.y === snake.position.y
  ) {
    score++;
    snake.tail++;
    document.querySelector(".score").innerHTML = score;
    moveApple();
  }
}

function game() {
  update();
  render();
  checkGameconditions();
  checkCollitions();
}

function timeout() {
  setTimeout(function() {
    if (!gameOver) {
      game();
      timeout();
    } else {
      //alert('Knub');
      document.body.style.backgroundColor = "red";
    }
  }, 2500 / 60);
}

timeout();

document.addEventListener("keydown", event => {
  const keyName = event.key;
  console.log(keyName);
  if (keyName === "ArrowLeft") {
    setSpeedIfAllowed (snake.speed, {
      x: -1,
      y: 0
    });
  }

  if (keyName === "ArrowRight") {
    setSpeedIfAllowed (snake.speed, {
      x: 1,
      y: 0
    });
  }

  if (keyName === "ArrowUp") {
    setSpeedIfAllowed (snake.speed, {
      x: 0,
      y: -1
    });
  }

  if (keyName === "ArrowDown") {
    setSpeedIfAllowed (snake.speed, {
      x: 0,
      y: 1
    });
  }
});

 function setSpeedIfAllowed(currentSpeed, newSpeed) {
  // Jos uusi nopeus olisi vastakkainen suunta, ei se ole sallittu
  if (currentSpeed.x !== 0 && currentSpeed.x !== -newSpeed.x) {
    snake.speed = newSpeed;
  } else if (currentSpeed.y !== 0 && currentSpeed.y !== -currentSpeed.y) {
    snake.speed = newSpeed;
  }
}