// start slingin' some d3 here.

//Create entities for our game board
var Entity = function(x, y) {
  this.x = x;
  this.y = y;
  //    this.name = name;
};

//starting a game


/*
d3.select('body').selectAll('svg')
.data([1,2,3,4,5,6,7])
.enter()
.append('svg')
.classed('red', true)
.attr('width', '100px')
.attr('height', '100px')
.html(function(d) {
  return '<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />';
});
*/



var player = new Entity(375, 225);
var enemies = [];
var width = 750;
var height = 450;

//initialize method
var initialization = function() {
  //player element gets created
  //append to the game board inital position of center of

  //graphical representation of player location
  d3.select('.gameBoard')
    .append('svg')
    .attr('width', '84px')
    .attr('height', '84px')
    .style({
      "top": player.y,
      "left": player.x
    })
    .classed('entity', true)
    .html('<circle cx="42" cy="42" r="40" stroke="black" stroke-width="2" fill="red" />');
  //controled by mouse movement
  //d3.event d3.mouse

  for (var i = 0; i < 5; i++){
    enemies.push(new Entity(Math.random() * width, Math.random() * height));
  }

  d3.select('.gameBoard')
    .selectAll('img')
    .data(enemies)
    .enter().append('img')
    .attr('src', 'asteroid.png')
    .attr('style', function(enemy) {
      return 'top: ' + enemy.y + 'px; left: ' + enemy.x + 'px';
    })
    .classed('entity', true);

};

initialization();
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
