

कमीत_कमी = Math.min

_कृती_     कोख_रेखा (लांबी, खोल) {
  जर_तर_मग( () => (खोल == 0),
   () => {    पुढे_जा(लांबी);  },
   () => {
    //  ఎడమ వైపు బుడిప 
    कोख_रेखा (लांबी/3, खोल-1);
    दावी_कडे_वळा(60); 
    कोख_रेखा (लांबी/3, खोल-1);
    उज्वी_कडे_वळा(120); 
    कोख_रेखा (लांबी/3, खोल-1);
    दावी_कडे_वळा(60); 
    कोख_रेखा (लांबी/3, खोल-1);
  } )
}


_कृती_     कोख_पुष्प (लांबी, खोल) {
  कोन_निश्चित_करा (30);
  स्थान_बदला(-लांबी/2,-.3 * लांबी);
  कोख_रेखा (लांबी, खोल);
  उज्वी_कडे_वळा(120);
  कोख_रेखा (लांबी, खोल);
  उज्वी_कडे_वळा(120);
  कोख_रेखा (लांबी, खोल);
  उज्वी_कडे_वळा(120);
}
  
पुष्प = ()=> {
  पाकळीचा_रंग.push(कुठलीतरी_संख्या(15) );
  पाकळीचा_रंग.shift();
  मोजणे_करत_रहा (6, ( క ) => {
    रंग_बदला( पाकळीचा_रंग [క] );
    कोख_पुष्प( लांबी * (క+1) * (క+1), క)
  } );
}

_कृती_     प्रदर्शन() {
  प्रथम_स्थिति();
  लांबी = .045* कमीत_कमी(जास्तीत_जास्त_X(), जास्तीत_जास्त_Y())
  पाकळीचा_रंग = [];
  मोजणे_करत_रहा (6, ( క ) => {
    पाकळीचा_रंग[క] = कुठलीतरी_संख्या(6);
  } );

  कुंचला_लपवा();
  चालू_करा(पुष्प,1)
}
