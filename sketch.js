var monkey, ground, scene, rock, banana;
var sceneimage, monkeyimage, collidedmonkey, bananaimage, rockimage;
var rockgroup, bananagroup;
var score;
var gameState;

function preload(){
  monkeyimage = loadAnimation("Monkey_01.png", "Monkey_02.png",       "Monkey_03.png", "Monkey_04.png", "Monkey_05.png",                   "Monkey_06.png",  "Monkey_07.png", "Monkey_08.png",                 "Monkey_09.png",  "Monkey_10.png");
  sceneimage = loadImage ("jungle.jpg");
  bananaimage = loadImage("banana.png");
  rockimage = loadImage("stone.png");
  collidedmonkey = loadImage ("Monkey_07.png");
}

function setup() {
  createCanvas(600,400);
  score = 0;
  gameState = "PLAY";
  
   bananagroup = new Group();
  rockgroup = new Group();
  
  scene = createSprite(200,100,600,400);
  scene.addImage("jungle1",sceneimage);
  scene.velocityX =  -7;
  scene.scale = 1.2;
  
  monkey = createSprite(100, 365, 200, 200);
  monkey.addAnimation("monkey1",monkeyimage);
  monkey.addImage("monkey2", collidedmonkey);
  monkey.scale = 0.1;
  
  ground = createSprite(300, 370, 600, 10);
  ground.visible = false;
  
preload();
}

function draw() {
  background(220);
  
  monkey.collide (ground);
  monkey.velocityY = monkey.velocityY+0.8;
 
//Playstate
if (gameState === "PLAY"){
  
  if (frameCount % 80 === 0){
      spawnbananas();
  }
  
  if (frameCount % 180 === 0){
      spawnobstacles();
  }
  
  if (bananagroup.isTouching(monkey)){
     score = score + 2;
    bananagroup.destroyEach();
  }
  
  if (keyDown("space")&& monkey.y > 300){
  monkey.velocityY = -15;
  }
  
   switch(score/10){
    case 1: monkey.scale = 0.12;
      break;
    case 2: monkey.scale = 0.14;
      break;
    case 3: monkey.scale = 0.16;
      break;
    case 4: monkey.scale = 0.18;
      break;
    case 5: monkey.scale = 0.2;
      break;
      default: break;
  }
  
  if (rockgroup.isTouching(monkey)){
    if (score >= 10){
      score = score-10;
    }
    else {
     bananagroup.destroyEach();
     rockgroup.destroyEach();
      gameState = "END";
    }
    rockgroup.destroyEach();
  }
  
} else if (gameState === "END"){
bananagroup.setVelocityXEach (0);
rockgroup.setVelocityXEach (0);
  scene.velocityX = 0;
  monkey.changeAnimation("monkey2");
  if (keyDown("r")){
      gameState = "PLAY";
    scene.velocityX = -7;
    monkey.changeAnimation("monkey1");
    score = 0;
  }
}
 
  if  (scene.x < 20){
  scene.x = 575;
  }
  
  /*
  if (rockgroup.isTouching(monkey)&&monkey.scale === 0.08){
    score = 0;
    bananagroup.destroyEach();
    rockgroup.destroyEach();
    monkey.y = 340;
  }
  */
  drawSprites();
  textSize(20);
  stroke("white");
  fill("white");
  text("Score: " + score, 200, 100);
  textSize(20);
  stroke("white");
  fill("white");
  text("Press space to jump!", 200, 75);
  if (gameState === "END"){
  textSize(20);
  stroke("white");
  fill("white");
  text ("Game Over! Press R to restart!", 150, 200);
  }
}

function spawnbananas(){
  banana = createSprite(600, 175, 15, 15);
  banana.addImage("Banana1",bananaimage);
  banana.scale = 0.05;
  banana.velocityX = -7;
  
  bananagroup.add (banana);
  bananagroup.setLifetimeEach(87);
}

function spawnobstacles(){
  rock = createSprite(600, 340, 30, 50);
  rock.addImage("Stone1", rockimage);
  rock.scale = 0.15;
  rock.velocityX = -7;
  
  rockgroup.add(rock);
  rockgroup.setLifetimeEach(87);
}
