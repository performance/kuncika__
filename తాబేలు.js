/************************************************************************
* turtle.js - కుంచిక గ్రాఫిక్ భాషా పొడిగింపుల కోసం జావాస్క్రిప్ట్
*
* కాపీరైట్ (సి) 2015-2019 కిర్క్ కార్ల్సన్
* MIT లైసెన్స్
*
* గీసిన ప్రతి పంక్తి యొక్క ఐచ్ఛిక యానిమేషన్‌ను అనుమతించాలనుకుంటున్నారు
* దీన్ని ఎలా చేయాలో ఉదాహరణకు jsfiddle.net/epistemex/c85cmy0z/ చూడండి
************************************************************************/
/*************************************************************************************
వ్యవస్థలను సమన్వయం చేయండి ...

విభిన్న కోఆర్డినేట్ సంఖ్య కారణంగా వృత్తం గీయడం నొప్పిగా మారింది
వ్యవస్థలు ఉపయోగించబడుతున్నాయి. ఇవి:
  - జావాస్క్రిప్ట్ కాన్వాస్.
    * మూలం ఎగువ ఎడమ వైపున ఉంది
    * మూలం సానుకూలంగా ఉంది, ప్రతికూలతలు లేవు
    * మూలం కార్టిసియన్ కోఆర్డినేట్‌లను అనుకరించటానికి అనువదించబడింది
    * ఆర్క్‌లు సవ్యదిశలో 3 గంటలకు 0 తో సూచించబడతాయి
  - కార్టేసియన్ కోడినేట్స్
    * మూలం పాజిటివ్ అప్‌తో మధ్యలో ఉంటుంది
    * 0 కోణం అపసవ్య దిశలో 3 గంటలకు వెళుతుంది
  - కుంచిక గ్రాఫిక్ స్థలం.
    * కార్టెసియన్ కోఆర్డినేట్‌లను అనుకరించడానికి కేంద్రంలో మూలం
    * శీర్షిక 12 గంటలకు 0 కోణంతో సవ్యదిశలో వెళుతుంది

కాన్వాసులు:

రెండు కాన్వాసులు ఉపయోగించబడతాయి:
  ఇమేజ్ కాన్వాస్ కుంచిక గీసిన చిత్రాన్ని పట్టుకోవడానికి
  కుంచిక యొక్క చిత్రం మరియు కుంచిక గీసిన చిత్రం పట్టుకోవటానికి కుంచిక కాన్వాస్
ఇమేజ్ కాన్వాస్ కనిపించదు, కుంచిక కాన్వాస్ మాత్రమే కనిపిస్తుంది.
#### పైవి మారాలి, కుంచిక మరియు చిత్రం అనే రెండు పొరలు ఉండాలి.
#### కుంచిక కనిపించకపోతే, ఆ పొర కనిపించదు మరియు నవీకరించబడదు.
#### ఇది పెద్ద మార్పు, కాబట్టి దీన్ని కట్టుబడి ఉండండి
"రెడ్రా" బూలియన్ ఫంక్షన్ ప్రతి కదలిక తర్వాత కుంచిక గీసినదా అని నియంత్రిస్తుంది.
##### ఇందులో ఇమేజ్ కాపీ ఉంటుంది, ఇది ఖరీదైన ఆపరేషన్, బదులుగా పొరలను ఉపయోగించండి!

"ర్యాప్" సరళ రేఖల కోసం మాత్రమే పనిచేస్తుంది, వక్రతలు, వృత్తాలు లేదా చుక్కలు కాదు.

*************************************************************************************/


// పత్రంలోని కాన్వాసుల కోసం హ్యాండిల్ పొందండి
var imageCanvas = document.getElementById ("imagecanvas");
var imageContext = imageCanvas.getContext ("2d");

imageContext.textAlign = "సెంటర్";
imageContext.textBaseline = "మధ్య";

var turtleCanvas = document.getElementById ("turtlecanvas");
var turtleContext = turtleCanvas.getContext ("2d");

// కంపోజ్ చేసేటప్పుడు కుంచిక ప్రాధాన్యతనిస్తుంది
turtleContext.globalCompositeOperation = "గమ్యం-ఓవర్";



////// రెండరింగ్ విధులు


ఫంక్షన్ స్థానము (x, y) {
  this.x = x
  this.y = y
}

ఫంక్షన్ కుంచిక () {
  this.pos = క్రొత్త పోస్ (0,0)
  this.కోణము = 0
  this.కుంచికనుదింపు = నిజం
  this.width = 1
  this.visible = true // కుంచిక దృశ్యమానతను నియంత్రిస్తుంది
  this.redraw = true // ప్రతి కదలికను కుంచికను తిరిగి గీయడం నియంత్రిస్తుంది
  this.shape = తప్పుడు // నిండిన ఆకారం నుండి విభాగాలను చేర్చడాన్ని నియంత్రిస్తుంది
  this.wrap = true // అంచు వద్ద చుట్టడాన్ని నియంత్రిస్తుంది
  this.font = "10pt సాధారణ హెల్వెటికా, సాన్స్-సెరిఫ్"
  this.color = "నలుపు"
};

// కుంచిక స్థితిని ప్రారంభించండి
var కుంచిక = కొత్త కుంచిక ();
console.log ("చిక్కు:" + turtle.కోణము + "Tfont:" + turtle.font)

