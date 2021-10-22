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
var place;
var back;
var death = 0;
var game;
var hit;
var achieve, achieve2;
var dropimg;
var dropGroup;
var heart;
var life;
var ride1,ride2,ride3,ride4,ride;
var drop,drop2;

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

  circle = loadImage("Images/Rides/rideCircle.png");

  back = loadSound("Sounds/back.mp3");
  hit = loadSound("Sounds/Over.mp3");
  achieve = loadSound("Sounds/achieve.mp3");
  achieve2 = loadSound("Sounds/achieve2.mp3");

  dropimg = loadImage("Images/Rides/drop.png");
  heart = loadImage("Images/Rides/life.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(width/2, height/2);
  bg.addImage(bgimg);
  bg.scale = width/5000;
  bg.velocityY += 3;

  driver = createSprite(width/2, height/1.2);
  driver.addImage(car);
  driver.scale = width/2500;

  rideGroup = new Group();
  carGroup = new Group();
  rideGroup2 = new Group();
  dropGroup = new Group();

  life1 = createSprite(width/50, height/6.5);
  life1.addImage(heart);
  life1.scale = width/5000;

  life2 = createSprite(width/17, height/6.5);
  life2.addImage(heart);
  life2.scale = width/5000;

  life3 = createSprite(width/10, height/6.5);
  life3.addImage(heart);
  life3.scale = width/5000;

}

function draw() {
  background(0);
  //console.log(rideGroup);

  
  if (bg.y > 800) {
    bg.y = 500
  }

  if (death < 3) {

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
      back.play();

    }

    if (keyWentUp('s')) {
      driver.velocity.y = 0;
      back.stop();

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
      if (rideGroup2[i].isTouching(driver)) {
        if (rides < 4) {
          rideGroup2[i].destroy();
          rides++;
          achieve2.play();
        }
      }
    }

    for (var i = 0; i < rideGroup.length; i++) {
      if (rideGroup[i].isTouching(driver)) {
        rideGroup[i].destroy();
        hit.play();
        death++;
      }
    }

    for (var i = 0; i < dropGroup.length; i++) {
      if (dropGroup[i].isTouching(driver) && rides > 0) {
        dropGroup[i].destroy();
        achieve.play();
        rides--;
        completed++;
      }
    }

    driver.collide(carGroup, crash);

    if (death === 1) {
      life3.destroy();
    } else if (death === 2) {
      life2.destroy();
    }

    spawnRide();
    spawnCar();
    dropPoint();
  } else if (death === 3) {
    bg.velocityY = 0;
    driver.velocityY = 0;
    driver.velocityX = 0;
    carGroup.destroyEach();
    rideGroup.destroyEach();
    rideGroup2.destroyEach();
    dropGroup.destroyEach();
    engine.stop();
    hit.stop();
    back.stop();
    life1.destroy();
  }
  drawSprites();

  textSize(width/80);
  
  if (death === 3) {
    fill("red");
    text("Game Over", width/2.1, height/2);
  }
  if(completed === 5){
    fill("lightGreen");
    text("congratulations you won", width/2.2, height/2);
    bg.velocityY = 0;
    driver.velocityY = 0;
    driver.velocityX = 0;
    carGroup.destroyEach();
    rideGroup.destroyEach();
    rideGroup2.destroyEach();
    dropGroup.destroyEach();
    engine.stop();
    hit.stop();
    back.stop();
    console.log(completed);
  }
  push();
  textSize(width/100);
  fill("orange");
  text("current rides: " + rides, width/100, height/20);
  text("completed rides: "+completed, width/100, height/10);
  pop();
  textSize(width/100);
  push();
  fill("darkOrange");
  text("Use W,A,S,D to move your RED car",width/100, height/5);
  text("You can only pick those people with a red circle on them",width/100, height/4.5);
  text("You have to touch the green circle to complete a ride",width/100, height/4);
  pop();
  push();
  fill("violet")
  text("You have to complete 5 rides to win",width/100, height/3.5);
  text("If you use all your hearts then you will lose this game",width/100, height/3.2);
  text("You have Only 3 hearts",width/100, height/3);
  pop();

}

function crash(driver, obs) {
  hit.play();
  death++;
}

function spawnRide() {
  if (frameCount % 200 === 0) {
    var num = Math.round(random(1, 2));
    if (num === 1) {
      ride3 = createSprite(width/2.8, height/1000);
      ride3.velocityY += 3;
      ride3.addImage(circle);
      ride3.scale = 0.8;
      ride3.lifetime = 400;
      rideGroup2.add(ride3);
    } else if (num === 2) {
      var ride = createSprite(width/2.8, height/1000);
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
  }

    if (frameCount % 300 === 0) {
      var num = Math.round(random(1, 2));
      if (num === 1) {
        ride4 = createSprite(width/1.56, height/1000);
        ride4.velocityY += 3;
        ride4.addImage(circle);
        ride4.scale = 0.8;
        ride4.lifetime = 400
        rideGroup2.add(ride4);
      } else if (num === 2) {
        var ride2 = createSprite(width/1.56, height/1000);

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
        ride2.scale = 0.8;
        ride2.lifetime = 400;
        rideGroup.add(ride2);
      }
    }

  }


function spawnCar() {
  if (frameCount % 700=== 0) {
    var obs = createSprite(width/2.3, height/1000);

    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: obs.addImage(obs1);
        break;
      case 2: obs.addImage(obs2);
        break;
      default: break;
    }
    
    obs.scale = width/2500;
    obs.velocityY += 3;
    obs.lifetime = 400;
    carGroup.add(obs);
  }
  if (frameCount % 800 === 0) {
    var obss = createSprite(width/1.75, height/0.9);

    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: obss.addImage(obs3);
        break;
      case 2: obss.addImage(obs4);
        break;
      default: break;
    }

    obss.scale = width/2500;
    obss.velocityY -= 3;
    obss.lifetime = 400;
    carGroup.add(obss);
  }
}

function dropPoint() {
  if (frameCount % 500 === 0) {
    drop = createSprite(width/2.42, height/1000);
    drop.velocityY += 3;
    drop.addImage(dropimg);
    drop.scale = width/5000;
    driver.depth += drop.depth;
    drop.lifetime = 400;
    dropGroup.add(drop);
  }
  if (frameCount % 700 === 0) {
    drop2 = createSprite(width/1.72,height/1000);
    drop2.velocityY += 3;
    drop2.addImage(dropimg);
    drop2.scale = width/5000;
    driver.depth += drop2.depth;
    drop2.lifetime = 400;
    dropGroup.add(drop2);
  }
}