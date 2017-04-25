function startGame() {
    gameArea.start();

}

var gameArea = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = 550;
            this.canvas.height = 400;

            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            
            this.interval = setInterval(updateGameArea, 20);
            //        console.log(gameArea.context)
            document.addEventListener("keydown", optiones.moveMe);
            document.addEventListener("keyup", optiones.stopMe);
            
//            player.renderIn()
        },

        clear: function () {
            
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }



    }

var img1 = new Image();
img1.src = "img/player/running/run.png";

var img2 = new Image();
img2.src = "img/player/running/runback.png";

var img3 = new Image();
img3.src = "img/bg/layer-1.png";

var hero ={
    X: 0,
    Y: 150,
    VelX: 10,
    VelY: 0,
    img: img1,
    dir: "right",
    framePos: 70,
    frameCount: 6,
    currentFrame: 0,
    moving: false,
    jumping: false,
    animate: false,
    
}


var map = {
    gravity: 2,
    groundY: 150,
}

var optiones ={
    animatePlayer: function () {
    hero.currentFrame = hero.frameCount * 70; // frame counter position of next frame
        hero.frameCount++;
        if (hero.frameCount > 5) {
            hero.frameCount = 0;
            console.log("asd")
        }
        if (hero.jumping == true) {
                // if player jump height + player Y position is biger or equal to  ground position
	            if (hero.Y + hero.VelY <= map.groundY) {
                    //now we are jumping
                    //player Y position + jump height
	                hero.Y += hero.VelY;
                    //jump height + gravity
	                hero.VelY += map.gravity;
	            } else {
                    // jump height can jump becouse jump height is 0
	                hero.VelY = 0;
                    //we cant jump
	                hero.jumping = false;
	            }
	        }
        if (hero.animate == true) {
                //if player go right
                if (hero.dir == "right") {
                    //player move right speed
                    hero.VelX = 10;
                    //player sprite movien right
                    hero.img = img1;
                    //player movieng x postion + movieng speed
                    hero.X += hero.VelX;
                    //if player hits the wall wall hit position
                    if (hero.X >= 550 - 89) {
                        //move back player when it hits the wall
                        hero.X = 550 - 89;
                    }

                    //if player moves left
                } else {
                   console.log("back")
                    //movieng speed
                    hero.VelX = -10;
                    //player sprite movien left
                    hero.img = img2;
                    //player movieng x postion + movieng speed
                    hero.X += hero.VelX;
                    //if player hits the wall on left side
                    if (hero.X <= 0) {
                        hero.X = 0;
                    }
                }


            }
        if (hero.animate == true) {
                gameArea.context.drawImage(hero.img, hero.currentFrame, 0, 70, 103, hero.X, hero.Y, 70, 100);
        }else{
            gameArea.context.drawImage(hero.img, 0, 0, 70, 103, hero.X, hero.Y, 70, 100);
        }
    },
    stopMe: function (e) {
        if (e.keyCode == 37 || e.keyCode == 39) {
            hero.animate = false;
        }
    },
    moveMe: function (e) {
        if (e.keyCode == 32 && !hero.jumping) {
            hero.jumping = true;
            //boyVelY Jump height
            hero.VelY = -20;
        }
        if (e.keyCode == 39) { //right

            hero.dir = "right";

            hero.animate = true;
        }
        if (e.keyCode == 37) { //left
            hero.dir = "left";
            hero.animate = true;
        }
    }
}

function renderIn(){
    gameArea.context.drawImage(img3, 0, 0);
//    gameArea.context.drawImage(hero.img, hero.currentFrame, 0, 70, 103, hero.X, hero.Y, 70, 100);
//    console.log(hero.X)
//    ctx.drawImage(boyImg, 0, 0, 89, 103, boyX, boyY, 89, 103);
}

function updateGameArea(){
    renderIn();
    optiones.animatePlayer();
}