/*******************************************************************************
 * ప్రారంభించు - కుంచిక గ్రాఫిక్స్ వ్యవస్థను ప్రారంభించండి
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ ప్రారంభించడం () {
  turtle.pos.x = 0
  turtle.pos.y = 0
  turtle.కోణము = 0
  turtle.కుంచికనుదింపు = నిజం
  turtle.వెడల్పు = 1
  turtle.visible = నిజం
  turtle.redraw = నిజం
  turtle.shape = తప్పుడు
  turtle.wrap = నిజం
  turtle.font = "10pt సాధారణ హెల్వెటికా, సాన్స్-సెరిఫ్"
  turtle.రంగు = "నలుపు"
/*
   కుంచిక = {pos: {
                 x: 0,
                 మరియు: 0
              },
              కోణం: 0, // 12 గంటలు
              పెన్‌డౌన్: నిజం,
              వెడల్పు: 1,
              కనిపించేది: నిజం, // కుంచిక దృశ్యమానతను నియంత్రిస్తుంది
              redraw: true, // ప్రతి కదలికను కుంచికను తిరిగి గీయడం నియంత్రిస్తుంది
              ఆకారం: తప్పుడు, // నిండిన ఆకారం నుండి విభాగాలను చేర్చడాన్ని నియంత్రిస్తుంది
              చుట్టు: నిజం, // అంచు వద్ద చుట్టడాన్ని నియంత్రిస్తుంది
              ఫాంట్: "10pt సాధారణ హెల్వెటికా, సాన్స్-సెరిఫ్",
              నలుపు రంగు"
            };
*/
  // కుంచిక = కుంచిక ();
  imageContext.font = కుంచిక.ఫాంట్;
  imageContext.lineWidth = కుంచిక.విడ్త్;
  imageContext.strokeStyle = turtle.రంగు;
  imageContext.globalAlpha = 1;
}


