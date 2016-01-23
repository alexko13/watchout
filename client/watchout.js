// start slingin' some d3 here.

//Create entities for our game board
var score = 0;
var collisions = 0;
var width = 750;
var height = 450;
var player = new Entity(width / 2, height / 2);
var enemies = [];
var gameBoard = d3.select('.gameBoard')
  .append('svg')
  .attr('width', width)
  .attr('height', height);
var drag = d3.behavior.drag()
  .on('drag', function() {
    player.x = d3.event.x;
    player.y = d3.event.y;
    playerCircle.attr('cx', d3.event.x);
    playerCircle.attr('cy', d3.event.y);
  });
var playerCircle = gameBoard
  .selectAll('.player')
  .data([player])
  .enter()
  .append('svg:circle')
  .attr('class', 'player')
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .attr('r', 10)
  .attr('fill', 'red')
  .call(drag);

function Entity(x, y) {
  this.x = x;
  this.y = y;
}

function collisionDetection() {
  return function() {
    var playerX = player.x;
    var playerY = player.y;
    var enemyX = d3.select(this).attr('cx');
    var enemyY = d3.select(this).attr('cy');
    var distance = Math.sqrt(Math.pow((playerX - enemyX), 2) + Math.pow((playerY - enemyY), 2));

    if (distance <= 10) {
      if (d3.select(".high span").html() < score) {
        d3.select(".high span").html(score);
      }
      score = 0;
      collisions++;
      d3.select(".collisions span").html(collisions);
    }
  };
}

function makeEnemies(num) {
  for (var i = 0; i < num; i++) {
    enemies.push(new Entity(Math.random() * width, Math.random() * height));
  }
}
makeEnemies(10);

var enemyCircles = gameBoard
  .selectAll('.enemy')
  .data(enemies);

enemyCircles.enter()
  .append('svg:circle')
  .attr('class', 'enemy')
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .attr('r', 10);

function moveEnemies() {
  enemyCircles
    .transition()
    .duration(2000)
    .tween('collision detection', collisionDetection)
    .attr('cx', function(d) {
      var newLocation = Math.random() * width;
      d.x = newLocation;
      return newLocation;
    })
    .attr('cy', function(d) {
      var newLocation = Math.random() * height;
      d.y = newLocation;
      return newLocation;
    });
}

setInterval(function() {
  moveEnemies();
}, 2000);

setInterval(function() {
  d3.select(".current span").html(score++);
}, 50);


//testMovement();
//set interval
//as time passes
//additional asteroids are added to the game board
//will start small and get larger as they enter game board
//score increases as time passes

//update both player(x, y) and astroids(x,y)
//use the objects x y to tell d3 where to place dom elements
//when player element collides with asteroid, game ends
//trigger update collisions

//game ends on 3 collisions
//update high score

//starting a game
