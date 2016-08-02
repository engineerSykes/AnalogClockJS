window.onload = function()
{
    var canvas    = document.getElementById('clock'),
        ctx       = canvas.getContext('2d'),
        width     = 400,
        height    = 400,
        radius = height / 2;

    var circle = {
        full :  degToRad(360),
        half :  degToRad(180),
        quarter :  degToRad(360)
      };

    ctx.translate(radius, radius);
    radius = radius * 0.90;

    setInterval(drawClock, 1000);

   function drawClock()
   {
     drawFace(ctx, radius);
     drawNumbers(ctx, radius);
     drawTime(ctx, radius);
   }

   function drawFace(ctx, radius)
   {
       var grad, radGrad;

       ctx.beginPath();
       ctx.arc(0, 0, radius, 0, circle.full);
       ctx.fillStyle  = '#ccd';
       ctx.fill();

       grad = ctx.createRadialGradient( 0, 0, radius*0.95,
                                        0, 0, radius*1.05);
       grad.addColorStop(0, '#335');
       grad.addColorStop(0.5, '#bfb');
       grad.addColorStop(1, '#335');
       ctx.strokeStyle = grad;
       ctx.lineWidth = radius*0.1;
       ctx.stroke();

       //Central Circle to cover the ends of the hands
       ctx.beginPath();
       ctx.arc(0, 0, radius*0.1, 0, circle.full);
       ctx.fillStyle  = "#334444";
       ctx.fill();
   }

//Helper function to convert degrees to radians
   function degToRad(degrees)
   {
     return (degrees * (Math.PI/180));
   }      // function degToRag

   function drawNumbers(ctx, radius)
   {
     var ang, num;

     ctx.font = radius*0.20 + "px arial";
     ctx.textBaseline="middle";
     ctx.textAlign="center";

    // Loop for displaying the numbers of the clock face
     for(num= 1; num < 13; num++)
     {
       ang = num * Math.PI / 6;
       ctx.rotate(ang);
       ctx.translate(0, -radius*0.85);
       ctx.rotate(-ang);
       ctx.fillText(num.toString(), 0, 0);
       ctx.rotate(ang);
       ctx.translate(0,radius*0.85);
       ctx.rotate(-ang);
     }
   }      // function drawNumbers

   function drawTime(ctx, radius)
   {
     var now     = new Date(),
         hour    = now.getHours(),
         minute  = now.getMinutes(),
         second  = now.getSeconds();

    // hour
     hour %= 12;
     hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))
            +(second*Math.PI/(360*60));
     drawHand(ctx, hour, radius*0.5, radius*0.07);
     console.log("Hours: "+hour);

     //minute
     minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
     drawHand(ctx, minute, radius*0.8, radius*0.07);
     console.log("Minutes: "+minute);

     //second
     second = (second*Math.PI/30);
     drawHand(ctx, second, radius*0.9, radius*0.02);
   }      // function drawTime

   function drawHand(ctx, pos, length, width)
   {

     ctx.beginPath();
     ctx.strokeStyle = '#334444';
     ctx.lineWidth = width;
     ctx.lineCap = "round";
     ctx.moveTo(0,0);
     ctx.rotate(pos);
     ctx.lineTo(0, -length);
     ctx.stroke();
     ctx.rotate(-pos);
   }      // function drawHand
}      // window.onload()