/*******************************************************************************
 * drawIf - పునర్నిర్మాణం నిజమైతే కుంచిక మరియు ప్రస్తుత చిత్రాన్ని గీయండి
 * మళ్లీ గీయడం తప్పు అయితే సంక్లిష్టమైన డ్రాయింగ్‌లు వేగంగా ఉంటాయి
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ డ్రా () {
   if (turtle.redraw) {
      డ్రా ();
   }
}


/*******************************************************************************
 * డ్రా - కుంచిక మరియు ప్రస్తుత చిత్రాన్ని గీయండి
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ డ్రా () {
   clearContext (కుంచికకాంటెక్స్ట్);
   // కుంచిక కనిపిస్తే అది గీయండి
   if (turtle.visible) {
      var x = turtle.pos.x;
      var y = turtle.pos.y;
      var w = 10;
      var h = 15;
      turtleContext.save();
      // పైకి ఎదుర్కొంటున్న కాన్వాస్ కేంద్రీకృత కోఆర్డినేట్‌లను వాడండి
      సెంటర్ కోర్డ్స్ (కుంచికకాంటెక్స్ట్);
      // మూలాన్ని కుంచిక కేంద్రానికి తరలించండి
      turtleContext.translate (x, y);
      // కుంచిక మధ్యలో తిరగండి
      turtleContext.rotate (-turtle.కోణము);
      // కుంచికను తిరిగి దాని స్థానానికి తరలించండి
      turtleContext.translate (-x, -y);
      // కుంచిక చిహ్నాన్ని గీయండి
      turtleContext.beginPath ();
      turtleContext.moveTo (x - w / 2, y);
      turtleContext.lineTo (x + w / 2, y);
      turtleContext.lineTo (x, y + h);
      turtleContext.closePath ();
      turtleContext.fillStyle = "ఆకుపచ్చ";
      turtleContext.fill ();
      turtleContext.restore ();
   }
   // ఇప్పుడు నేపథ్యాన్ని గీయండి
   turtleContext.drawImage (imageCanvas, 0, 0, turtleContext.canvas.width,
       turtleContext.canvas.height, 0, 0, turtleContext.canvas.width,
       turtleContext.canvas.height);
}


/*******************************************************************************
 * సెంటర్ కార్డ్స్ - ఇచ్చిన కాన్వాస్ సందర్భంలో అక్షాంశాలను మధ్యలో ఉంచండి
 *
 * వాదనలు:
 * సందర్భం: కాన్వాస్ యొక్క సందర్భం
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
// పైకి ఎదుర్కొంటున్న కాన్వాస్ కేంద్రీకృత కోఆర్డినేట్‌లను వాడండి
ఫంక్షన్ సెంటర్కోర్డ్స్ (సందర్భం) {
   var వెడల్పు = context.canvas.width;
   var ఎత్తు = context.canvas.height;
   context.translate (వెడల్పు / 2, ఎత్తు / 2);
   context.transform (1, 0, 0, -1, 0, 0);
}


/*******************************************************************************
 * క్లియర్ - ప్రదర్శనను క్లియర్ చేయండి, కుంచికను తరలించవద్దు
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ క్లియర్ () {
   clearContext (imageContext);
   drawIf ();
}


/*******************************************************************************
 * clearContext - పేర్కొన్న సందర్భాన్ని క్లియర్ చేయండి
 *
 * వాదనలు: చిత్రం కోసం సందర్భం
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ క్లియర్ కాంటెక్స్ట్ (సందర్భం) {
   context.save();
   context.setTransform (1,0,0,1,0,0);
   context.clearRect (0,0, context.canvas.width, context.canvas.height);
   context.restore ();
}


/*******************************************************************************
 * రీసెట్ - కుంచిక గ్రాఫిక్‌లను రీసెట్ చేసి, కుంచిక ఉత్తర దిశగా ఉన్న కేంద్రానికి తరలించండి
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ రీసెట్ () {
   //console.log(document.getElementById("stopButton").onClick)
   ప్రారంభించు ();
   స్పష్టమైన ();
   డ్రా ();
   stopAnimation ();
   turtle.shape = తప్పుడు;
}


/*******************************************************************************
 * హోమ్ - కుంచిక ఉత్తర దిశగా ఉన్న కేంద్రానికి తరలించండి
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
// కుంచిక మూలానికి తరలించి, 0 కి వెళ్ళండి
ఫంక్షన్ హోమ్ () {
   స్థానానికివెళ్ళు (0,0);
   సెట్ హెడ్డింగ్ (0);
}


/*******************************************************************************
 * stopAnimation - పురోగతిలో ఉన్న అన్ని యానిమేషన్లను ఆపండి
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ స్టాప్అనిమేషన్ () {
  అయితే (intervals.length> 0) {
    clearInterval (intervals.pop ());
  }
  అయితే (timeouts.length> 0) {
    clearTimeout (timeouts.pop ());
  }
  document.getElementById ("stopButton"). దాచిన = నిజం;
}


/*******************************************************************************
 * redrawOnMove - రీడ్రా ఫ్లాగ్ యొక్క స్థితిని సెట్ చేయండి
 *
 * వాదనలు:
 * bool: జెండాను తిరిగి గీయడానికి కావలసిన స్థితి
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
// రీడ్రాయింగ్ ఆన్ / ఆఫ్ చేయండి
ఫంక్షన్ redrawOnMove (bool) {
   turtle.redraw = bool;
}


/*******************************************************************************
 * ర్యాప్ - సరిహద్దు చుట్టడం ఫంక్షన్ యొక్క కావలసిన స్థితిని సెట్ చేయండి
 *
 * వాదనలు:
 * bool: సరిహద్దు చుట్టడం ఫంక్షన్ యొక్క కావలసిన స్థితి
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ ర్యాప్ (బూల్) {
   turtle.wrap = bool;
}


/*******************************************************************************
 * ప్రారంభ షేప్ - నిండిన ఆకారం యొక్క ప్రారంభాన్ని గుర్తించండి
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ ప్రారంభం () {
  turtle.shape = నిజం;
  imageContext.beginPath ();
}

beginShape = ప్రారంభ షేప్;


/*******************************************************************************
 * ఫిల్‌షేప్ - ఆకారాన్ని పూరించండి
 *
 * వాదనలు:
 * స్టైల్: పూరక శైలి (రంగు, ప్రవణత లేదా నమూనా), కుంచిక రంగుకు డిఫాల్ట్ అవుతుంది
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ ఫిల్‌షేప్ (స్టైల్) {
  if (turtle.shape) {
    if (స్టైల్ == నిర్వచించబడలేదు) {
       styl = turtle.రంగు;
    }
    if (typeof (styl) === "number") {
      if (స్టైల్ <16) {// ప్రామాణిక లోగో కుంచిక రంగును ume హించుకోండి
        style = logoColors [శైలి];
      } //లేకపోతే {
        // రంగు 32-బిట్ రంగు విలువగా భావించబడుతుంది
      //}
    } else if (typeof (styl)! = "string") {// col మద్దతు ఉన్న రకం కాదు
      styl = "నలుపు";
    }

    //imageContext.save()
    imageContext.closePath ();
    imageContext.fillStyle = స్టైల్;
    imageContext.strokeStyle = turtle.రంగు; // స్ట్రోక్ మరియు ఫిల్ భిన్నంగా ఉంటుంది
    if (turtle.కుంచికనుదింపు) {
      imageContext.stroke ();
      imageContext.fill ();
    }
    //imageContext.restore();
    drawIf ();
  }
  turtle.shape = తప్పుడు;
}

fillShape = నింపే;


////// ఉద్యమ విధులు

/*******************************************************************************
 * ముందుకు - కుంచికను ముందుకు కదిలించి, చుట్టుముట్టడానికి వీలు కల్పిస్తుంది
 *
 * వాదనలు:
 * దూరం: ముందుకు వెళ్ళడానికి పిక్సెల్‌ల సంఖ్య
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ముందుకు పని (దూరం) {
   // కొన్ని స్థానిక వేరియబుల్స్ మరియు ఫంక్షన్లను నిర్వచించండి
   var cosAngle = Math.cos (turtle.కోణము);
   var sinAngle = Math.sin (turtle.కోణము);
   var new_X;
   var new_Y;
   var దూరం;

   // X సరిహద్దులో చుట్టు
   ఫంక్షన్ xWrap (కట్‌బౌండ్, ఇతరబౌండ్) {
      var distanceToEdge = Math.abs ((కట్‌బౌండ్ - x) / sinAngle);
      var edgeY = cosAngle * distanceToEdge + y;
      imageContext.lineTo (కట్‌బౌండ్, ఎడ్జ్‌వై);
      దూరం - = దూరం టోఎడ్జ్;
      x = ఇతరబౌండ్;
      y = edgeY;
   }

   // Y సరిహద్దులో చుట్టండి
   ఫంక్షన్ yWrap (కట్‌బౌండ్, ఇతరబౌండ్) {
      var distanceToEdge = Math.abs ((కట్‌బౌండ్ - y) / cosAngle);
      var edgeX = sinAngle * distanceToEdge + x;
      imageContext.lineTo (ఎడ్జ్ఎక్స్, కట్‌బౌండ్);
      దూరం - = దూరం టోఎడ్జ్;
      x = ఎడ్జ్ఎక్స్;
      y = ఇతరబౌండ్;
   }

   // కుంచికను ఏ సరిహద్దులోనైనా చుట్టవద్దు
   ఫంక్షన్ noWrap (x, y) {
      imageContext.lineTo (x, y);
      turtle.pos.x = x;
      turtle.pos.y = y;
      దూరం = 0;
   }


   imageContext.save();
   సెంటర్‌కార్డ్స్ (ఇమేజ్‌కాంటెక్స్ట్);
   if (! turtle.shape) {
     imageContext.beginPath ();
   }

   // కాన్వాస్ యొక్క సరిహద్దులను పొందండి
   var max_X = imageContext.canvas.width / 2;
   var కనిష్ఠ_X = -imageContext.canvas.width / 2;
   var max_Y = imageContext.canvas.height / 2;
   var min_Y = -imageContext.canvas.height / 2;
   var x = turtle.pos.x;
   var y = turtle.pos.y;

   // ముందుకు దశలను కనుగొనండి
   అయితే (దూరం> 0) {
      // కుంచిక యొక్క ప్రస్తుత స్థానానికి తరలించండి
      if (! turtle.shape) {
        imageContext.moveTo (x, y);
      }
      // ముందుకు కదలిక చేసిన తర్వాత కుంచిక యొక్క క్రొత్త స్థానాన్ని లెక్కించండి
      new_X = x + sinAngle * దూరం;
      new_Y = y + cosAngle * దూరం;

      // ర్యాప్ ఆన్‌లో ఉంటే, మార్గం యొక్క ఒక భాగాన్ని గుర్తించండి మరియు అవసరమైతే సరిహద్దులో చుట్టండి
      if (! turtle.shape && turtle.wrap) {
         if (new_X> max_X) {
            xWrap (max_X, కనిష్ఠ_X);
         }
         లేకపోతే (క్రొత్త_ఎక్స్ <కనిష్ఠ_X) {
            xWrap (కనిష్ఠ_X, max_X);
         }
         లేకపోతే (క్రొత్త_వై> గరిష్ట_వై) {
             yWrap (max_Y, min_Y);
         }
         లేకపోతే (క్రొత్త_వై <నిమి_వై) {
            yWrap (min_Y, max_Y);
         }
         లేకపోతే {
            noWrap (new_X, new_Y);
         }
      }

      // ర్యాప్ ఆన్‌లో లేదు.
      లేకపోతే {
         noWrap (new_X, new_Y);
      }
   }
   // పెన్ ప్రస్తుతం డౌన్ అయితే మాత్రమే డ్రా చేయండి.
   if (! turtle.shape && turtle.కుంచికనుదింపు) {
      imageContext.stroke ();
   }
   imageContext.restore ();
   if (! turtle.shape) {
     drawIf ();
   }
}

fd = ముందుకు;


/*******************************************************************************
 * వెనుకకు - కుంచికను వెనుకకు కదిలించి, చుట్టుముట్టడానికి వీలు కల్పిస్తుంది
 *
 * వాదనలు:
 * దూరం: వెనుకకు వెళ్ళడానికి పిక్సెల్‌ల సంఖ్య
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ వెనుకకు (దూరం) {
  కుడి (180);
  ముందుకు (దూరం);
  కుడి (180);
}

bk = వెనుకబడిన;
వెనుక = వెనుకబడిన;


/*******************************************************************************
 * కుడి - కుంచిక కుడివైపు అనేక డిగ్రీలు తిరగండి
 *
 * వాదనలు:
 * కోణం: తిరగడానికి డిగ్రీలలో కోణం
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ కుడి (కోణం) {
   turtle.కోణము + = degToRad (కోణం);
   drawIf ();
}

turn = కుడి;
rt = కుడి;


/*******************************************************************************
 * ఎడమ - కుంచిక అనేక డిగ్రీల ఎడమవైపు తిరగండి
 *
 * వాదనలు:
 * కోణం: తిరగడానికి డిగ్రీలలో కోణం
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ ఎడమ (కోణం) {
   turtle.కోణము - = degToRad (కోణం);
   drawIf ();
}

lt = ఎడమ;




/*******************************************************************************
 * కర్వ్‌లెఫ్ట్ - కుంచికను ఎడమ వైపుకు వంగిన మార్గం వెంట ముందుకు తరలించండి
 *
 * వాదనలు:
 * వ్యాసార్థం: వక్రరేఖ యొక్క వ్యాసార్థం
 * పరిధి: వక్రంలో డిగ్రీల సంఖ్య
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ కర్వ్లెఫ్ట్ (వ్యాసార్థం, పరిధి) {
  if (పరిధి == నిర్వచించబడలేదు) {
    పరిధి = 359.9999; // 360 కి దగ్గరగా ఉంటే ఇది పనిచేయదు, ఎందుకు తెలియదు
  }
  var startAngle = turtle.కోణము; // 12 గంటల నుండి రేడియన్లలో .. శీర్షిక ప్రారంభానికి సమానం
  var అపసవ్య దిశలో = నిజం;
  var centerX = turtle.pos.x - వ్యాసార్థం * Math.cos (turtle.కోణము); // కుంచిక ఎడమ
  var centerY = turtle.pos.y + వ్యాసార్థం * Math.sin (turtle.కోణము);
  stopAngle = నిర్బంధించు ((startAngle - degToRad (పరిధి)), 0, 2 * Math.PI); // రేడియన్లలో CCW
  turtle.కోణము = stopAngle;
  turtle.pos.x = centerX + వ్యాసార్థం * Math.cos (stopAngle);
  turtle.pos.y = centerY - వ్యాసార్థం * Math.sin (stopAngle);

  x విలువలను తిప్పడానికి // సరైనది, ఇది భ్రమణం మరియు కోణాలను మారుస్తుంది
  అపసవ్య దిశలో =! అపసవ్య దిశలో;
  startAngle = -startAngle;
  stopAngle = -stopAngle;

  imageContext.save();
  సెంటర్‌కార్డ్స్ (ఇమేజ్‌కాంటెక్స్ట్);
  imageContext.beginPath ();
  imageContext.arc (centerX, centerY, వ్యాసార్థము, startAngle, stopAngle, అపసవ్య దిశలో);
  // దాన్ని గీయండి
  if (turtle.కుంచికనుదింపు) {
    imageContext.stroke ();
  }
  imageContext.restore ();
  drawIf ();
}

curLeft = కర్వ్లెఫ్ట్;


/*******************************************************************************
 * వక్రత - కుంచికను కుడి వైపున వంగిన మార్గం వెంట ముందుకు తరలించండి
 *
 * వాదనలు:
 * వ్యాసార్థం: వక్రరేఖ యొక్క వ్యాసార్థం
 * పరిధి: వక్రంలో డిగ్రీల సంఖ్య
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ వక్రత (వ్యాసార్థం, పరిధి) {
  if (పరిధి == నిర్వచించబడలేదు) {
    పరిధి = 359.9999; // 360 కి దగ్గరగా ఉంటే ఇది పనిచేయదు, ఎందుకు తెలియదు
  }
  var startAngle = Math.PI + turtle.కోణము; // రేడియన్లలో .. శీర్షిక ప్రారంభానికి సమానం
  var అపసవ్య దిశలో = తప్పుడు;
  var centerX = turtle.pos.x + వ్యాసార్థం * Math.cos (turtle.కోణము); // కుంచిక హక్కు
  var centerY = turtle.pos.y - వ్యాసార్థం * Math.sin (turtle.కోణము);
  stopAngle = నిర్బంధించు (startAngle + degToRad (పరిధి), 0, 2 * Math.PI); // రేడియన్స్ CW లో
  turtle.కోణము = stopAngle + Math.PI;
  turtle.pos.x = centerX + వ్యాసార్థం * Math.cos (stopAngle);
  turtle.pos.y = centerY - వ్యాసార్థం * Math.sin (stopAngle);

  x విలువలను తిప్పడానికి // సరైనది, ఇది భ్రమణం మరియు కోణాలను మారుస్తుంది
  అపసవ్య దిశలో =! అపసవ్య దిశలో;
  startAngle = -startAngle;
  stopAngle = -stopAngle;
    // వ్రాయండి (startAngle + "" + stopAngle + "" + startAngle + degToRad (పరిధి))
  imageContext.save();
  సెంటర్‌కార్డ్స్ (ఇమేజ్‌కాంటెక్స్ట్);
  imageContext.beginPath ();
  imageContext.arc (centerX, centerY, వ్యాసార్థము, startAngle, stopAngle, అపసవ్య దిశలో);
  // దాన్ని గీయండి
  if (turtle.కుంచికనుదింపు) {
    imageContext.stroke ();
  }
  imageContext.restore ();
  drawIf ();
}

curRight = వక్రత;


/*******************************************************************************
 * సర్కిల్ - ప్రస్తుత కుంచిక స్థానం గురించి ఒక సర్కిల్ గీయండి
 *
 * వాదనలు:
 * వ్యాసార్థం: పిక్సెల్‌లలో వృత్తం యొక్క వ్యాసార్థం
 * పరిధి: డిగ్రీలలో ఆర్క్ పరిమాణం (ఐచ్ఛికం, పూర్తి సర్కిల్‌కు డిఫాల్ట్‌లు)
 * CW: ఆర్క్ దిశ కోసం బూలియన్ (ఐచ్ఛిక డిఫాల్ట్‌లు ఒప్పు లేదా సవ్యదిశలో)
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ సర్కిల్ (వ్యాసార్థం, పరిధి, CW) {
  if (CW === నిర్వచించబడలేదు) {
    CW = నిజం;
  }
  startAngle = turtle.కోణము - Math.PI / 2; // కుంచికను సాధారణ కాన్వాస్ కోఆర్డినేట్‌కు అనువదించండి
  imageContext.save();
  సెంటర్‌కార్డ్స్ (ఇమేజ్‌కాంటెక్స్ట్);
  imageContext.beginPath ();
  imageContext.strokeStyle = turtle.రంగు;
  //imageContext.fillStyle=turtle.రంగు;
  // సందర్భ అనువాదం కారణంగా కోణాలను మరియు CW ని తిరస్కరించండి
  if (పరిధి === నిర్వచించబడలేదు) {
   imageContext.arc (turtle.pos.x, turtle.pos.y, వ్యాసార్థం, 0, 2 * Math.PI);
  } else ఉంటే (CW) {
    imageContext.arc (turtle.pos.x, turtle.pos.y, వ్యాసార్థము, -startAngle, - (startAngle + degToRad (పరిధి)), CW);
  } లేకపోతే {
    imageContext.arc (turtle.pos.x, turtle.pos.y, వ్యాసార్థము, -startAngle, - (startAngle-degToRad (పరిధి)), CW);
  }
  // పెన్ను పైకి లేదా క్రిందికి సంబంధం లేకుండా గీయండి
  imageContext.stroke ();
  //imageContext.fill();
  imageContext.restore ();
  drawIf ();
}

arc = వృత్తం;


/*******************************************************************************
 * డాట్ - కుంచిక స్థానం వద్ద నిండిన వృత్తాన్ని గీయండి
 *
 * వాదనలు:
 * పరిమాణం: పిక్సెల్‌లలో డాట్ యొక్క వ్యాసార్థం (పెన్సైజ్ + 4, 2 * పెన్సైజ్ గరిష్టంగా ఐచ్ఛిక డిఫాల్ట్‌లు)
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ డాట్ (పరిమాణం) {
  if (పరిమాణం == నిర్వచించబడలేదు) {
    size = Math.max (turtle.వెడల్పు + 4, turtle.వెడల్పు * 2);
  }
  imageContext.save();
  సెంటర్‌కార్డ్స్ (ఇమేజ్‌కాంటెక్స్ట్);
  imageContext.beginPath ();
  imageContext.fillStyle = turtle.రంగు;
  imageContext.strokeStyle = turtle.రంగు;
  imageContext.arc (turtle.pos.x, turtle.pos.y, size, 0, 2 * Math.PI);
  // పెన్ను పైకి లేదా క్రిందికి సంబంధం లేకుండా గీయండి
  imageContext.stroke ();
  imageContext.fill ();
  imageContext.restore ();
  drawIf ();
}


/*******************************************************************************
 * పెనప్ - కుంచిక పెన్ను పైకి ఎత్తండి (మార్కింగ్ స్థితిని తప్పుడుగా సెట్ చేయండి)
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ పెనప్ () {
  turtle.కుంచికనుదింపు = తప్పుడు;
}

pu = పెనప్;
పైకి = పెనప్;
కుంచికనుఎత్తు = పెనప్;


/*******************************************************************************
 * పెండౌన్ - కుంచిక పెన్ను వదలండి (మార్కింగ్ స్థితిని ఒప్పుకు సెట్ చేయండి)
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ పెండౌన్ () {
  turtle.కుంచికనుదింపు = నిజం;
}

pd = పెండౌన్;
down = పెండౌన్;
కుంచికనుదింపు = పెండౌన్;


/*******************************************************************************
 * కుంచికనుఅదృశ్యముచేయి - కుంచిక గీయవద్దు
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ కుంచికనుఅదృశ్యముచేయి () {
   turtle.visible = తప్పుడు;
   drawIf ();
}

ht = కుంచికనుఅదృశ్యముచేయి;
కుంచికనుఅదృశ్యముచేయి = కుంచికనుఅదృశ్యముచేయి;


/*******************************************************************************
 * కుంచిక చూపించు - కుంచిక గీయండి
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ షోటెర్టిల్ () {
   turtle.visible = నిజం;
   drawIf ();
}

st = కుంచికనుచూపు;
కుంచికనుచూపు = కుంచికనుచూపు;


/*******************************************************************************
 * గోటో - కుంచిక గుర్తును వదలకుండా x, y స్థానానికి తరలించండి
 *
 * వాదనలు:
 * x: x కోఆర్డినేట్
 * y: y కోఆర్డినేట్
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ గోటో (x, y) {
   turtle.pos.x = x;
   turtle.pos.y = y;
   drawIf ();
}

స్థానానికివెళ్ళు = గోటో;
స్థానానికివెళ్ళు = గోటో;
స్థానానికివెళ్ళు = గోటో;
స్థానానికివెళ్ళు = గోటో;


/*******************************************************************************
 * setx - కుంచిక x- కోఆర్డినేట్‌ను గుర్తు పెట్టకుండా మార్చండి
 *
 * వాదనలు:
 * x: x కోఆర్డినేట్
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ setx (x) {
   turtle.pos.x = x;
   drawIf ();
}

setX = setx;


/*******************************************************************************
 * సెట్టి - కుంచిక వై-కోఆర్డినేట్‌ను గుర్తును వదలకుండా మార్చండి
 *
 * వాదనలు:
 * y: y కోఆర్డినేట్
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ సెట్లు (లు) {
   turtle.pos.y = y;
   drawIf ();
}

setY = సెట్లు;


/*******************************************************************************
 * కోణం - కుంచిక కోణాన్ని డిగ్రీలలో సెట్ చేయండి
 *
 * వాదనలు:
 * కోణం: ఎగువ కేంద్రం నుండి సవ్యదిశలో డిగ్రీలలో (పూర్ణాంకానికి) కోణం.
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ కోణం {
   turtle.కోణము = degToRad (ang);
   drawIf ();
}

setheading = కోణం;
setHeading = కోణం;
seth = కోణం;


/*******************************************************************************
 * నేపథ్యం - నేపథ్య రంగును సెట్ చేయండి
 *
 * వాదనలు:
 * స్టైల్: పూరక శైలి (రంగు, ప్రవణత లేదా నమూనా), కుంచిక రంగుకు డిఫాల్ట్ అవుతుంది
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/

ఫంక్షన్ నేపథ్యం (స్టైల్) {
    if (స్టైల్ == నిర్వచించబడలేదు) {
       styl = turtle.రంగు;
    }
    if (typeof (styl) === "number") {
      if (స్టైల్ <16) {// ప్రామాణిక లోగో కుంచిక రంగును ume హించుకోండి
        style = logoColors [శైలి];
      } //లేకపోతే {
        // రంగు 32-బిట్ రంగు విలువగా భావించబడుతుంది
      //}
    } else if (typeof (styl)! = "string") {// col మద్దతు ఉన్న రకం కాదు
      styl = "నలుపు";
    }
    imageContext.fillStyle = స్టైల్;
    imageContext.fillRect (0, 0, imageCanvas.width, imageCanvas.height);
    //imageContext.fill;
}


/*******************************************************************************
 * వ్రాయండి - కుంచిక మార్గంలో కొంత వచనాన్ని ముద్రించండి, కుంచిక కదలదు
 *
 * వాదనలు:
 * msg: ముద్రించాల్సిన వచనం
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ రైట్ (msg) {
   imageContext.save();
   సెంటర్‌కార్డ్స్ (ఇమేజ్‌కాంటెక్స్ట్);
   imageContext.translate (turtle.pos.x, turtle.pos.y);
   imageContext.transform (1, 0, 0, -1, 0, 0);
   imageContext.rotate (turtle.కోణము - Math.PI / 2);
   imageContext.textAlign = "ఎడమ";
   imageContext.textBaseline = "దిగువ";
   imageContext.fillStyle = turtle.రంగు;
   imageContext.fillText (msg, 0, 0);
   imageContext.restore ();
   drawIf ();
}


/*******************************************************************************
 * యాదృచ్ఛికం - తక్కువ (లేదా పేర్కొనబడకపోతే 0) మరియు అధిక మధ్య యాదృచ్ఛిక పూర్ణాంకాన్ని ఉత్పత్తి చేస్తుంది
 *
 * వాదనలు:
 * తక్కువ: యాదృచ్ఛిక సంఖ్య యొక్క తక్కువ పరిమితి (0, ఒక పరామితిని మాత్రమే ఉపయోగిస్తే)
 * అధిక: యాదృచ్ఛిక సంఖ్య యొక్క అధిక పరిమితి
 *
 * రాబడి:
 * (పూర్ణాంకానికి) యాదృచ్ఛిక సంఖ్యను ఉత్పత్తి చేసింది
 ******************************************************************************/
