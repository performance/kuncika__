// Arc and Curve Test -- test of arcs and curves
// this draws five figures

function radialArc (x, y, startRadius, armAngle, tangentAngle, arcRadius, extent, dir) {
  స్థితి_మార్చు(x,y);
  కలమును_పైకి_ఎత్తు();
  కోణము(armAngle);
  ముందుకు_జరుగు(startRadius);
  కుడి_వైపు_తిరుగు(tangentAngle);
  కలమును_కింద_పెట్టు();
  వృత్తము(arcRadius,extent, dir);
}


function turbine(x,y, వ్యాసార్థము, pedals, dir) {
  for (i=0; i<pedals; i++) {
    if (dir) {
      radialArc (x,y, వ్యాసార్థము, 360*i/pedals, -135, 10, 90, dir);
    } else {
      radialArc (x,y, వ్యాసార్థము, 360*i/pedals, 45, 10, 90, !dir);
    }
  }
}

function roundedOctogon (side, వ్యాసార్థము) {
  repeat((8), function () {
    ముందుకు_జరుగు(side);
    curveright(వ్యాసార్థము,45);
  })
}


function roundedOctogonL (side, వ్యాసార్థము) {
  repeat((8), function () {
    ముందుకు_జరుగు(side);
    curveleft(వ్యాసార్థము,45);
  })
}


function circleEyeR (x, y, n, outerRadius) {
  స్థితి_మార్చు (x, y);
  circle (outerRadius); //outer circle

  for (var i=0; i<n; i++) {
    స్థితి_మార్చు (x, y);
    కోణము (i/n * 360);
    కలమును_పైకి_ఎత్తు();
    ముందుకు_జరుగు(outerRadius);
    కుడి_వైపు_తిరుగు(90)
    కలమును_కింద_పెట్టు();
    write(i)
    curveRight(outerRadius/2) // one inscribed circle
  }
}

function circleEyeL (x, y, n, outerRadius) {
  స్థితి_మార్చు (x, y);
  circle (outerRadius); //outer circle

  for (var i=0; i<n; i++) {
    స్థితి_మార్చు (x, y);
    కోణము (i/n * 360);
    కలమును_పైకి_ఎత్తు();
    ముందుకు_జరుగు(outerRadius);
    కలమును_కింద_పెట్టు();
    ఎడమ_వైపు_తిరుగు(90)
    write(i)
    curveLeft(outerRadius/2); // one inscribed circle
  }
}


function demo () {
  var CW = true;
  var CCW = false;
  var size = 2 * Math.min(గరిష్ఠX(), గరిష్ఠY())
  var cellSize = size/3

  //divide area into 6 cells: 2 vertical, 3 horizontal
  // centers are:
  v1 = +1/4 * size
  v2 = -1/4 * size
  h1 = -2/6 * size
  h2 = 0
  h3 = +2/6 * size

  ఆది_స్థితి();
  కుంచికను_దాచు();

  tSize = cellSize/2 * .90
// turbine(x,y, వ్యాసార్థము, pedals, dir) {
  turbine (h1, v1, 10/55*tSize, 8, CW);
  turbine (h1, v1, 25/55*tSize, 16, CCW);
  turbine (h1, v1, 40/55*tSize, 32, CW);
  turbine (h1, v1, 55/55*tSize, 64, CCW);


  var pedals = 8;
  tSize = cellSize/2 * .90
  for (i=0; i<pedals; i++) {
//radialArc (x, y, startRadius, armAngle, tangentAngle, arcRadius, extent, dir)
    radialArc (h2, v1, 10/60*tSize, 360*i/pedals, -45, 10/60*tSize, 180, CW); // inner shell
    radialArc (h2, v1, 40/60*tSize, 360*i/pedals, -125, 15/60*tSize, 110, CCW); //inside arc
    radialArc (h2, v1, 40/60*tSize, 360*i/pedals, -85, 18/60*tSize, 170, CW); //outside arcs
    radialArc (h2, v1, 41/60*tSize, 360*i/pedals, 0, 10/60*tSize, 360, CW); // radial circles
  }
  

  స్థితి_మార్చు(h2, v1);
  వృత్తము(60/60 * tSize);

  స్థితి_మార్చు( h1, v2)
  కోణము(0)
  oRadius = cellSize/2 * .9
  cRadius = .3 * oRadius
  curveLoss = cRadius * Math.tan( degToRad( 22.5))
  side = 2 * oRadius * Math.sin( degToRad(22.5)) -  2* curveLoss
  height = oRadius * Math.cos( degToRad( 22.5))
  కలమును_పైకి_ఎత్తు()
  ముందుకు_జరుగు(height)
  కలమును_కింద_పెట్టు()
  కుడి_వైపు_తిరుగు(90)
  వెనుకకు_జరుగు(side/2)
  roundedOctogon( side, cRadius)

  స్థితి_మార్చు( h1, v2)
  కోణము(0)
  oRadius = cellSize/2 * .8
  cRadius = .3 * oRadius
  curveLoss = cRadius * Math.tan( degToRad( 22.5))
  side = 2 * oRadius * Math.sin( degToRad(22.5)) -  2* curveLoss
  height = oRadius * Math.cos( degToRad( 22.5))
  కలమును_పైకి_ఎత్తు()
  ముందుకు_జరుగు(height)
  కలమును_కింద_పెట్టు()
  కుడి_వైపు_తిరుగు(90)
  వెనుకకు_జరుగు(side/2)
  roundedOctogon( side, cRadius)

  స్థితి_మార్చు( h1, v2)
  కోణము(22.5)
  oRadius = cellSize/2 * .7
  cRadius = .3 * oRadius
  curveLoss = cRadius * Math.tan( degToRad( 22.5))
  side = 2 * oRadius * Math.sin( degToRad(22.5)) -  2* curveLoss
  height = oRadius * Math.cos( degToRad( 22.5))
  కలమును_పైకి_ఎత్తు()
  ముందుకు_జరుగు(height)
  కలమును_కింద_పెట్టు()
  కుడి_వైపు_తిరుగు(90)
  వెనుకకు_జరుగు(side/2)
  roundedOctogon( side, cRadius)

  స్థితి_మార్చు( h1, v2)
  కోణము(22.5)
  oRadius = cellSize/2 * .6
  cRadius = .3 * oRadius
  curveLoss = cRadius * Math.tan( degToRad( 22.5))
  side = 2 * oRadius * Math.sin( degToRad(22.5)) -  2* curveLoss
  height = oRadius * Math.cos( degToRad( 22.5))
  కలమును_పైకి_ఎత్తు()
  ముందుకు_జరుగు(height)
  కలమును_కింద_పెట్టు()
  కుడి_వైపు_తిరుగు(90)
  వెనుకకు_జరుగు(side/2)
  roundedOctogon( side, cRadius)

  circleEyeR( h2, v2, 16, cellSize/2 * .8);
  circleEyeL( h3, v2, 16, cellSize/2 * .8);
}
