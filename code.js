setScreen("phoneScreen");
var date = new Date();
var month = date.getMonth();
var day = date.getDate();
var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var emotionList = ["Scared/Stressed", "Angry", "Embarrassed", "Sad", "Normal/Okay", "Playful", "Happy", "Confident", "Loved", "Amazing!"];
var emotionRating;
var loadingBrainY;
var loadingBrainTime;
var emotionInput1;
var emotionInput2;
var breathex=115;
var breathey=195;
var breathewh=93;
var breathingControl=1;
var bubbleLook = ["assets/purpleBubble.png", "assets/purpleBubblePop.png", "assets/tealBubble.png", "assets/tealBubblePop.png", "assets/pinkBubble.png", "assets/pinkBubblePop.png"];
var bubbleMessage = ["assets/m.YAA.png", "assets/m.YAS.png", "assets/m.YM.png", "assets/m.NII.png", "assets/m.BY.png", "assets/m.YGT.png", "assets/m.MASOS.png", "assets/m.KIP.png", "assets/m.EDIAND.png", "assets/m.HCABK.png", "assets/m.SC.png", "assets/m.DWBH.png"];
var bubbleX;
var bubbleY;
var pencilSize=20;
var initiateDraw;
var objectx;
var objecty;
var fishx;
var jellyy;
function screenSwitch (button, screen) {
  onEvent(button, "click", function () {
     setScreen(screen);
  });
}
function bubbleMovement(bubble, movementX, movementY) {
  timedLoop(100, function () {
    bubbleX = getXPosition(bubble);
    bubbleY = getYPosition(bubble);
    if (bubbleX<0 || bubbleX>200) {
      movementX=-movementX;
    }
    if (bubbleY<78 || bubbleY>285) {
      movementY=-movementY;
    }
    setPosition(bubble, bubbleX + movementX, bubbleY + movementY, 120, 120);
  });
  onEvent(bubble, "click", function () {
    setTimeout(function() {
      movementX=-movementX;
      movementY=-movementY;
    }, 2000);
  });
}

function movement(object, speed, movementX, movementY, leftend, rightend, highend, lowend, w, h) {
  timedLoop(speed, function () {
    objectx = getXPosition(object);
    objecty = getYPosition(object);
    if (objectx<leftend || objectx>rightend) {
      movementX=-movementX;
    }
    if (objecty<highend || objecty>lowend) {
      movementY=-movementY;
    }
    setPosition(object, objectx + movementX, objecty + movementY, w, h);
  });
}

function fish (object, speed, leftend, rightend, faceright, faceleft) {
  timedLoop(speed, function () {
    fishx = getXPosition(object);
    if (fishx<leftend) {
      setImageURL(object, faceright);
    }
    if (fishx>rightend) {
      setImageURL(object, faceleft);
    }
  });
}

function fade (speed, cover, coloramount, change, r, g, b) {
  timedLoop (speed, function () {
    if (coloramount>1 || coloramount<0) {
      change=-change;
    }
    setProperty(cover, "background-color", rgb(r, g, b, coloramount));
    coloramount=coloramount+change;
  });
}

//Home sceen to loading
  onEvent("appButton", "click", function() {
    setScreen("loadingAndMission");
    setPosition("loadingBrain", 105, 235, 100, 100);
    loadingBrainTime = 0;
    timedLoop(1000, function() {
      loadingBrainY = getYPosition("loadingBrain");
      loadingBrainTime++;
      if (loadingBrainY == 235){
        setPosition("loadingBrain", 105, loadingBrainY+5, 100, 100);
        console.log("down");
      } else if (loadingBrainY == 240){
        setPosition("loadingBrain", 105, loadingBrainY-5, 100, 100);
        console.log("up");
      }
      if (loadingBrainTime == 6){
        stopTimedLoop();
        setScreen("emotionEntries");
      }
      });
  });

//Entries to menu
  setProperty("monthCurrent","text", monthList[month]);
  setProperty("dayCurrent", "text", day);
  onEvent("emotions", "mousemove", function(){
    emotionRating = getNumber("emotions");
    setProperty("emotionsTxt", "text", emotionList[emotionRating]);
  });
  
  onEvent("logIt", "click", function() {
    emotionInput1 = getText("threeWords");
    emotionInput2 = getText("hlb");
    if (emotionInput1!="" && emotionInput2!="") {
      setScreen("loadingAndMission");
      setPosition("loadingBrain", 105, 235, 100, 100);
      loadingBrainTime = 0;
      timedLoop(1000, function() {
        loadingBrainY = getYPosition("loadingBrain");
        loadingBrainTime++;
        if (loadingBrainY == 235){
          setPosition("loadingBrain", 105, loadingBrainY+5, 100, 100);
          console.log("down");
        } else if (loadingBrainY == 240){
          setPosition("loadingBrain", 105, loadingBrainY-5, 100, 100);
          console.log("up");
        }
        if (loadingBrainTime == 6){
          stopTimedLoop();
          setScreen("menu");
        }
        });
    }
  });
  