ఫంక్షన్ యాదృచ్ఛిక (తక్కువ, అధిక) {
   if (అధిక == నిర్వచించబడలేదు) {
     తిరిగి Math.floor ((తక్కువ + 1) * Math.random ());
   } లేకపోతే {
     తిరిగి Math.floor (Math.random () * (అధిక - తక్కువ + 1) + తక్కువ);
   }
}


/*******************************************************************************
 * పునరావృతం - ఒక చర్యను n సార్లు పునరావృతం చేయండి
 *
 * వాదనలు:
 * n: చర్యను పునరావృతం చేయడానికి ఎన్నిసార్లు
 * చర్య: ఒక ఫంక్షన్‌కు సూచన
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ రిపీట్ (n, చర్య) {
   var కౌంట్ = 1;
   (కౌంట్ = 1; కౌంట్ <= n; కౌంట్ + = 1) {
      చర్య ();
      if (errorFound)
        విచ్ఛిన్నం;
   }
}


/*******************************************************************************
 * నిద్ర - అనేక మిల్లీసెకన్ల కోసం వేచి ఉండండి
 *
 * గమనిక:
 * ఇది చాలా సమర్థవంతమైన లేదా సొగసైన మార్గం కాదు
 * ఇది డ్రాయింగ్ అన్వయించటానికి కారణం కాదు, బదులుగా ఆలస్యాన్ని ఉపయోగించండి
 *
 * వాదనలు:
 * ms: ఫంక్షన్ f ను అమలు చేయడానికి ముందు ఆలస్యం యొక్క మిల్లీసెకన్ల సంఖ్య
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ నిద్ర (ms) {
  var ప్రారంభం = క్రొత్త తేదీ (). getTime ();
  var పరిమితి = 1000 * 60 * 1; // గరిష్ట సమయాన్ని 1 నిమిషానికి సెట్ చేయండి
  var i = 0;
  (i = 0; i <పరిమితి; i + = 1) {
    if ((క్రొత్త తేదీ (). getTime () - ప్రారంభం)> ms) {
      విచ్ఛిన్నం;
    }
  }
}

pause = నిద్ర;


/////// ATTRIBUTE FUNCTIONS


/*******************************************************************************
 * వెడల్పు - రేఖ యొక్క వెడల్పును సెట్ చేయండి
 *
 * వాదనలు:
 * w: (పూర్ణాంకానికి) రేఖ యొక్క వెడల్పు
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ వెడల్పు (w) {
   turtle.వెడల్పు = w;
   imageContext.lineWidth = w;
}

pensize = వెడల్పు;
penwidth = వెడల్పు;
penSize = వెడల్పు;
penWidth = వెడల్పు;


/*******************************************************************************
 * రంగు - లైన్ యొక్క రంగును సెట్ చేయండి మరియు కుంచిక గ్రాఫిక్ మరియు CSS రంగులను ఉపయోగించి పూరించండి
 *
 * వాదనలు:
 * col: అనేక ఫార్మాట్లలో ఒకదానిలో రంగు:
 * హెక్సాడెసిమల్ రంగులు (ఉదా., "# Ff0000", "# f00")
 * RGB రంగులు (ఉదా., "Rgb (255,0,0%")
 * RGBA రంగులు (ఉదా., "Rgba (255,0,0,1%")
 * HSL రంగులు (ఉదా., "Hsl (120, 100%, 50%)")
 * HSLA రంగులు (ఉదా., "Hsla (120, 100%, 50%, 1%")
 * ముందే నిర్వచించిన / క్రాస్ బ్రౌజర్ రంగు పేర్లు (ఉదా., "ఎరుపు")
 * లోగో రంగు సంఖ్యలు 0 నుండి 15 వరకు సూచికగా: * /
logoColors = ["నలుపు", "నీలం", "సున్నం", "సియాన్", "ఎరుపు", "మెజెంటా", "పసుపు", "తెలుపు",
              "బ్రౌన్", "టాన్", "గ్రీన్", "ఆక్వా", "సాల్మన్", "పర్పుల్", "ఆరెంజ్", "గ్రే"]
/*
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ రంగు (కోల్) {
  if (typeof (col) === "number") {
    if (col <16) {// ప్రామాణిక లోగో కుంచిక రంగును ume హించుకోండి
      col = లోగో కలర్స్ [col];
    } //లేకపోతే {
      // రంగు 32-బిట్ రంగు విలువగా భావించబడుతుంది
    //}
  } else if (typeof (col)! = "string") {// col మద్దతు ఉన్న రకం కాదు
    col = "నలుపు";
  }
  turtle.రంగు = col;
  imageContext.strokeStyle = col;
}

రంగు = రంగు;


/*******************************************************************************
 * అక్షరరూపము_స్థాపించు - రైట్ ఫంక్షన్ ఉపయోగించే ఫాంట్‌ను సెట్ చేయండి
 *
 * వాదనలు:
 * ఫాంట్: ఫాంట్ లక్షణాలను నిర్వచించే స్ట్రింగ్ (శైలి, వేరియంట్, బరువు, పరిమాణం,
 * మరియు తదుపరి రచనల కోసం ఫాంట్-కుటుంబం.
 * ఉదాహరణ: సెట్‌ఫాంట్ ("ఇటాలిక్ స్మాల్ క్యాప్స్ బోల్డ్ 12 పిక్స్ కొరియర్")
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ సెట్‌ఫాంట్ (ఫాంట్) {
   turtle.font = ఫాంట్;
   imageContext.font = ఫాంట్;
}

setFont = అక్షరరూపము_స్థాపించు;


/*******************************************************************************
 * maxX - గరిష్ట X విలువను పొందండి
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి:
 * (పూర్ణాంకానికి) ప్రస్తుత కాన్వాస్‌కు గరిష్ట X విలువ
 ******************************************************************************/
