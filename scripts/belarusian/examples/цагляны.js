// цагляны ప్రస్తారము 

_назаўжды_    вышыня = 15
_назаўжды_    усталяваць_шырыню = 2* вышыня 

// цагляны == ఇటుక 

цагляны = ( вышыня, усталяваць_шырыню, цагляны_колер) => {
  пачніце_маляваць_форму()
  паўтараць (2, () => {
    ісці_наперад( усталяваць_шырыню)
    павярнуць_направа(90)
    ісці_наперад( вышыня)
    павярнуць_направа(90)
  })
  спыніць_маляваць_форму( цагляны_колер)
  ісці_наперад( усталяваць_шырыню)
}

паказаць = () => {
  пачатковы_стан()
 
  yB = максімум_Y()
  xB = мінімум_X()
   Не_абмотваць()
  павярнуць_направа( 90)
  змяніць_колер_на( తెలుపు )

  Паўтараць_пакуль( () => కుంచిక.స్థానము.y > мінімум_Y(), () => {
    змяніць_становішча(xB, yB)
    Паўтараць_пакуль( () => కుంచిక.స్థానము.x < максімум_X(), () => {
      пакладзеце_пэндзаль()
      цагляны(вышыня, усталяваць_шырыню, "darkred")
      падніміце_пэндзаль()
    } )
    yB = yB - вышыня

    змяніць_становішча(xB - усталяваць_шырыню/2, yB)
    Паўтараць_пакуль( () => కుంచిక.స్థానము.x < максімум_X(), () => {
      пакладзеце_пэндзаль()
      цагляны(вышыня, усталяваць_шырыню, "darkred")
      падніміце_пэндзаль()
    } )
    yB = yB - вышыня
  } )
}
