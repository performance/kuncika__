// ఇష్టికా ప్రస్తారము 

_సర్వదా_    ఎత్తు = 15
_సర్వదా_    వెడల్పు = 2* ఎత్తు 

// ఇష్టికా == ఇటుక 

ఇష్టికా = ( ఎత్తు, వెడల్పు, ఇష్టిక_రంగు) => {
  ఆకారము_ప్రారంభించు()
  ఆవర్తించు (2, () => {
    ముందుకు_జరుగు( వెడల్పు)
    కుడి_వైపు_తిరుగు(90)
    ముందుకు_జరుగు( ఎత్తు)
    కుడి_వైపు_తిరుగు(90)
  })
  ఆకారము_ముగించు( ఇష్టిక_రంగు)
  ముందుకు_జరుగు( వెడల్పు)
}

ప్రదర్శన = () => {
  ఆది_స్థితి()
 
  yB = గరిష్ఠY()
  xB = కనిష్ఠX()
   చుట్టొద్దు()
  కుడి_వైపు_తిరుగు( 90)
  రంగు_మార్చు( తెలుపు )

  యావత్_పరిక్రమ( () => కుంచిక.స్థానము.y > కనిష్ఠY(), () => {
    స్థానము_మార్చు(xB, yB)
    యావత్_పరిక్రమ( () => కుంచిక.స్థానము.x < గరిష్ఠX(), () => {
      కుంచికను_కింద_పెట్టు()
      ఇష్టికా(ఎత్తు, వెడల్పు, "darkred")
      కుంచికను_పైకి_ఎత్తు()
    } )
    yB = yB - ఎత్తు

    స్థానము_మార్చు(xB - వెడల్పు/2, yB)
    యావత్_పరిక్రమ( () => కుంచిక.స్థానము.x < గరిష్ఠX(), () => {
      కుంచికను_కింద_పెట్టు()
      ఇష్టికా(ఎత్తు, వెడల్పు, "darkred")
      కుంచికను_పైకి_ఎత్తు()
    } )
    yB = yB - ఎత్తు
  } )
}