ఫంక్షన్ గరిష్ఠX() {
  తిరిగి (imageContext.canvas.width / 2);
}

maxx = maxX;


/*******************************************************************************
 * minX - కనిష్ఠ X విలువను పొందండి
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి:
 * (పూర్ణాంకానికి) ప్రస్తుత కాన్వాస్‌కు కనీస X విలువ
 ******************************************************************************/
ఫంక్షన్ కనిష్ఠX() {
  తిరిగి (-imageContext.canvas.width / 2);
}

minx = minX;


/*******************************************************************************
 * గరిష్ఠ_Y - గరిష్ట Y విలువను పొందండి
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి:
 * (పూర్ణాంకానికి) ప్రస్తుత కాన్వాస్‌కు గరిష్ట Y విలువ
 ******************************************************************************/
ఫంక్షన్ గరిష్ఠY() {
  తిరిగి (imageContext.canvas.height / 2);
}

maxy = గరిష్ఠ_Y;


/*******************************************************************************
 * minY - కనిష్ఠ Y విలువను పొందండి
 *
 * వాదనలు: ఏదీ లేదు
 *
 * రాబడి:
 * (పూర్ణాంకానికి) ప్రస్తుత కాన్వాస్‌కు కనీస Y విలువ
 ******************************************************************************/
