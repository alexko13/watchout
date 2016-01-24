var width = window.innerWidth - 10;
var height = 500;
var collisions = 0;
var score = 0;
var enemies = [];
var numberOfEnemies = 20;
var player = {
  x: width / 2,
  y: height / 2
};

for (var i = 0; i < numberOfEnemies; i++) {
  enemies.push({
    x: Math.random() * width,
    y: Math.random() * height
  });
}

var gameboard = d3
  .select('.gameboard')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var drag = d3
  .behavior
  .drag()
  .on('drag', function() {
    player.x = d3.event.x > width ? width : d3.event.x;
    player.x = d3.event.x < 0 ? 0 : player.x;
    player.y = d3.event.y > height ? height : d3.event.y;
    player.y = d3.event.y < 0 ? 0 : player.y;
    playerCircle.attr('cx', player.x);
    playerCircle.attr('cy', player.y);
  });

var playerCircle = gameboard
  .selectAll('.player')
  .data([player])
  .enter()
  .append('svg:circle')
  .call(drag)
  .attr('class', 'player')
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .attr('r', 10)
  .attr('fill', 'red');

var enemyCircles = gameboard
  .selectAll('.enemy')
  .data(enemies)
  .enter()
  .append('svg:circle')
  .attr('class', 'enemy')
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .attr('r', 10)
  .attr('fill', 'lightgrey');

function collisionDetection() {
  var isHit = false;
  var previouslyHit = false;
  return function() {
    var playerX = player.x;
    var playerY = player.y;
    var enemyX = d3.select(this).attr('cx');
    var enemyY = d3.select(this).attr('cy');
    var distance = Math.sqrt(Math.pow((playerX - enemyX), 2) + Math.pow((playerY - enemyY), 2));

    if (distance <= 20) {
      isHit = true;
      if (d3.select(".high span").html() < score) {
        d3.select(".high span").html(score);
      }
      score = 0;
      if(previouslyHit != isHit) {
        collisions++;
        d3.select(".collisions span").html(collisions);
      }
      previouslyHit = isHit;
    }
  };
}

function moveEnemies(enemy) {
  enemy
    .transition()
    .duration(2000)
    .tween('collision-detectionion', collisionDetection)
    .attr('cx', function(d) {
      var newLocation = Math.random() * width;
      d.x = newLocation;
      return newLocation;
    })
    .attr('cy', function(d) {
      var newLocation = Math.random() * height;
      d.y = newLocation;
      return newLocation;
    }).each('end', function() {
      moveEnemies(d3.select(this));
    });
}

moveEnemies(enemyCircles);
setInterval(function() {
  d3.select(".current span").html(score++);
}, 50);