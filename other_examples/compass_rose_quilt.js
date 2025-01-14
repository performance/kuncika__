// Compass Rose Quilt -- draw a compass rose quilt

//### CONTROLING VARIABLES
//number of main divisions of the directional triangles
mainDivisions = 4
//number of divisions in the most triangles
subDivisions8 = 3
//number of main divisions in 16th points
mainDivisions16 = 2
//number of subdivisions in 16th points
subDivisions16 = 2
//number of main divisions in 32nds points
mainDivisions32 = 1
//number of subdivisions in 32nds points
subDivisions32 = 3

//color of background
backgroundColor = "blue"
//color of compass background
compassBackgroundColor = "నలుపు"
//color of text
compassTextColor = "white"
//color of inner direction background
inner8BackgroundColor = "నలుపు"
//color of inward direction (array)
inner8Colors = ["gold", "salmon"]

//color of outer direction background
outer8BackgroundColor = "నలుపు"
//color of outer direction (array)
outer8Colors = ["yellow", "red"]


//background color of 16ths
background16Color = "gold"
//foreground color of 16ths
foreground16Color = "salmon"
//background color of 32nds
background32Color = "నలుపు"
//foreground color of 32nds
foreground32Color = "yellow"


_విధానము_     indexColor(index, colors) {
  _సర్వత్ర_   len = colors.length
  _ఫలము_  colors[ index % len]
}


_విధానము_     triangle (side){
  ముందుకు_జరుగు(side)
  a = 45
  b = (180-a)/2
  కుడి_వైపు_తిరుగు(180 - b)
  //ముందుకు_జరుగు(.748* side)
  ముందుకు_జరుగు(side * 2 * Math.sin(a/2/360*6.28))
  కుడి_వైపు_తిరుగు(180 - b)
  ముందుకు_జరుగు(side)
  కుడి_వైపు_తిరుగు(180-a)
}


_విధానము_     splitTri(outerSide, num, foreColor, triSide) {
  _సర్వత్ర_   i, j
  
  if (triSide == undefined) {
    triSide = outerSide
  }
  innerSide = triSide / num
  for (j = num; j >0; j = j - 1) {
     for (i = 0; i <j; i = i + 1) {
        ఆకారము_ప్రారంభించు()
        triangle (innerSide)
        ఆకారము_ముగించు(foreColor)
        కుంచికను_పైకి_ఎత్తు()
        ముందుకు_జరుగు(innerSide)
        కుంచికను_కింద_పెట్టు()
    }
    కుంచికను_పైకి_ఎత్తు()
    వెనుకకు_జరుగు( j * innerSide)
    కుడి_వైపు_తిరుగు(45)
    ముందుకు_జరుగు( innerSide)
    ఎడమ_వైపు_తిరుగు(45)
    కుంచికను_కింద_పెట్టు()
  }
  కుంచికను_పైకి_ఎత్తు()
  కుడి_వైపు_తిరుగు(45)
  వెనుకకు_జరుగు( innerSide * num)
  ఎడమ_వైపు_తిరుగు(45)
  కుంచికను_కింద_పెట్టు()
}


_విధానము_     flipSplitTri( outerSide, num, foreColor, triSide) {
  కుంచికను_పైకి_ఎత్తు()
  ముందుకు_జరుగు( outerSide)
  కుడి_వైపు_తిరుగు( 45)
  ముందుకు_జరుగు( outerSide)
  కుడి_వైపు_తిరుగు( 180-45)
  కుంచికను_కింద_పెట్టు()
  splitTri( outerSide, num, foreColor, triSide)
  కుంచికను_పైకి_ఎత్తు()
  కుడి_వైపు_తిరుగు( 45)
  ముందుకు_జరుగు( outerSide)
  ఎడమ_వైపు_తిరుగు( 45)
  ముందుకు_జరుగు( outerSide)
  ఎడమ_వైపు_తిరుగు( 180)
  కుంచికను_కింద_పెట్టు()
}


