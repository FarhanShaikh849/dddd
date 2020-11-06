var SERVE = 0;
var PLAY = 1;
var END = 2;
var gameState = SERVE;

var flappyBird, flappyBirdImg;
var backgroundImg;
var obstacle1, obstacle1Img, obstacle2, obstacle2Img;
var gameOver, gameOverImg;
var line1, line2;

var score = 0;

function preload(){

  flappyBirdImg = loadImage("flappy0.png");

  backgroundImg = loadImage("bg0.jpg");

  obstacle1Img = loadImage("obstacle.jpg");
  obstacle2Img = loadImage("obstacle2.jpg");

  gameOverImg = loadImage("over.png");

}

function setup() {
  createCanvas(1500, 600);

  line1 = createSprite(750,599,1500,5);
  line1.visible = false;

  line2 = createSprite(750,1,1500,5);
  line2.visible = false;


  gameOver = createSprite(750,250,0,0);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  flappyBird = createSprite(100,300,50,50);
  flappyBird.addImage(flappyBirdImg);
  flappyBird.scale = 0.12;

  obstacle1Group = new Group();
  obstacle2Group = new Group();

  flappyBird.setCollider("circle",0,0,150);
  //flappyBird.debug = true

  score = 0;
  
}

function draw() {

  background(backgroundImg);

  textSize(25);
  fill("black");
  stroke("black");
  strokeWeight(1);
  text("Score: "+ score, 75, 50);

  if(gameState === SERVE){

    textSize(35);
    fill("black");
    stroke("black");
    strokeWeight(1);
    text("Note: Press Space To Survive", 500, 250)
    text("Press S To Start", 600, 300);

    if(keyDown("S")){
      gameState = PLAY;
    }

  }

  if(gameState === PLAY){

    score = score + Math.round(getFrameRate()/60);

    //For applying gravity
    flappyBird.velocityY = flappyBird.velocityY + 0.8;

    if(keyDown("space")){
      flappyBird.velocityX = +0.3;
      flappyBird.velocityY = -10;
    }

    if(obstacle1Group.isTouching(flappyBird) || obstacle2Group.isTouching(flappyBird)){
      gameState = END;
    }

    if(line1.isTouching(flappyBird) || line2.isTouching(flappyBird)){
      gameState = END;
    }

    obstacle1Spawn();
    obstacle2Spawn();
  }

  if(gameState === END){

    gameOver.visible = true;

    textSize(30);
    fill("black");
    stroke("black");
    strokeWeight(1);
    text("You Lost!", 700, 400);

    flappyBird.velocityX = 0;
    flappyBird.velocityY = 0;

    obstacle1Group.setVelocityXEach(0);
    obstacle2Group.setVelocityXEach(0);

    obstacle1Group.setLifetimeEach(-1);
    obstacle2Group.setLifetimeEach(-1);

  }

  drawSprites();
}

function obstacle1Spawn(){
  if(frameCount % 150 === 0){
    obstacle1 = createSprite(1500,0,0,0);
    obstacle1.y = Math.round(random(30,100));
    obstacle1.addImage(obstacle1Img);
    obstacle1.scale = 2.5;
    obstacle1.velocityX = -3;
    obstacle1.lifetime = 510;
    obstacle1Group.add(obstacle1);
  }
}

function obstacle2Spawn(){
  if(frameCount % 150 === 0){
    obstacle2 = createSprite(1500,0,0,0);
    obstacle2.y = Math.round(random(500,550));
    obstacle2.addImage(obstacle2Img);
    obstacle2.scale = 2.5;
    obstacle2.velocityX = -3;
    obstacle2.lifetime = 510;
    obstacle2Group.add(obstacle2);
  }
}