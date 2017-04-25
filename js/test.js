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
            document.addEventListener("keydown", player.moveMe);
            document.addEventListener("keyup", player.stopMe);
//            player.renderIn()
        },

        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }



    }


var img1 = new Image();
img1.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/160783/boy1.png";
img1.onload = function () { //image to load			 
    player.allImageLoaded++
}

var img2 = new Image();
img2.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/160783/boy2.png";
img2.onload = function () {
    // how meny images to load
    player.allImageLoaded++
}

var img3 = new Image();
img2.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/160783/boy2.png";



        //Load image



var player = {

    animTime: null,
    counter: 2,

    X: 0,
    Y: 150,
    VelX: 10,
    VelY: 0,

    playerImg: img1,
    playerDir: "right",

    allImageLoaded: 0,
    totalimages: 2,

    gravity: 2, // gravity
    playerMoving: false,
    playerJumping: false,
    playerAnimate: false,
    groundY: 150, // ground position


    animatePlayer: function () {
        var xpos = player.counter * 89; // frame counter position of next frame
        player.counter++;
        if (player.counter > 10) {
            player.counter = 0;
        }
        
        console.log(player.Y)
        // if all images are loaded
        if (player.allImageLoaded == 2) {
            //if player jumps
             gameArea.context.clearRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
            
            if (player.playerJumping == true) {
                
                // if player jump height + player Y position is biger or equal to  ground position
                
                if (player.Y + player.VelY <= player.groundY) {
                    //now we are jumping
                    //player Y position + jump height
                    
                    player.Y += player.VelY;
                    //jump height + gravity
                    
                    player.Y += player.gravity;
                } else {
                    
                    // jump height can jump becouse jump height is 0
                    
                    player.VelY = 0;
                    //we cant jump
                    player.playerJumping = false;
                }
            }
            //if player is movieng
            if (player.playerAnimate == true) {
                //if player go right
                if (player.playerDir == "right") {
                    //player move right speed
                    player.VelX = 10;
                    //player sprite movien right
                    player.playerImg = img1;
                    //player movieng x postion + movieng speed
                    player.X += player.VelX;
                    //if player hits the wall wall hit position
                    if (player.X >= 550 - 89) {
                        //move back player when it hits the wall
                        player.X = 550 - 89;
                    }

                    //if player moves left
                } else {
                    //movieng speed
                    player.VelX = -10;
                    //player sprite movien left
                    player.playerImg = img2;
                    //player movieng x postion + movieng speed
                    player.X += player.VelX;
                    //if player hits the wall on left side
                    if (player.X <= 0) {
                        player.X = 0;
                    }
                }


            }
            if (player.playerAnimate == true) {
                // if player is movieng
                gameArea.context.drawImage(player.playerImg, xpos, 0, 89, 103, player.X, player.Y, 89, 103);
            } else {
                // if player is standin
                gameArea.context.drawImage(player.playerImg, 0, 0, 89, 103, player.X, player.Y, 89, 103);
            }
        }

       
    },
    stopMe: function (e) {
        if (e.keyCode == 37 || e.keyCode == 39) {
            player.playerAnimate = false;
        }
    },
    moveMe: function (e) {
        if (e.keyCode == 32 && !player.playerJumping) {
            player.playerJumping = true;
            //boyVelY Jump height
            player.VelY = -20;
        }
        if (e.keyCode == 39) { //right

            player.playerDir = "right";

            player.playerAnimate = true;
        }
        if (e.keyCode == 37) { //left
            player.playerDir = "left";

            player.playerAnimate = true;
        }
    }
}


function updateGameArea() {
    player.animatePlayer();

}