_విధానము_     labelPoints(size) {
  కుంచికను_పైకి_ఎత్తు()
  కోణము( 0)
  boxedCompass=["N", "NxE", "NNE", "NExN", "NE", "NExE", "ENE", "ExN", "E", "ExS", "ESE", "SExE", "SE", "SExS", "SSE", "SxE", "S", "SxW", "SSW", "SWxS", "SW", "SWxW", "WSW", "WxS", "W", "WxN", "WNW", "NWxW", "NW", "NWxN", "NNW", "NxW"]

  // fill in the compass background

  //textRadius = side*5.7
  textRadius = size*.88
  రంగు_మార్చు( compassTextColor)

  for (i=0; i<32; i++) {
  
    ముందుకు_జరుగు(textRadius)
    కుడి_వైపు_తిరుగు(90)
    fontSize = i % 4
    if (fontSize == 1 || fontSize == 3) {
      pointSize = size *.04
      textLen = boxedCompass[i].length * pointSize/2
      వెనుకకు_జరుగు(textLen)
      అక్షరరూపము_స్థాపించు("normal " + pointSize + "pt Helvetica")
    } else if (fontSize == 2) {
      pointSize = size *.04
      textLen = boxedCompass[i].length * pointSize/2
      వెనుకకు_జరుగు(textLen)
      అక్షరరూపము_స్థాపించు("bold " + pointSize + "pt Helvetica")
    } else {
      pointSize = size *.06
      textLen = boxedCompass[i].length * pointSize/2
      వెనుకకు_జరుగు(textLen)
      అక్షరరూపము_స్థాపించు("bold " + pointSize + "pt Helvetica")
    }
    వ్రాయి(boxedCompass[i])
    ముందుకు_జరుగు(textLen)
    ఎడమ_వైపు_తిరుగు(90)
    వెనుకకు_జరుగు(textRadius)
    కుడి_వైపు_తిరుగు(360/32)
  }
}


_విధానము_     ప్రదర్శన() {
  ఆది_స్థితి()
  size = .9 * Math.min( గరిష్ఠX(), గరిష్ఠY()) //120
console.log("size "+ size)
   చుట్టొద్దు()
  కుంచికను_దాచు() // don"t want it to show,  do this early
  కుంచిక_కదిలిన_ప్రతి_సారీ_చిత్రీకరించు(false) // don"t redraw image each move

  // fill in the background
  background( backgroundColor)
/*
  స్థానము_మార్చు( కనిష్ఠX()+1, గరిష్ఠY()-1)
  కుడి_వైపు_తిరుగు( 90)
  ఆకారము_ప్రారంభించు()
  ముందుకు_జరుగు( 2 * గరిష్ఠX()-2)
  కుడి_వైపు_తిరుగు( 90)
  ముందుకు_జరుగు( 2 * గరిష్ఠY()-2)
  కుడి_వైపు_తిరుగు( 90)
  ముందుకు_జరుగు( 2 * గరిష్ఠX()-2)
  కుడి_వైపు_తిరుగు( 90)
  ముందుకు_జరుగు( 2 * గరిష్ఠY()-2)
  ఆకారము_ముగించు( backgroundColor)
*/

  //fill in the compass background
  స్థానము_మార్చు(0,0)
  రంగు_మార్చు( compassBackgroundColor)
  ఆకారము_ప్రారంభించు()
  వృత్తము(size)
  ఆకారము_ముగించు( compassBackgroundColor)


  //fill in the eight compass major points
  స్థానము_మార్చు(0,0)
  కోణము(0)
  ఎడమ_వైపు_తిరుగు(22.5)
  side = size * .47
  for (i=0; i<8; i++) {
    splitTri (side, mainDivisions, indexColor( i, inner8Colors))
    flipSplitTri( side, mainDivisions, indexColor( i, outer8Colors))
    కుడి_వైపు_తిరుగు(45)
  }

  //ornament the center
  for (i=0; i<8; i++) {
    splitTri (side/mainDivisions, subDivisions8, "yellow")
    కుడి_వైపు_తిరుగు(45)
  }

 //place the sixteenth points
  కుడి_వైపు_తిరుగు(22.5)
  for (i=0; i<8; i++) {
    flipSplitTri (side, 1, background16Color,
        side * mainDivisions16/mainDivisions)
    flipSplitTri (side, subDivisions16, foreground16Color,
        side * mainDivisions16/mainDivisions)
    కుడి_వైపు_తిరుగు(45)
  }

   //place the thirty-second points
  కుడి_వైపు_తిరుగు(11.25)
  for (i=0; i<16; i++) {
    flipSplitTri (side, 1, background32Color,
        side * mainDivisions32/mainDivisions)
    flipSplitTri (side, subDivisions32, foreground32Color,
        side * mainDivisions32/mainDivisions)
    కుడి_వైపు_తిరుగు(22.5)
  }

  labelPoints( size)

  //కుంచిక_కదిలిన_ప్రతి_సారీ_చిత్రీకరించు(true)
  చిత్రీకరించు() // just to render the final product
}
