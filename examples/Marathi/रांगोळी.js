
प्रदर्शन = () => {
  प्रथम_स्थिति();
    कुंचला_लपवा();
  करत_रहा(6, () => {
    रंग_बदला( 0 );
    उज्वी_कडे_वळा(180);
    _इथे_ बाजु = 100;
    _इथे_ रंग_आकडा = 0;
    असे_पर्यन्त_करत_रहा( () => बाजु > 0, ()=> {
  
      उज्वी_कडे_चाप(बाजु, 30 );
  
      उज्वी_कडे_वळा(30);
      बाजु = बाजु - 10;
      रंग_आकडा = ( रंग_आकडा  + 15 ) % 16;
      रंग_बदला( रंग_आकडा );
    } );
  });

  उज्वी_कडे_वळा(310);
  कुंचला_उचला();
  पुढे_जा(60 );
  कुंचला_ठेवा()
  रंग_बदला( 13 );
  भरलेले_वर्तुळ(5 );
  वर्तुळ(10);
}