//Menu
  screenSwitch ("breatheButton", "takeABreather");
  screenSwitch ("gameButton", "gameOn");
  screenSwitch ("sightsButton", "ETS");
  
//Breathing Exercise
onEvent("breatheButton", "click", function (){
  console.log("exercise start");
  timedLoop(100, function () {
    breathex=getProperty("radiatingCloud", "x");
    breathey=getProperty("radiatingCloud", "y");
    breathewh=getProperty("radiatingCloud", "width");
    if (breathingControl<46 && breathingControl>0){
    setPosition("radiatingCloud", breathex-2, breathey-2, breathewh+4, breathewh+4);
    breathingControl++;
    setPosition("breathingExercise", 93, 355, 135, 26);
    setText("breathingExercise", "Breathe in");
    } 
    else if (breathingControl>-46 && breathingControl<0) {
    setPosition("radiatingCloud", breathex+2, breathey+2, breathewh-4, breathewh-4);
    breathingControl--;
    setPosition("breathingExercise", 86, 355, 148, 26);
    setText("breathingExercise", "Breathe out");
    }
    else if (breathingControl==46){
      breathingControl=-1;
    }
    else if (breathingControl==-46){
      breathingControl=1;
    }
  });
});
screenSwitch ("menuR_TAB", "menu");
onEvent("menuR_TAB", "click", function () {
  stopTimedLoop();
});

//Game on menu
screenSwitch ("positivePopsMButton", "positivePops");
screenSwitch ("calmingColoringMButton", "calmColoring");
screenSwitch ("menuR_GO", "menu");

//Positive Pops
function bubblePop (bubble, lookNum) {  
  setImageURL(bubble, bubbleLook[lookNum]);
  lookNum++;
  onEvent(bubble, "click", function () {
    if (lookNum>5) {
      lookNum=0;
    }
    setImageURL(bubble, bubbleLook[lookNum]);
    lookNum++;
    playSound("assets/category_pop/deep_bubble_notification.mp3", false);
    setTimeout(function () {
      setImageURL(bubble, bubbleMessage[randomNumber(0, 11)]);
      playSound("assets/category_pop/bubble_pop_cluster_2.mp3", false);
    }, 400);
    setTimeout( function () {
      if (lookNum>5) {
        lookNum=0;
      }
      setImageURL(bubble, bubbleLook[lookNum]);
      lookNum++;
      setPosition(bubble, randomNumber(0,200), randomNumber(78,285), 120, 120);
    }, 2000 );
  });
}

bubblePop("bubble1", 0);
bubblePop("bubble2", 2);
bubblePop("bubble3", 4);
bubblePop("bubble4", 0);

onEvent("positivePopsMButton", "click", function (){
  setPosition("bubble1", 35, 115, 120, 120);
  setPosition("bubble2", 180, 115, 120, 120);
  setPosition("bubble3", 35, 270, 120, 120);
  setPosition("bubble4", 180, 270, 120, 120);
  bubbleMovement ("bubble1", -1, -1);
  bubbleMovement ("bubble2", 1, -1);
  bubbleMovement ("bubble3", -1, 1);
  bubbleMovement ("bubble4", 1, 1);
});
screenSwitch("menuR_PP", "menu");
screenSwitch("GOmenuR_PP", "gameOn");
onEvent("menuR_PP", "click", function () {stopTimedLoop();});
onEvent("GOmenuR_PP", "click", function () {stopTimedLoop();});

//Calming Coloring
onEvent("calmingColoringMButton","click",function () {
  setActiveCanvas("coloringcanvas");
  setStrokeColor("#f96e6e");
  setFillColor("#f96e6e");
});
function colors (colorButton, color) {
  onEvent(colorButton, "click", function () {
    setStrokeColor(color);
    setFillColor(color);
  });
}
colors("red", "#f96e6e");
colors("orange", "#f9a86e");
colors("yellow", "#f9eb6e");
colors("green", "#6ef984");
colors("cyan", "#6ef5f9");
colors("blue", "#6eb6f9");
colors("purple", "#b46ef9");
colors("pink", "#f96ee3");
colors("eraser", "#ffffff");
onEvent("sizeSlider","mousemove",function () {
  pencilSize=getNumber("sizeSlider");
});
onEvent("coloringcanvas", "mousedown", function(){
  initiateDraw=true;
});
onEvent("coloringcanvas", "mouseup", function(){
  initiateDraw=false;
});

