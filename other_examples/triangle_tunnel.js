// Triangle Tunnel -- animate a set of mesmerizing nested triangle for a tunnel effect
// this uses an array to hold the colors of the current triangles

// GLOBALS
_సర్వత్ర_   sides = 80;


_విధానము_     triangle (side) {
  if (side < maxSide) {
    కేంద్రకమునకు_వెళ్ళు()
    కుంచికను_పైకి_ఎత్తు();
    ముందుకు_జరుగు(side/2);
    కుడి_వైపు_తిరుగు(150);
    కుంచికను_కింద_పెట్టు();
    for (_సర్వత్ర_   i=0; i<3; i++) {
      ముందుకు_జరుగు(side);
      కుడి_వైపు_తిరుగు(120);
    }
  }
}


_విధానము_     nestTri () {
  console.log("one more" + tColor + " sides:"+ sides)
  tColor.push(random (15));
  tColor.shift();
  for (_సర్వత్ర_   i=0; i<sides; i++) {
    రంగు_మార్చు(tColor[i]);
    triangle (i*15);
  }
}


_విధానము_     ప్రదర్శన() {
  ఆది_స్థితి()
  కుంచికను_దాచు()

  maxSide = 1.8* Math.min( గరిష్ఠX(), గరిష్ఠY())
  tColor = []
  for (_సర్వత్ర_   i=0; i<sides; i++) {
    tColor [i] = random (15)
  }
  ఆడించు(nestTri,1);
}

