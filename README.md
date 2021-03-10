# Daim.js
A simple canvas drawing and user input manager in Javascript

# Getting Started
Everything you can do with Daim is done through the Daim class, so first create an instance of that class:
```
const eg = new Daim();
```   
Then, you'll need to create the canvas, using the createCanvas(width, height) method:
```
eg.createCanvas(400, 400);
```
To actually draw things, you'll need to use the draw method. You must define the draw method yourself. The draw method takes one parameter, the time elapsed since the previous frame.
```
eg.draw = function(elapsedTime){

}
```
Then, you'll need to add some methods to draw something. For this example, we'll draw a circle in the center of the screen. To draw a circle, use the circle method. It takes the x position, y position, radius, color, fill, and stroke width. If you fill the circle, you don't need the stroke width.
```
eg.circle(200, 200, 10, "#000000", true);
```
As shown, the color is defined in hex, and the fill is a boolean: fill the circle, or just draw the outline.
Finally, you'll need to call the start method to actually start the draw loop. It takes one argument, the interval, in milliseconds, between frames. Each frame is one execution of the draw method. If you don't give it this variable, it will call the draw method only once, otherwise it will repeatedly call it. For this example, we will only call it once.
```
eg.start();
```
So, our full code looks like:
```
const eg = new Daim();
eg.createCanvas(400, 400);
eg.draw = function(elapsedTime){
  eg.circle(200, 200, 10, "#000000", true);
}
eg.start();
```
When you do this yourself, make sure to include the Daim class somewhere as well. If you run this in a browser, you should see something like this:
![](https://user-images.githubusercontent.com/72325019/110700480-fee2a380-81bd-11eb-8ec3-750108c480dc.png)
