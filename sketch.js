var driver, car, bgimg, bg;
var rides = 0;
var completed = 0;
var ride1img, ride2img, ride3img;
var right, left;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var engine;
var rideGroup, carGroup;
var obs1, obs2, obs3, obs4;
var ride3;
var circle;
var rideGroup2;
var finish, leaderboard;

function preload() {
  bgimg = loadImage("Images/Road.png");

  car = loadImage("Images/car/car1.png");
  right = loadImage("Images/car/carRight.png");
  left = loadImage("Images/car/carLeft.png");

  ride1img = loadImage("Images/Rides/ride1.png");
  ride2img = loadImage("Images/Rides/ride2.png");
  ride3img = loadImage("Images/Rides/ride3.png");

  obs1 = loadImage("Images/DownObs/carDon1.png");
  obs2 = loadImage("Images/DownObs/carDon2.png");
  obs3 = loadImage("Images/UpObs/carUp1.png");
  obs4 = loadImage("Images/UpObs/carUp2.png");

  engine = loadSound("Sounds/Engine.mp3");
  finish = loadSound("Sounds/Finish.mp3")
  leaderboard = loadSound("Sounds/Leaderboard.mp3");

  circle = loadImage("Images/Rides/rideCircle.png");
}

function setup() {
  createCanvas(2000, 1000);

  bg = createSprite(1000, 500);
  bg.addImage(bgimg);
  bg.scale = 0.5;
  bg.velocityY += 3;

  driver = createSprite(1000, 800);
  driver.addImage(car);

  rideGroup = new Group();
  carGroup = new Group();
  rideGroup2 = new Group();

}

function draw() {
  background(0);
  //console.log(rideGroup);

  if (bg.y > 1000) {
    bg.y = 500
  }

  if (driver.y < -1060) {
    bg.y = -1060;
  }

  if (keyWentDown('w')) {
    driver.velocityY = -5;
    engine.play();

  }

  if (keyWentUp('w')) {
    driver.velocityY = 0;
    engine.stop();

  }

  if (keyWentDown('s')) {
    driver.velocity.y += 5;

  }

  if (keyWentUp('s')) {
    driver.velocity.y = 0;

  }

  if (keyWentDown('a')) {
    driver.velocity.x -= 5;
    driver.addImage(left);
    engine.play();

  }

  if (keyWentUp('a')) {
    driver.velocity.x = 0;
    driver.addImage(car);
    engine.stop();

  }

  if (keyWentDown('d')) {
    driver.velocity.x += 5;
    driver.addImage(right);
    engine.play();

  }

  if (keyWentUp('d')) {
    driver.velocity.x = 0;
    driver.addImage(car);
    engine.stop();

  }

  for (var i = 0; i < rideGroup2.length; i++) {
    if (rideGroup2.isTouching(driver)) {
      rideGroup2.get(i).destroy();
      completed++;
      leaderboard.play()
    }
  }

  driver.collide(carGroup, crash)

  spawnRide();
  spawnCar();

  drawSprites();

  textSize(30);
  fill("red")
  text("Total rides: " + completed, 100, 100);

}

function crash(driver, obs){
finish.play();
}

function spawnRide() {
  if (frameCount % 200 === 0) {
    var num = Math.round(random(1, 2));
    console.log(num);
    if (num === 1) {
      ride3 = createSprite(650, -100, 150, 150);
      ride3.velocityY += 3;
      ride3.addImage(circle);
      rideGroup2.add(ride3);
    } else if (num === 2) {
      var ride = createSprite(650, -100);
      ride.velocityY += 3;


      var rand = Math.round(random(1, 3));
      switch (rand) {
        case 1: ride.addImage(ride1img);
          break;
        case 2: ride.addImage(ride2img);
          break;
        case 3: ride.addImage(ride3img);
        default: break;
      }

      ride.scale = 0.8;
      ride.lifetime = 400;
      rideGroup.add(ride);
    }
    if (frameCount % 300 === 0) {
      var ride2 = createSprite(1350, -100);

      var rand = Math.round(random(1, 3));
      switch (rand) {
        case 1: ride2.addImage(ride1img);
          break;
        case 2: ride2.addImage(ride2img);
          break;
        case 3: ride2.addImage(ride3img);
        default: break;
      }

      ride2.velocityY += 3;
      ride2.scale = 0.7;
      ride2.lifetime = 400;
      rideGroup.add(ride2);
    }

  }

}

function spawnCar() {
  if (frameCount % 700 === 0) {
    var obs = createSprite(800, -100);

    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: obs.addImage(obs1);
        break;
      case 2: obs.addImage(obs2);
        break;
      default: break;
    }

    obs.velocityY += 3;
    obs.lifetime = 400;
    carGroup.add(obs);
  }
  if (frameCount % 800 === 0) {
    var obss = createSprite(1200, 1200);

    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: obss.addImage(obs3);
        break;
      case 2: obss.addImage(obs4);
        break;
      default: break;
    }

    obss.velocityY -= 3;
    obss.lifetime = 400;
    carGroup.add(obss);
  }
}