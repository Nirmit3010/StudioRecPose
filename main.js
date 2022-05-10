song="";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function preload()
{
    song=loadSound("[MP3DOWNLOAD.TO] The Magic Flute – Queen of the Night aria (Mozart; Diana Damrau, The Royal Opera)-320k.mp3");
}

function setup()
{
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log("Posenet Initialised");
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("ScoreLeftWrist="+scoreLeftWrist);
        console.log("ScoreRightWrist="+scoreRightWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("LeftWristX="+leftWristX+"LeftWristY="+leftWristY);
        console.log("RightWristX="+rightWristX+"RightWristY="+rightWristY);
    }
}
function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#090979");
    stroke("#090979");
    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX, leftWristY, 20);
        volume= (floor(Number(leftWristY)))/500;
        document.getElementById("volume").innerHTML="Volume="+volume;
        song.setVolume(volume);
    }
    if(scoreRightWrist>0.2)
    {
        circle(rightWristX, rightWristY, 20);
        if(rightWristY>0 && rightWristY<=100)
        {
            speed=0.5;
            song.rate(speed);
            document.getElementById("speed").innerHTML="Speed="+speed;
        }
        if(rightWristY>100 && rightWristY<=200)
        {
            speed=1;
            song.rate(speed);
            document.getElementById("speed").innerHTML="Speed="+speed;
        }
        if(rightWristY>200 && rightWristY<=300)
        {
            speed=1.5;
            song.rate(speed);
            document.getElementById("speed").innerHTML="Speed="+speed;
        }
        if(rightWristY>300 && rightWristY<=400)
        {
            speed=2;
            song.rate(speed);
            document.getElementById("speed").innerHTML="Speed="+speed;
        }
        if(rightWristY>400 && rightWristY<=500)
        {
            speed=2.5;
            song.rate(speed);
            document.getElementById("speed").innerHTML="Speed="+speed;
        }

    }

}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
    document.getElementById("speed_img").src="Moplay.jpg"
    document.getElementById("volume_img").src="Moplay.jpg"
}
function pause()
{
    song.pause();
    document.getElementById("speed_img").src="Mopause.jpg"
    document.getElementById("volume_img").src="Mopause.jpg"
}
function end()
{
    song.stop();
    document.getElementById("speed_img").src="Mostop.jpg"
    document.getElementById("volume_img").src="Mostop.jpg"
}