ఫంక్షన్ minY () {
  తిరిగి (-imageContext.canvas.height / 2);
}

miny = minY;



/////// యానిమేషన్ సబ్-మాడ్యూల్
// ఇది ఎప్పుడైనా ప్రత్యేక మాడ్యూల్‌గా విభజించబడాలి

// కొన్ని గ్లోబల్
var విరామాలు = []; // యానిమేట్ ఫంక్షన్‌తో ఇంటెల్ ఐడిల శ్రేణి ప్రారంభమైంది
var సమయం ముగిసింది = []; // ఆలస్యం ఫంక్షన్‌తో సమయం ముగిసిన ID ల శ్రేణి


/*******************************************************************************
 * యానిమేట్ - డ్రాయింగ్‌ను యానిమేట్ చేయడానికి ప్రతి ఎంఎస్ మిల్లీసెకన్ల చర్యను పునరావృతం చేయండి
 *
 * వాదనలు:
 * f: ఒక ఫంక్షన్‌కు సూచన
 * ms: ఫంక్షన్ f అమలు మధ్య మిల్లీసెకన్ల సంఖ్య
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ యానిమేట్ (f, ms) {
   intervals.push (setInterval (ఫంక్షన్ () {
      f ()
      if (errorFound)
        ఆపండి ()
   }, కుమారి));
   document.getElementById ("stopButton"). దాచిన = తప్పుడు;
}

/*******************************************************************************
 * ఆలస్యం - డ్రాయింగ్‌ను యానిమేట్ చేయడానికి ms మిల్లీసెకన్ల కోసం చర్యను ఆలస్యం చేయండి
 *
 * వాదనలు:
 * f: ఒక ఫంక్షన్‌కు సూచన
 * ms: ఫంక్షన్ f ను అమలు చేయడానికి ముందు ఆలస్యం యొక్క మిల్లీసెకన్ల సంఖ్య
 *
 * రాబడి: ఏదీ లేదు
 ******************************************************************************/