onEvent("coloringcanvas", "mousemove", function (mouse){
  console.log("coloring");
  if(initiateDraw){
  circle(mouse.x-5, mouse.y-75, pencilSize);}
});
screenSwitch("menuR_CC", "menu");
screenSwitch("GOmenuR_CC", "gameOn");

//ETS menu
screenSwitch ("cosmicChillButton", "cosmicChill");
screenSwitch ("underwaterUnwindButton", "underwaterUnwind");
screenSwitch ("beachBreezeButton", "beachBreeze");
screenSwitch ("menuR_ETS", "menu");

//Cosmic Chill
screenSwitch ("menuR_CosC", "menu");
onEvent("menuR_CosC", "click", function () {
  stopTimedLoop();
  stopSound("assets/spaceAudio.mp3");
});
screenSwitch("ETSmenuR_CosC", "ETS");
onEvent("ETSmenuR_CosC", "click", function () {
  stopTimedLoop();
  stopSound("assets/spaceAudio.mp3");
});

onEvent("cosmicChillButton", "click", function () {
  playSound("assets/spaceAudio.mp3", true);
  movement("planetCrazy", 1570, 1, 1, 49, 80, 28, 50, 85, 80);
  movement("planetSquiggle", 1000, 1, -1, 180, 200, 110, 134, 65, 55);
  movement("planetRings", 1095, -1, -1, 165, 188, 228, 232, 130, 110);
  movement("planetSwirl", 1854, -1, 1, 60, 96, 299, 342, 45, 45);
  fade (800, "purple1", 1, 0.2, 32, 8, 76);
  fade (900, "purple2", 0, 0.15, 32, 8, 76);
  fade (2200, "purple3", 0, 0.18, 32, 8, 76);
  fade (2150, "purple4", 1, 0.2, 32, 8, 76);
  fade (1200, "purple5", 0, 0.17, 32, 8, 76);
  fade (837, "purple6", 0, 0.2, 32, 8, 76);
  fade (988, "purple7", 0, 0.17, 32, 8, 76);
  fade (1895, "purple8", 1, 0.2, 32, 8, 76);
  fade (825, "purple9", 1, 0.15, 32, 8, 76);
});

//Underwater Unwind
screenSwitch ("menuR_UU", "menu");
onEvent("menuR_UU", "click", function () {
  stopTimedLoop();
  stopSound("assets/underwaterAudio.mp3");
});
screenSwitch("ETSmenuR_UU", "ETS");
onEvent("ETSmenuR_UU", "click", function () {
  stopTimedLoop();
  stopSound("assets/underwaterAudio.mp3");
});

onEvent("underwaterUnwindButton", "click", function () {
  playSound("assets/underwaterAudio.mp3", true);
  movement("orangefish", 112, -1, 0, 10, 210, 18, 22, 100, 100);
  fish("orangefish", 102, 10, 210, "assets/orangeFish2.png", "assets/orangeFish.png");
  movement("purplefish", 80, 1, 0, 10, 240, 184, 186, 70, 60);
  fish("purplefish", 86, 10, 240, "assets/purplefish2.png", "assets/purplefish.png");
  movement("pufferfish", 33, -1, 0, 10, 250, 139, 146, 60, 75);
  fish("pufferfish", 33, 10, 250, "assets/puffer2.png", "assets/pufferfish.png");
  movement("jellyfish", 67, 0, -1, 194, 196, 10, 412, 50, 60);
  timedLoop(67, function () {
    jellyy = getYPosition("jellyfish");
    if (jellyy<10) {
      setImageURL("jellyfish", "assets/jellyfish2.png");
    }
    if (jellyy>412) {
      setImageURL("jellyfish", "assets/jellyfish.png");
    }
  });
  });
  
//Beach Breeze
screenSwitch ("menuR_BB", "menu");
onEvent("menuR_BB", "click", function () {
  stopTimedLoop();
  stopSound("assets/beachAudio.mp3");
});
screenSwitch("ETSmenuR_BB", "ETS");
onEvent("ETSmenuR_BB", "click", function () {
  stopTimedLoop();
  stopSound("assets/beachAudio.mp3");
});

onEvent("beachBreezeButton", "click", function (){
  playSound("assets/beachAudio.mp3", true);
  movement("wave2", 150, 0, 1, -1, 1, -36, -1, 320, 161);
  movement("wave1", 60, 0, 1, -1, 1, -90, 3, 320, 270);
  movement("crab", 115, 2, 1, 70, 157, 182, 319, 95, 95);
  fade (825, "sand1", 1, 0.10, 235, 202, 175);
  fade (875, "sand2", 0, 0.16, 235, 202, 175);
  fade (903, "sand3", 1, 0.21, 235, 202, 175);
});