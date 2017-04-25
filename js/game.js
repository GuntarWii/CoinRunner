function startGame() {
    gameArea.start();

}

var gameArea = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = 720;
            this.canvas.height = 500;

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

var ground = new Image();
ground.src = "img/bg/tile.png";

var hero ={
    X: 0,
    Y: 350,
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
var walls =[
    {"id":ground,"x":0,"y":450,"w":50,"h":50},
     {"id":ground,"x":200,"y":400,"w":50,"h":50}
]


var map = {
    gravity: 1,
    groundY: 350,
    mapWalls:function(){
        var w = 70,
            h = 70,
            y = 488,
            x = 688
        for(var i = 0; i < 720; i += 50){
//                console.log(walls)               
            walls.push({"id":ground,"x":i,"y":450,"w":w,"h":h});

            }
    },
    renderObject:function(){
        ctx = gameArea.context
        for(var i = 0; i < walls.length; i++){
            
            var x = walls[i].x,
                y = walls[i].y,
                width = walls[i].w,
                height = walls[i].h,
                img = walls[i].id
            
            ctx.drawImage(walls[i].id, walls[i].x, walls[i].y,walls[i].w,walls[i].h);
            var x = walls[i].x,
                y = walls[i].y,
                width = walls[i].w,
                height = walls[i].h
//                img = walss[i].id
            
            
            optiones.collisionDetection(x,y,width,height);
        }
    }
}
map.mapWalls();
var optiones ={
    animatePlayer: function () {
    hero.currentFrame = hero.frameCount * 70; // frame counter position of next frame
        hero.frameCount++;
        if (hero.frameCount > 5) {
            hero.frameCount = 0;
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
                    //Right wall
//                    if (hero.X >= 550 - 89) {
//                        //move back player when it hits the wall
//                        hero.X = 550 - 89;
//                        console.log("right hit")
//                    }

                    //if player moves left
                } else {
                    //movieng speed
                    hero.VelX = -10;
                    //player sprite movien left
                    hero.img = img2;
                    //player movieng x postion + movieng speed
                    hero.X += hero.VelX;
                    //if player hits the wall on left side
//                    if (hero.X <= 0) {
//                        console.log("lef hit")
//                        hero.X = 0;
//                    }
                }


            }
        if (hero.animate == true) {
                gameArea.context.drawImage(hero.img, hero.currentFrame, 0, 70, 103, hero.X, hero.Y, 70, 100);
        }else{
            gameArea.context.drawImage(hero.img, 0, 0, 70, 103, hero.X, hero.Y, 70, 100);
        }
    },
    collisionDetection: function(x,y,width,height){
        
        
        var myleft = hero.X;
        var myright = hero.X + (70);
        var mytop = hero.Y;
        var mybottom = hero.Y + (100);
        
        var otherleft = x;
        var otherright = x + (width);
        var othertop = y;
        var otherbottom = y + (height);
//        console.log(width)
   
//        if(myright == otherleft && mybottom > othertop && mytop < otherbottom){
////                console.log("hero right side tuch")
//                hero.X = hero.X - 10
////                console.log(hero.x)
//            }
//        
//        if(mytop == otherbottom && myright > otherleft && myleft < otherright){
////                console.log("hero top side tuch")
////                hero.Y = hero.Y + 10                
//            }
//        if(mybottom == othertop && myleft < otherright && myright > otherleft){
//                console.log("hero bottom side tuch")
////                hero.Y = hero.Y - 10  
//        }
//        
//        if(myleft == otherright && mybottom > othertop && mytop < otherbottom){            
////           hero.X = hero.X + 10
////           console.log("hero left side tuch")
//           }
        
                    if (hero.X >= width + 75 && hero.Y < height) {
                        //move back player when it hits the wall
                        hero.X = width + 75;
                        console.log("right hit")
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
    gameArea.context.drawImage(img3, 0, 0,720,500);
//    gameArea.context.drawImage(hero.img, hero.currentFrame, 0, 70, 103, hero.X, hero.Y, 70, 100);
//    console.log(hero.X)
//    ctx.drawImage(boyImg, 0, 0, 89, 103, boyX, boyY, 89, 103);
}

function updateGameArea(){
    gameArea.clear();
    renderIn();
    optiones.animatePlayer();
    map.renderObject();
}