ఫంక్షన్ ఆలస్యం (f, ms) {
   timeouts.push (setTimeout (ఫంక్షన్ () {
       timeouts.pop (); // ప్రస్తుత టైమర్‌ను పాప్ చేయండి
       if (timeouts.length == 0) {
         document.getElementById ("stopButton"). దాచిన = నిజం;
       }
       f ();
       if (errorFound)
         ఆపండి ()
     }, కుమారి));
   document.getElementById ("stopButton"). దాచిన = తప్పుడు;
}


/////// మద్దతు విధులు


/*******************************************************************************
 * degToRad - కోణీయ క్షీణతను రేడియన్లుగా మార్చండి
 *
 * వాదనలు:
 * డిగ్రీ: (పూర్ణాంకానికి) డిగ్రీల సంఖ్య
 *
 * రాబడి:
 * (పూర్ణాంకానికి) రేడియన్ల సంఖ్య
 ******************************************************************************/
ఫంక్షన్ degToRad (deg) {
   రిటర్న్ డిగ్రీ / 180 * మఠం.పిఐ;
}


/*******************************************************************************
 * radToDeg - రేడియన్లను కోణీయ డిగ్రీలుగా మార్చండి
 *
 * వాదనలు:
 * రాడ్: (పూర్ణాంకానికి) రేడియన్ల సంఖ్య
 *
 * రాబడి:
 * (పూర్ణాంకానికి) డిగ్రీల సంఖ్య
 ******************************************************************************/
