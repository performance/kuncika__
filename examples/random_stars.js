// Random Stars -- draw stars randomly on the canvas

function star (side, sColor) {
  కలమును_పైకి_ఎత్తు()
  ముందుకు_జరుగు(.54*side)
  turn (180-18)
  కలమును_కింద_పెట్టు()
  var i=0
  beginShape()
  while (i<5){
    ముందుకు_జరుగు(side)
    కుడి_వైపు_తిరుగు(180-36)
    i = i + 1
  }
  fillShape(sColor)
  turn (180+18)
}


function demo () {
  ఆది_స్థితి()
  for (i=1; i< 150; i=i+1) {
    goto (random(కనిష్ఠX(),గరిష్ఠX()), random( కనిష్ఠY(),గరిష్ఠY()))
    ఎడమ_వైపు_తిరుగు(random(359))
    star (random(2,15), random(15))
  }
  కుంచికను_దాచు()
}
