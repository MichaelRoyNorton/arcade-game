
let lives = 3;
let points = 0;
let losingModal = document.getElementById('losing-modal');
let winningModal = document.getElementById('winning-modal');
document.getElementById('lives').innerHTML = lives;
document.getElementById('points').innerHTML = points;

// Restart game on win or lose

let winBtn = document.getElementById('win-btn');
winBtn.addEventListener('click', function() {
  location.reload();
});
let loseBtn = document.getElementById('lose-btn');
loseBtn.addEventListener('click', function() {
  location.reload();
});

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 150 + Math.floor(Math.random() * 280);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 505) {
      this.x = this.x + this.speed * dt;
    } else {
      this.x = -100;
    }
    // Reset player if hit by enemy and take away life
    if (player.x <= this.x  + 65 &&
        player.x >= this.x - 65 &&
        player.y >= this.y - 65 &&
        player.y <= this.y + 65) {
      player.x = 200;
      player.y = 405;
      lives = lives - 1;
      document.getElementById('lives').innerHTML = lives;
      if (lives === 0) {
        losingModal.style.display = 'block';
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 405;
}

Player.prototype.update = function() {
  if (this.key === 'left' && this.x > 0) {
    this.x -= 100;
    this.key = '';
  } else if (this.key === 'right' && this.x < 400) {
    this.x += 100;
    this.key = '';
  } else if (this.key === 'up' && this.y > 0) {
    this.y -= 85;
    this.key = '';
  } else if (this.key === 'down' && this.y < 400) {
    this.y += 85;
    this.key = '';
  }
  // Reset position if player reaches top
  if (this.y < 0) {
    this.x = 200;
    this.y = 405;
    points += 5;
    document.getElementById('points').innerHTML = points;
    if (points === 20) {
      allEnemies.push(new Enemy(0, 60));
      allEnemies.push(new Enemy(0, 140));
      allEnemies.push(new Enemy(0, 225));
    }
    if (points === 50) {
      winningModal.style.display = 'block';
    }
  }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keypress) {
  this.key = keypress;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];


allEnemies.push(new Enemy(0, 60));
allEnemies.push(new Enemy(0, 140));
allEnemies.push(new Enemy(0, 225));

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