ఫంక్షన్ రాడ్‌టోడెగ్ (రాడ్) {
   రిటర్న్ రాడ్ * 180 / మఠం.పిఐ;
}


/*******************************************************************************
 * నిర్బంధించు - అధిక మరియు తక్కువ పరిమితుల మధ్య కోణాన్ని పరిమితం చేయండి
 *
 * వాదనలు: ఏదీ లేదు
 * n: (పూర్ణాంకానికి లేదా తేలియాడే) సంఖ్య విరుద్ధంగా ఉండవచ్చు
 * తక్కువ: (పూర్ణాంక లేదా ఫ్లోట్) సాధ్యమైనంత తక్కువ తిరిగి వచ్చే విలువ
 * అధిక: (పూర్ణాంక లేదా తేలియాడే) అత్యధిక రాబడి విలువ
 *
 * రాబడి:
 * (పూర్ణాంక లేదా తేలియాడే) నిర్బంధ విలువ
 ******************************************************************************/
ఫంక్షన్ పరిమితి (n, తక్కువ, అధిక) {
  var మాడ్యులో = అధిక - తక్కువ;
  (n <తక్కువ) while
    n = n + మాడ్యులో;
  }
  (n> అధిక) while
    n = n - మాడ్యూల్;
  }
  తిరిగి n;
}


var turtleState = కొత్త కుంచిక ();

ఫంక్షన్ saveTurtleState (tState) {
  // tState అనేది కుంచిక స్థితిని నిర్వచించే వస్తువు
  // కుంచిక కుంచిక యొక్క ప్రస్తుత స్థితిని నిర్వచించే వస్తువు
  // ఫాంట్ గురించి ఏమిటి
  tState.pos.x = turtle.pos.x
  tState.pos.y = turtle.pos.y
  tState.కోణము = turtle.కోణము
  tState.కుంచికనుదింపు = turtle.కుంచికనుదింపు
  tState.width = కుంచిక.విడ్త్
  tState.visible = turtle.visible
  tState.redraw = turtle.redraw
  tState.shape = కుంచిక.షాప్
  tState.wrap = turtle.wrap
  tState.font = కుంచిక.ఫాంట్
  tState.color = turtle.రంగు
  console.log ("sTS font:" + tState.font + "color:" + tState.color)
}


ఫంక్షన్ పునరుద్ధరణ టర్టిల్ స్టేట్ (టిస్టేట్) {
  // tState అనేది కుంచిక స్థితిని నిర్వచించే వస్తువు
  // కుంచిక కుంచిక యొక్క ప్రస్తుత స్థితిని నిర్వచించే వస్తువు
  // ఫాంట్ గురించి ఏమిటి
  turtle.pos.x = tState.pos.x
  turtle.pos.y = tState.pos.y
  turtle.కోణము = tState.కోణము
  turtle.కుంచికనుదింపు = tState.కుంచికనుదింపు
  turtle.వెడల్పు = tState.width
  turtle.visible = tState.visible
  turtle.redraw = tState.redraw
  turtle.shape = tState.shape
  turtle.wrap = tState.wrap
  turtle.font = tState.font
  turtle.రంగు = tState.color

  imageContext.font = tState.font;
  imageContext.lineWidth = tState.width;
  imageContext.strokeStyle = tState.color;
  console.log ("rTS font:" + turtle.font + "color:" + turtle.రంగు)
  console.log ("rTS font:" + imageContext.font + "color:" + imageContext.strokeStyle)
}


ఫంక్షన్ లాగ్ టర్టిల్ (ఎక్కడ) {
  // t అనేది కుంచిక స్థితిని నిర్వచించే వస్తువు
  if (where === undefined) where = "???"
  console.log (ఇక్కడ + "x:" + turtle.pos.x + "y:" + turtle.pos.y + "కోణము:" + turtle.కోణము + "color:" + turtle.రంగు)
  console.log ("కుంచికనుదింపు:" + turtle.కుంచికనుదింపు + "width:" + turtle.వెడల్పు + "కనిపించేది:" + turtle.visible)
  console.log ("redraw:" + turtle.redraw + "ఆకారం:" + turtle.shape + "wrap:" + turtle.wrap)
  console.log ("font:" + turtle.font)
}


రీసెట్ ();