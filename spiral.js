/*
    Golden spiral for website analysis. Draws a golden spiral on top of the page using a canvas.W
    Frode Eika Sandnes, Oslo Metropolitan University, February, 2022.
*/

var phi = (1+Math.sqrt(5))/2;   // golden ratio
//var startCorner="NE";

// Recursive drawing of the spiral inside rectangles.
function drawRect(w,h,ctx)
    {
    if (w < 3) // terminate recursion
        {
        return;
        }
    var goldenCut = w/phi;
    var newHeight = w - goldenCut;

    // add transparent background
    ctx.fillStyle = "rgba(255, 0, 255, 0.2)";   
    ctx.fillRect(0,0,w,h);
    ctx.beginPath();
    
    // draw red border around the current box
    ctx.strokeStyle = "rgb(255,0,0)";    
    ctx.lineWidth = 1;                     
    ctx.rect(0, 0, w, h); 
    ctx.stroke();           
    
    // draw the current part of the spiral
    ctx.beginPath();
    ctx.strokeStyle = "rgb(255,255,0)";
    ctx.lineWidth = 3;             
    ctx.ellipse(w/phi, h, w/phi, h, 0, Math.PI, Math.PI*3/2, false);
    ctx.stroke();

    // set up the next box
    ctx.translate(w,0);         // move to the next courner
    ctx.rotate(Math.PI/2);      // rotate 90 degree clockwise
    drawRect(h,newHeight,ctx);  // recursive call
    }

// adding event handler to ensure DOM is loaded.
window.addEventListener('DOMContentLoaded', (event) => 
    {
    // adding canvas to page
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'min-height:100%; width: 100%; position:fixed; top:0; right:0; bottom:0; left:0; z-index: 2; pointer-events: none;';
    canvas.id = "spiral";
    canvas.width = window.innerWidth;   // set the canvas equal to the browser viewport dimensions.
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    // return control to browser to allow the canvas to be included.
    setTimeout(drawCanvas,100);
    });

// drawing on the canvas
function drawCanvas()
    {
    console.log("Drawing on canvas...");
    var canvas = document.getElementById("spiral");
    var ctx = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height;

    if (typeof startCorner !== 'undefined')
        {
        console.log(startCorner);
        // uncomment the desired configuration

        if (startCorner === "SW")
            {
            // South-West clockwise
            ctx.scale(1,1);
            }
        if (startCorner === "SW")
            {
            // South-West anticlockwise
            ctx.scale(-1,1);
            ctx.translate(-w,0);
            }
        if (startCorner === "NW")
            {
            // North-West anticlockwise
            ctx.scale(1,-1);
            ctx.translate(0,-h);   
            }
        if (startCorner === "NW")
            {          
            // North-East clockwise
            ctx.scale(-1,-1);
            ctx.translate(-w,-h);
            }   
        }

    drawRect(w,h,ctx);    
    }