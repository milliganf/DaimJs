class Daim{
  constructor(){
    this.BLACK = "#000000";
    this.WHITE = "#FFFFFF";
    this.RED = "#FF0000";
    this.ORANGE = "#FF8800";
    this.YELLOW = "#FFFF00";
    this.GREEN = "#00FF00";
    this.BLUE = "#0000FF";
    this.PURPLE = "#8800FF";
    this.GRAY = "#888888";
    this.GREY = "#888888";
    this.Image = class {
      constructor(element){
        this.element = element;
        this.width = element.width;
        this.height = element.height;
      }
    }
    this.Sound = class {
      constructor(element){
        this.playing = false;
        this.element = element;
      }
      play(){
        this.element.play();
        this.playing = true;
      }
      pause(){
        this.element.pause();
        this.playing = false;
      }
      time(t){
        if(t === undefined){
          return this.element.currentTime;
        }
        this.element.currentTime = t;
      }
    }
    this.previousFill = false;
    this.prevRounded = 0;
  }
  createCanvas(width = window.innerWidth, height = window.innerHeight){
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = this.BLACK;
    this.ctx.strokeStyle = this.BLACK;
    this.ctx.lineWidth = 1;
    this.transformation = {x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1};
    return this.canvas;
  }
  monitorMouse(){
    let eg = this;
    this.mousePressed = false;
    this.mouseX = 0;
    this.mouseY = 0;
    document.addEventListener("mousedown", (event) => {eg.mouseDownOriginal(event)});
    document.addEventListener("mouseup", (event) => {eg.mouseUpOriginal(event)});
    document.addEventListener("mousemove", (event) => {eg.mouseMoveOriginal(event)});
    document.addEventListener("wheel", (event) => {eg.mouseWheelOriginal(event)});
  }
  monitorKeyboard(){
    let eg = this;
    this.keys = [];
    document.addEventListener("keydown", (event) => {
      eg.keyPressOriginal(event);
    })
    document.addEventListener("keyup", (event) => {
      eg.keyReleaseOriginal(event);
    })
    document.addEventListener("keypress", (event) => {
      eg.keyTypeOriginal(event);
    })
  }
  fitToWindow(){
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    window.addEventListener("resize", (e) => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    })
  }
  rect(x, y, w, h, color, fill, lineWidth){
    if(fill === undefined) fill = this.previousFill;
    this.previousFill = fill;
    if(fill){
      this.ctx.fillStyle = color || this.ctx.fillStyle;
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      return;
    }
    this.ctx.lineWidth = lineWidth || this.ctx.lineWidth;
    this.ctx.strokeStyle = color || this.ctx.strokeStyle;
    this.ctx.beginPath()
    this.ctx.rect(x, y, w, h);
    this.ctx.stroke();
  }
  roundedRect(x, y, w, h, r, color, fill, lineWidth) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    if(r === undefined) r = this.prevRounded;
    if(fill === undefined) fill = this.previousFill;
    this.previousFill = fill;
    this.prevRounded = r;
    this.ctx.beginPath();
    this.ctx.moveTo(x+r, y);
    this.ctx.arcTo(x+w, y,   x+w, y+h, r);
    this.ctx.arcTo(x+w, y+h, x,   y+h, r);
    this.ctx.arcTo(x,   y+h, x,   y,   r);
    this.ctx.arcTo(x,   y,   x+w, y,   r);
    this.ctx.closePath();
    if(fill){
      this.ctx.fillStyle = color || this.ctx.fillStyle;
      this.ctx.fill();
      return;
    }
    this.ctx.lineWidth = lineWidth || this.ctx.lineWidth;
    this.ctx.strokeStyle = color || this.ctx.strokeStyle;
    this.ctx.stroke();
  }
  text(t, x, y, size, color, fill, width, font){
    if(fill === undefined) fill = this.previousFill;
    this.previousFill = fill;
    this.ctx.font = `${size || this.ctx.font.split("p")[0]}px ${font || this.ctx.font.split(" ").slice(1)}`;
    if(fill){
      this.ctx.fillStyle = color || this.ctx.fillStyle;
      this.ctx.fillText(t, x, y);
      return;
    }
    this.ctx.strokeStyle = color || this.strokeStyle;
    this.ctx.lineWidth = width || this.ctx.lineWidth;
    this.ctx.strokeText(t, x, y)
  }
  wrapText(t, x, y, w, size, color, fill, width, font){
    if(fill === undefined) fill = this.previousFill;
    this.previousFill = fill;
    this.ctx.font = `${size || this.ctx.font.split("p")[0]}px ${font || this.ctx.font.split(" ").slice(1)}`;
    let writeType = "strokeText";
    if(fill){
      writeType = "fillText";
      this.ctx.fillStyle = color || this.ctx.fillStyle;
    } else{
      this.ctx.strokeStyle = color || this.strokeStyle;
      this.ctx.lineWidth = width || this.ctx.lineWidth;
    }
    let words = t.split(' ');
    let line = '';
    for(let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = this.ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > w && n > 0) {
        this.ctx[writeType](line, x, y);
        line = words[n] + ' ';
        y += size;
      }
      else {
        line = testLine;
      }
    }
    this.ctx[writeType](line, x, y)
  }
  point(x, y, color){
    this.ctx.fillStyle = color || this.ctx.fillStyle;
    this.ctx.fillRect(x, y, 1, 1);
  }
  line(x1, y1, x2, y2, color, w){
    this.ctx.lineWidth = w || this.ctx.lineWidth;
    this.ctx.strokeStyle = color || this.ctx.strokeStyle;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke()
  }
  circle(x, y, r, color, fill, w){
    if(fill === undefined){fill = this.previousFill};
    this.previousFill = fill;
    if(fill){
      this.ctx.fillStyle = color || this.ctx.fillStyle;
      this.ctx.beginPath()
      this.ctx.arc(x, y, r, 0, 2*Math.PI);
      this.ctx.fill()
      return;
    }
    this.ctx.lineWidth = w || this.ctx.lineWidth;
    this.ctx.strokeStyle = color || this.ctx.strokeStyle;
    this.ctx.beginPath()
    this.ctx.arc(x, y, r, 0, 2*Math.PI);
    this.ctx.stroke()
  }
  arc(x, y, start, end, r, color, fill, w){
    if(fill === undefined){fill = this.previousFill};
    this.previousFill = fill;
    if(fill){
      this.ctx.fillStyle = color || this.ctx.fillStyle;
      this.ctx.beginPath()
      this.ctx.arc(x, y, r, start, end);
      this.ctx.fill()
      return;
    }
    this.ctx.lineWidth = w || this.ctx.lineWidth;
    this.ctx.strokeStyle = color || this.ctx.strokeStyle;
    this.ctx.beginPath()
    this.ctx.arc(x, y, r, start, end);
    this.ctx.stroke()
  }
  vertex(x, y){
    if(this.startedPath){
      this.ctx.lineTo(x, y);
      this.startedPath = [x, y];
      return;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.startedPath = [x, y];
  }
  arcVertex(start, end, radius){
    if(this.startedPath){
      this.ctx.arc(this.startedPath[0]-radius*Math.cos(start), this.startedPath[1]-radius*Math.sin(start), radius, start, end)
      this.startedPath[0] = this.startedPath[0]+radius*Math.cos(end);
      this.startedPath[1] = this.startedPath[1]+radius*Math.sin(end);
    }
  }
  closeShape(color, fill, w = 1){
    this.ctx.closePath();
    this.startedPath = false;
    if(fill === undefined){fill = this.previousFill};
    this.previousFill = fill;
    if(fill){
      this.ctx.fillStyle = color || this.ctx.fillStyle;
      this.ctx.fill();
      return;
    }
    this.ctx.strokeStyle = color || this.ctx.strokeStyle;
    this.ctx.lineWidth = w || this.ctx.lineWidth;
    this.ctx.stroke();
  }
  polygon(x, y, sides, length, color, fill, w){
    let pos = [x, y];
    let angle = 0;
    let angleInc = (Math.PI*2)/sides;
    this.ctx.beginPath();
    this.ctx.moveTo(pos[0], pos[1]);
    for(let i = 0; i<sides; i++){
      let newPos = [pos[0]+Math.cos(angle)*length, pos[1]+Math.sin(angle)*length];
      this.ctx.lineTo(newPos[0], newPos[1]);
      pos = newPos;
      angle += angleInc;
    }
    this.ctx.closePath();
    if(fill === undefined){fill = this.previousFill};
    this.previousFill = fill;
    if(fill){
      this.ctx.fillStyle = color || this.ctx.fillStyle;
      this.ctx.fill();
      return;
    }
    this.ctx.strokeStyle = color || this.ctx.strokeStyle;
    this.ctx.lineWidth = w || this.ctx.lineWidth;
    this.ctx.stroke();
  }
  linearGradient(x1, y1, w, h){
    return this.ctx.createLinearGradient(x1, y1, x1+w, y1+h);
  }
  radialGradient(x1, y1, x2, y2, r1, r2){
    return this.ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
  }
  createImage(src, onload){
    let image = new Image();
    image.src = src;
    image.onload = () => {
      onload(new this.Image(image));
    }
  }
  drawImage(img, x, y, w = img.width, h = img.height){
    if("element" in img){
      this.ctx.drawImage(img.element, x, y, w, h);
      return;
    }
    this.ctx.drawImage(img, x, y, w, h);
  }
  createSound(src, onload){
    let sound = document.createElement("audio");
    sound.src = src;
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    sound.addEventListener("canplaythrough", (e) => {
      onload(new this.Sound(sound))
    })
  }
  setFillColor(color){
    this.ctx.fillStyle = color;
  }
  setStrokeColor(color){
    this.ctx.strokeStyle = color;
  }
  setLineWidth(w){
    this.ctx.lineWidth = w;
  }
  setFill(fill){
    this.previousFill = fill;
  }
  translate(x, y){
    this.ctx.translate(this.transformation.x, this.transformation.y);
    this.transformation.x += x;
    this.transformation.y += y;
  }
  setTranslation(x, y){
    this.ctx.translate(x-this.transformation.x, y-this.transformation.y);
    this.transformation.x = x;
    this.transformation.y = y;
  }
  rotate(angle){
    this.ctx.rotate(angle);
    this.transformation.rotation += angle;
  }
  setRotation(angle){
    this.ctx.rotate(-this.tranformation.rotation);
    this.ctx.rotate(angle);
    this.transformation.rotation = angle;
  }
  scale(x, y){
    this.ctx.scale(x, y);
    this.transformation.scaleX += x;
    this.transformation.scaleY += y;
  }
  setScale(x,y){
    this.ctx.scale(1/this.transformation.scaleX, 1/this.transformation.scaleY);
    this.ctx.scale(x, y);
    this.transformation.scaleX = x;
    this.transformation.scaleY = y;
  }
  RGB(r, g, b){
    let hexNums = "0123456789ABCDEF".split("");
    let newR = parseInt(r);
    newR = newR.toString(16).length < 2 ? "0"+newR.toString(16) : newR.toString(16);
    let newG = parseInt(g);
    newG = newG.toString(16).length < 2 ? "0"+newG.toString(16) : newG.toString(16);
    let newB = parseInt(b);
    newB = newB.toString(16).length < 2 ? "0"+newB.toString(16) : newB.toString(16);
    return `#${newR}${newG}${newB}`
  }
  mouseDownOriginal(e){
    this.mousePressed = true;
    if(this.mouseDown) this.mouseDown(e);
  }
  mouseUpOriginal(e){
    this.mousePressed = false;
    if(this.mouseUp) this.mouseUp(e);
  }
  mouseMoveOriginal(e){
    this.mouseX = e.pageX-this.canvas.offsetLeft; 
    this.mouseY = e.pageY-this.canvas.offsetTop;
    if(this.mouseMove) this.mouseMove(e);
  }
  mouseWheelOriginal(e){
    if(this.mouseWheel) this.mouseWheel(e);
  }
  keyPressOriginal(e){
    this.keyPressed = true;
    if(!this.keys.includes(e.key)){
      this.keys.push(e.key)
      if(this.keyPress) this.keyPress(e);
    }
  }
  keyReleaseOriginal(e){
    this.keyPressed = false;
    this.keys.splice(this.keys.indexOf(e.key), 1);
    if(this.keyRelease) this.keyRelease(e);
  }
  keyTypeOriginal(e){
    if(this.keyType) this.keyType(e);
  }
  isKeyDown(key){
    return this.keys.includes(key);
  }
  stop(){
    this.running = false;
    clearInterval(this.interval);
  }
  start(rate){
    let time = Date.now();
    this.running = true;
    if(rate === undefined){
      this.draw(0);
      return;
    }
    this.interval = setInterval(() => {
      let newTime = Date.now()
      this.draw(newTime-time);
      time = newTime;
    }, rate);
  }
}
