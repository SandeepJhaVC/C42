var driver

var bgimg, bg;

var ride;

var rides = 0;
var completed = 0

function preload() {
  bgimg = loadImage("Road.png");
}

function setup() {
  createCanvas(displayWidth - 30, displayHeight);

  

  bg = createSprite(100, 100, 50, 10);
  bg.addImage(bgimg);
  bg.velocityY = 4;

  driver = createSprite(200, 200, 50, 50);

  ride = createSprite(400,200,30,20);

}

function draw() {
  background(0);

  camera.position.x = driver.x;
  camera.position.y = driver.y;

  

  if (bg.y > displayHeight) {
    bg.y = displayHeight / 2;
  }

  if (keyWentDown('w')) {
    driver.velocityY = -5;
  }

  if (keyWentUp('w')) {
    driver.velocityY = 0;
  }

  if (keyWentDown('s')) {
    driver.velocity.y += 5;
  }

  if (keyWentUp('s')) {
    driver.velocity.y = 0;
  }

  if (keyWentDown('a')) {
    driver.velocity.x -= 5;
  }

  if (keyWentUp('a')) {
    driver.velocity.x = 0;
  }

  if (keyWentDown('d')) {
    driver.velocity.x += 5;
  }

  if (keyWentUp('d')) {
    driver.velocity.x = 0;
  }

  

  spawnRider();

  drawSprites();

  textSize(30);
  fill("red")
  text("Total rides: "+ completed,10,10);

}

function spawnRider() {
  if(driver.isTouching(ride)){
    ride.destroy();
    ride = createSprite(200,random(100,500),20,30);
    completed ++;
    rides = 1;
  }

}