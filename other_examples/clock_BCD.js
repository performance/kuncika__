// Clock, BCD -- digital clock using Binary Coded Decimal (BCD) digits

//*** GLOBALS ***

_సర్వత్ర_   hour10;
_సర్వత్ర_   hour1;
_సర్వత్ర_   minute10;
_సర్వత్ర_   minute1;
_సర్వత్ర_   second10;
_సర్వత్ర_   second1;
_సర్వత్ర_   hSpacing;
_సర్వత్ర_   vSpacing;

_సర్వత్ర_   hourColor = "red"
_సర్వత్ర_   minuteColor = "green"
_సర్వత్ర_   secondColor = "blue"
_సర్వత్ర_   offColor = "lightgray"


//*** FUNCTIONS ***

_విధానము_     tensDigit (number) {
  _ఫలము_  Math.floor (number/10) % 10
}


_విధానము_     onesDigit (number) {
  _ఫలము_  Math.floor (number % 10)
}


_విధానము_     getBinaryTime() {
  time = new Date
  hours = time.getHours()
  minutes = time.getMinutes()
  seconds = time.getSeconds()

  // extract the digits
  //hour10 =   hour1 =  onesDigit(hours)
  //min10 =  tensDigit(minutes)
  //min1 =   onesDigit(minutes)
  //sec10 =  tensDigit(seconds)
  //sec1 =   onesDigit(seconds)

  //pad digits with leading 0s
  //hour10 = "0000" + hour10.toString(2)
  //hour1 =  "0000" + hour1.toString(2)
  //min10 =  "0000" + min10.toString(2)
  //min1 =   "0000" + min1.toString(2)
  //sec10 =  "0000" + sec10.toString(2)
  //sec1 =   "0000" + sec1.toString(2)

  //use only 4 digits
  //hour10 = hour10.slice(-4)
  //hour1 =  hour1.slice(-4)
  //min10 =  min10.slice(-4)
  //min1 =   min1.slice(-4)
  //sec10 =  sec10.slice(-4)
  //sec1 =   sec1.slice(-4)
  hour10 = ("0000" + tensDigit(hours).toString(2)).slice(-4)
  hour1 =  ("0000" + onesDigit(hours).toString(2)).slice(-4)
  min10 =  ("0000" + tensDigit(minutes).toString(2)).slice(-4)
  min1 =   ("0000" + onesDigit(minutes).toString(2)).slice(-4)
  sec10 =  ("0000" + tensDigit(seconds).toString(2)).slice(-4)
  sec1 =   ("0000" + onesDigit(seconds).toString(2)).slice(-4)
}


_విధానము_     drawDot (digit, onColor, offColor, step) {
  if (digit == 1) {
    రంగు_మార్చు( onColor)
  } else {
    రంగు_మార్చు( offColor)
  }
  నిండు_వృత్తము()
  ముందుకు_జరుగు(step)
}


_విధానము_     drawNumberDots (digitString, onColor, offColor, spacing) {
  drawDot( digitString[0], onColor, offColor, spacing)
  drawDot( digitString[1], onColor, offColor, spacing)
  drawDot( digitString[2], onColor, offColor, spacing)
  drawDot( digitString[3], onColor, offColor, spacing)
  వెనుకకు_జరుగు(60)
}


_విధానము_     displayBinaryDots(hSpacing, vSpacing) {
  bottom = vSpacing * 1.5
  leftSide = -hSpacing * 2.5
  కుంచికను_పైకి_ఎత్తు()
  స్థానము_మార్చు(leftSide + hSpacing *0, bottom)
  drawNumberDots (hour10, hourColor, offColor, vSpacing)

  స్థానము_మార్చు(leftSide + hSpacing *1, bottom)
  drawNumberDots (hour1, hourColor, offColor, vSpacing)

  స్థానము_మార్చు(leftSide + hSpacing *2, bottom)
  drawNumberDots (min10, minuteColor, offColor, vSpacing)

  స్థానము_మార్చు(leftSide + hSpacing *3, bottom)
  drawNumberDots (min1, minuteColor, offColor, vSpacing)

  స్థానము_మార్చు(leftSide + hSpacing *4, bottom)
  drawNumberDots (sec10, secondColor, offColor, vSpacing)

  స్థానము_మార్చు(leftSide + hSpacing *5, bottom)
 drawNumberDots (sec1, secondColor, offColor, vSpacing)
}


_విధానము_     displayTime() {
  చెరిపి_వేయి()
  కోణము(180)
  spacing = Math.min(గరిష్ఠX(), గరిష్ఠY()) *1.8/6
  hSpacing = spacing
  vSpacing = spacing
  వెడల్పు(spacing/10)
  కుంచికను_దాచు()
  getBinaryTime()
  displayBinaryDots(hSpacing, vSpacing)
}

ప్రదర్శన = displayTime
ఆడించు(displayTime, 1000)
