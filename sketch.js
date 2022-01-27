var mario;
var ground;
var life = 200;
var spaceIsActive = false;
var rightIsActive = false;
var mushRoomGroup,superMushRoomGroup;
function preload() {
    mario_running = loadAnimation("1.png", "2.png", "3.png", "5.png", "4.png", "7.png")
    mario_jumping = loadAnimation("11.png", "22.png", "33.png", "44.png", "55.png", "66.png", "77.png")
    obstacle1 = loadAnimation("o1.png", "o2.png", "o3.png")
    obstacle2 = loadAnimation("z1.png", "z2.png", "z3.png")
    pointAnimation = loadAnimation("p1.png", "p2.png", "p3.png");
    backgroundImage = loadImage("background.png")
}

function setup() {
    createCanvas(800, 300);
    ground = createSprite(400, -80, 800, 20)
    ground.addImage("background.png", backgroundImage)
    ground.scale = 0.9;
    iground = createSprite(400, 280, 800, 20)
    iground.visible = false;
    mario = createSprite(100, 245, 60, 60);
    mario.scale = 0.33
    mario.addAnimation("running", mario_running);
    mario.addAnimation("jumping", mario_jumping);
    mushRoomGroup = new Group();
    superMushRoomGroup = new Group();
}
function draw() {
    background(50, 50, 50);

    //console.log(mario.y)
    if (keyDown("up") && mario.y >= 180) {
        spaceIsActive = true
        mario.velocityY = -11;
        //mario.changeAnimation("jumping", mario_jumping);
    }

    if (keyDown("right") && mario.x > 0) {
        mario.x += 2
       
    }
    if (keyDown("left") && mario.x > 0) {
        mario.x -= 2
    }
    mario.velocityY = mario.velocityY + 0.6;
    ground.velocityX = -4
    if (ground.x < 0) {
        ground.x = ground.width / 2 - 100;
    }
    spawnPoints()
    spawnObstacles()
    if(frameCount %130==0){
        var rand = Math.round(random(1,5));
        console.log(rand);
        if(rand == 3){
            superPoint = createSprite(800, 200, 20, 20)
            superPoint.addAnimation("points", pointAnimation)
            superPoint.scale = 3;
            superPoint.velocityX = -2;
            superMushRoomGroup.add(superPoint);
            mario.collide(superMushRoomGroup,marioHitH)
        }
    }
    mario.collide(iground)
    drawSprites();

    if (spaceIsActive == true) {
        if (frameCount % 10 == 0) {
            life = life - 2
        }
    }
    mario.collide(mushRoomGroup,marioHit)
    
    push();
    fill("white")
    rect(80, 20, 200, 20);
    pop();
    push();
    fill("teal")
    rect(80, 20, life, 20);
    pop();
}
function marioHit(mario,point){
    point.remove();
    life = life +10;
}
function marioHitH(mario,superPoint){
    superPoint.remove();
    life = 200;
}
function spawnPoints() {
    if (frameCount % 300 === 0) {
        point = createSprite(800, 240, 20, 20)
        point.addAnimation("points", pointAnimation)
        point.scale = 1.5;
        point.velocityX = -2;
        mushRoomGroup.add(point);
    }
}

function spawnObstacles() {
    if (frameCount % 200 === 0) {
        obstacle = createSprite(800, 240, 20, 20)
        obstacle.addAnimation("obstacles", obstacle1)
        obstacle.scale = 3;
        obstacle.velocityX = -5;
    }
}

