	var cv; //canvas
	var ctx; //context
	var img1 = new Image(); //Image = img tag
	var img2 = new Image();

	var animTime = null;
	var counter = 0; //counter for anim to run


	var boyX = 0;
	var boyY = 150; //player start position
	var boyVelY = 0;
	var boyVelX = 10;
	var boyImg = img1;
	var boyDir = "right";
	var allImageLoaded = 0;
	var totalimages = 2;

	var gravity = 2; // gravity
	var boyMoving = false;
	var boyJumping = false;
	var groundY = 150; // ground position

	function run() {
	    cv = document.getElementById("elaineboy");
	    ctx = cv.getContext("2d");

	    document.addEventListener("keydown", moveMe);
	    document.addEventListener("keyup", stopMe);
	    img1.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/160783/boy1.png";
	    img1.onload = function () { //image to load			 
	        allImageLoaded++
	    }
        //Load image
	    img2.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/160783/boy2.png";
	    img2.onload = function () {
            // how meny images to load
	        allImageLoaded++
	    }
	    animTime = setInterval(animBoy, 100);

	}

	function animBoy() {
	    var xpos = counter * 89; // frame counter position of next frame

	    counter++;
	    if (counter > 10) {
	        counter = 0;
	    }
        // if all images are loaded
	    if (allImageLoaded == 2) {
            // clear canvas
	        ctx.clearRect(0, 0, 550, 400);
            //if player jumps
	        if (boyJumping == true) {
                // if player jump height + player Y position is biger or equal to  ground position
	            if (boyY + boyVelY <= groundY) {
                    //now we are jumping
                    //player Y position + jump height
	                boyY += boyVelY;
                    //jump height + gravity
	                boyVelY += gravity;
	            } else {
                    // jump height can jump becouse jump height is 0
	                boyVelY = 0;
                    //we cant jump
	                boyJumping = false;
	            }
	        }
            //if player is movieng
	        if (animateBoy == true) {
            //if player go right
	            if (boyDir == "right") {
                    //player move right speed
	                boyVelX = 10;
                    //player sprite movien right
	                boyImg = img1;
                    //player movieng x postion + movieng speed
	                boyX += boyVelX;
                    //if player hits the wall wall hit position
	                if (boyX >= 550 - 89) {
                        //move back player when it hits the wall
	                    boyX = 550 - 89;
	                }
                    
                    //if player moves left
	            } else {
                    //movieng speed
	                boyVelX = -10;
                    //player sprite movien left
	                boyImg = img2;
                    //player movieng x postion + movieng speed
	                boyX += boyVelX;
                    //if player hits the wall on left side
	                if (boyX <= 0) {
	                    boyX = 0;
	                }
	            }


	        }
	        if (animateBoy == true) {
                // if player is movieng
	            ctx.drawImage(boyImg, xpos, 0, 89, 103, boyX, boyY, 89, 103);
	        } else {
                // if player is standin
	            ctx.drawImage(boyImg, 0, 0, 89, 103, boyX, boyY, 89, 103);
	        }
	    }
	    ctx.strokeStyle = "#ccc"; // flor color
	    ctx.lineWidth = 1; // flor width
	    ctx.moveTo(0, 251); // draw flor
	    ctx.lineTo(550, 251); // draw dlor
	    ctx.stroke();
	}

	var animateBoy = false;
// key up and stop the player
	function stopMe(e) {
	    if (e.keyCode == 37 || e.keyCode == 39) {
	        animateBoy = false;
	    }


	}
// move the player
	function moveMe(e) {

	    if (e.keyCode == 32 && !boyJumping) {
	        boyJumping = true;
            //boyVelY Jump height
	        boyVelY = -20;
	    }
	    if (e.keyCode == 39) { //right

	        boyDir = "right";

	        animateBoy = true;
	    }
	    if (e.keyCode == 37) { //left
	        boyDir = "left";

	        animateBoy = true;
	    }
	}
	run();