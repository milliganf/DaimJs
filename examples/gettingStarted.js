const eg = new Daim();
eg.createCanvas(400, 400);
eg.draw = function(elapsedTime){
  eg.circle(200, 200, 10, "#000000", true);
}
eg.start();
