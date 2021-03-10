const eg = new Daim();
eg.monitorMouse();
eg.createCanvas(400, 400);
eg.draw = (elapsedTime) => {
  eg.rect(0, 0, 400, 400, eg.WHITE, true); 
  if(eg.mousePressed){
    //Don't fill if the mouse is pressed, otherwise use previous fill (true) 
    eg.setFill(false);
  }
  eg.circle(eg.mouseX, eg.mouseY, 20, eg.BLACK);
}

eg.start(17);
