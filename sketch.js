var fieldsize;
var distancesize;

var food;

var wall;
var snake;

var time;
var wait;

var div;
var text;
var btn;

var gameover=false;
function setup() {
  createCanvas(500,500);
  background(0);
  time=millis();
  //timer waiting time per tick
  wait=800;

  fieldsize = createVector(50,50);
  distancesize=createVector(width/fieldsize.x,height/fieldsize.y);
  wall = new generatewall();
  snake = new generatesnake();

  for (var i=0;i<this.wall.length;i++){
    var x=this.wall[i].x*distancesize.x;
    var y=this.wall[i].y*distancesize.y;
    rect(x,y,distancesize.x,distancesize.y);
  }

  //generate and draw food
  food=generatefood();
  foodx = (food.x*distancesize.x)+(distancesize.x/2);
  foody = (food.y*distancesize.y)+(distancesize.y/2);
  ellipse(foodx,foody,(distancesize.x),(distancesize.y));

  snake.show();

  div = document.createElement("div");
  btn = document.createElement("button")
  text=document.createElement("h1");
  btn.style.width="100px";
  btn.style.height="100px";
  btn.innerHTML="Restart";
  document.body.appendChild(div);
  //div.appendChild(btn);
  div.appendChild(text);
}

function draw() {
  if(millis() - time >= wait||wait==0){
    background(0);
    fill(255);

    //check condition
    for(var i=0;i<wall.length;i++){
      if(snake.head.x==wall[i].x&&snake.head.y==wall[i].y){
        //die
        gameover=true;
        text.innerHTML="Game Over";
        break;
      }
    }

    if (snake.body.length>1){
      for(var i=0;i<snake.body.length-2;i++){ //last array is head
        if(snake.head.x==snake.body[i].x&&snake.head.y==snake.body[i].y){
          //die
          gameover=true;
          text.innerHTML="Game Over";
          break;
        }
      }
    }

    if(!gameover){
      if(snake.head.x==food.x && snake.head.y==food.y){
        snake.eat();
        if(wait>=300){
          wait -= 50;
        }
        else if(wait>0){
          wait -= 20;
        }
        food=generatefood();
      }
      else{
        snake.move();
      }
    }

    //update
    fill("#6ACAEB");
    for (var i=0;i<this.wall.length;i++){
      var x=this.wall[i].x*distancesize.x;
      var y=this.wall[i].y*distancesize.y;
      rect(x,y,distancesize.x,distancesize.y);
    }

    fill("#E391AC");
    foodx = (food.x*distancesize.x)+(distancesize.x/2);
    foody = (food.y*distancesize.y)+(distancesize.y/2);
    ellipse(foodx,foody,(distancesize.x),(distancesize.y));

    fill("#9BF2A1");
    snake.show();

    //reset timer
    time = millis();
  }
}

//event handler
function keyTyped(){
  if(snake.body.length<2){
    if(key==='w'||key==='W'){
      snake.direction=createVector(0,-1);
    }
    else if(key==='a'||key==='A'){
      snake.direction=createVector(-1,0);
    }
    else if(key==='s'||key==='S'){
      snake.direction=createVector(0,1);
    }
    else if(key==='d'||key==='D'){
      snake.direction=createVector(1,0);
    }
  }
  else{
    if(key==='w'||key==='W'){
      if(!((snake.head.y-1)==snake.body[snake.body.length-2].y)){
        snake.direction=createVector(0,-1);
      }
    }
    else if(key==='a'||key==='A'){
      if(!((snake.head.x-1)==snake.body[snake.body.length-2].x)){
        snake.direction=createVector(-1,0);
      }
    }
    else if(key==='s'||key==='S'){
      if(!((snake.head.y+1)==snake.body[snake.body.length-2].y)){
        snake.direction=createVector(0,1);
      }
    }
    else if(key==='d'||key==='D'){
      if(!((snake.head.x+1)==snake.body[snake.body.length-2].x)){
        snake.direction=createVector(1,0);
      }
    }
  }
}

function generatewall(){
    tempwall=[];

    for(var i=0;i<fieldsize.x;i++){
      tempwall.push(createVector(i,0));
      tempwall.push(createVector(i,fieldsize.y-1));
    }
    for(var j=1;j<fieldsize.y-1;j++){
      tempwall.push(createVector(0,j));
      tempwall.push(createVector(fieldsize.x-1,j));
    }

    return tempwall;
}
function generatesnake(){
    this.body=[];
    this.head=createVector(fieldsize.x/2,fieldsize.y/2);
    this.direction=createVector(0,1);

    this.body.push(createVector(this.head));

    this.move = function(){
      this.head.add(this.direction);
      this.body.push(createVector(this.head.x,this.head.y));
      this.body.splice(0,1);
    }

    this.eat = function(){
      this.head.add(this.direction);
      this.body.push(createVector(this.head.x,this.head.y));
    }

    this.show = function(){
      for(var i=0;i<this.body.length;i++){
        this.x=this.body[i].x*distancesize.x;
        this.y=this.body[i].y*distancesize.y;
        rect(this.x,this.y,distancesize.x,distancesize.y);
      }
    }
}
function generatefood(){
    var newx = Math.floor(random(1,fieldsize.x-1));
    var newy = Math.floor(random(1,fieldsize.y-1));
    var newloc = createVector(newx,newy);
    for(var i=0;i<wall.length;i++){
      if(newloc==wall[i]){
        newloc=generatefood();
        break;
      }
    }
    for(var i=0;i<snake.body.length;i++){
      if(newloc==snake.body[i]){
        newloc=generatefood();
        break;
      }
    }
    return newloc;
}
