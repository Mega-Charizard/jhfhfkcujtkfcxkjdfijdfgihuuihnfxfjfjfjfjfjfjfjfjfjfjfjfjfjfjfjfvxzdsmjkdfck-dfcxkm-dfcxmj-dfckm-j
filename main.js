status_1 = "";
objects = [];

function preload()
{

}

function setup()
{
    canvas = createCanvas(600,550);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(600,550);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_1").innerHTML = "status: detecting objects";

    if (objects[0].ml5.js == document.getElementById("input1").value)
        {
            document.getElementById("obgects").innerHTML =  document.getElementById("input1").value + " " + "found";
        }

        else
        {
            document.getElementById("obgects").innerHTML =  document.getElementById("input1").value + " " + "not found";
        }
}

function modelLoaded()
{
    console.log("model has loaded");
    status_1 = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    else 
    {
        console.log(results);
        objects = results
    }
}

function draw()
{
    image(video,0,0,600,550);
    if (status_1 != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        document.getElementById("status_1").innerHTML = "status: objects detected";
        for (i = 0; i < objects.length; i++)
        {
            fill(r,g,b)
            document.getElementById("objects").innerHTML = " number of objects detected are: " + objects.length;
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}