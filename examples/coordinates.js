// Coordinates -- Draw the axes of the coordinate system on the canvas

function lines () {
  చెరిపి_వేయి()
  కలమును_కింద_పెట్టు()

  goto(0,కనిష్ఠY())
  కోణము(0)
  ముందుకు_జరుగు(2*గరిష్ఠY())

  goto(కనిష్ఠX(),0)
  కోణము(90)
  ముందుకు_జరుగు(2*గరిష్ఠX())

  //lable the axes
  అక్షరరూపము_స్థాపించు("bold 14px sans-serif");
  goto (0+10,గరిష్ఠY()-25)
  కోణము (90)
  write (గరిష్ఠY())

  goto (గరిష్ఠX()-5,+10)
  కోణము (0)
  write (గరిష్ఠX())

  goto (10,కనిష్ఠY()+5)
  కోణము (90)
  write (కనిష్ఠY())

  goto (కనిష్ఠX()+25,0+10)
  కోణము (0)
  write (కనిష్ఠX())
}


function ticks (dir, limit, step) {
  var tickLen = 5
  కోణము(dir)
  goto(0,0)
  కలమును_పైకి_ఎత్తు()
  for (i=1; i*step<limit; i=i+1) {

    ముందుకు_జరుగు(step)
    ఎడమ_వైపు_తిరుగు(90)
    if (i%5 == 0) {
      ముందుకు_జరుగు(tickLen)
      కలమును_కింద_పెట్టు()
      వెనుకకు_జరుగు(tickLen*2)
      కలమును_పైకి_ఎత్తు()
      ముందుకు_జరుగు(tickLen)
      కుడి_వైపు_తిరుగు(90)
    } else {
      ముందుకు_జరుగు(tickLen/2)
      కలమును_కింద_పెట్టు()
      వెనుకకు_జరుగు(tickLen)
      కలమును_పైకి_ఎత్తు()
      ముందుకు_జరుగు(tickLen/2)
      కుడి_వైపు_తిరుగు(90)
    }
  }
}

function demo() {
  lines()
  ticks (0, గరిష్ఠY(), 10)
  ticks (90, గరిష్ఠX(), 10)
  ticks (180, -కనిష్ఠY(), 10)
  ticks (270, -కనిష్ఠX(), 10)
}
