
var chao2
var cactus
var chao
var dinossauro, dino_img;
var chao2;
var nuvem;
var nuvem2;
var cactus;
var pontinhos;
var Gcactus;
var Gnuvem;
var JOGAR=1;
var PERDER=2;
var modo = JOGAR;
var dinopimg;
var predeu2;
var predeu;
var restart;
var restartimage;
var sommorrer;
var som100;
var sompular;


function preload(){
  //pre carrega os arquivos do jogo;
som100= loadSound("checkPoint.mp3");
sommorrer = loadSound("die.mp3");
sompular = loadSound("jump.mp3");


  dino_img = loadAnimation("trex3.png","trex4.png");
  chao2=loadImage("ground2.png");
  nuvem2=loadImage("cloud.png");
cactus1=loadImage("obstacle1.png");
cactus2=loadImage("obstacle2.png");
cactus3=loadImage("obstacle3.png");
cactus4=loadImage("obstacle4.png");
cactus5=loadImage("obstacle5.png");
cactus6=loadImage("obstacle6.png");
dinopimg=loadImage("trex_collided.png");
predeu2=loadImage("gameOver.png");
restartimage=loadImage("restart.png");

}

function setup(){
var tet = 10
  createCanvas(windowWidth,windowHeight);
  
Gcactus=new Group();
Gnuvem=new Group();

pontinhos=0;
  
  chao = createSprite(width/2,height-5,600,5);
chao.x=chao.width/2;
chao.addImage(chao2);
  dinossauro = createSprite(50,height-10,20,20);
  dinossauro.addAnimation("running",dino_img);
  dinossauro.scale = 0.5;
    chao2 = createSprite(width/2,height,width,5);
    chao2.visible = false;
    dinossauro.debug=false;
    dinossauro.setCollider("circle",0,10,30);
    dinossauro.addImage("perde",dinopimg);

    predeu=createSprite(width/2,height/2);
    predeu.addImage(predeu2);
    restart=createSprite(width/2,height/2+50);
    restart.addImage(restartimage);
    restart.visible=false;
    predeu.visible=false;
}
 


function draw(){
  background('white');
  text("pontuação="+pontinhos,450,30);

if(pontinhos%100===0 && pontinhos>0){
  som100.play();

}  


if(modo===JOGAR){ 
  GERARcactus();
  nuvens();    
  pontinhos= pontinhos+Math.round(frameRate()/60);
  if(chao.x<0){ 
    chao.x=chao.width/2; 
  }
  chao.velocityX=-(5+pontinhos/100);
  if(touches.length>0 && dinossauro.isTouching(chao)){
   dinossauro.velocityY = -15; 
    sompular.play();
    touches=[];
  }
  //gravidade
  dinossauro.velocityY = dinossauro.velocityY + 1;
if (dinossauro.isTouching (Gcactus)){
   modo=PERDER;
 sommorrer.play(); 
}
 

}else if(modo===PERDER){
  chao.velocityX=0;
  Gnuvem.setVelocityXEach(0);
  Gcactus.setVelocityXEach(0);
  dinossauro.velocityY=0;
  Gcactus.setLifetimeEach(-1);
 Gnuvem.setLifetimeEach(-1);
 Gcactus.setLifetimeEach(-1);
 dinossauro.changeAnimation('perde');
 restart.visible=true;
    predeu.visible=true;
  if(touches.length>0){
    rezetar();
    touches=[];
  }
} 
 


  dinossauro.collide(chao2);




 drawSprites();
}



function nuvens(){

 if(frameCount%60===0){
  nuvem=createSprite(width+10,90);
  nuvem.velocityX=-3;
  nuvem.addImage(nuvem2);
  nuvem.scale=0.5
  nuvem.y=Math.round(random(height-150,height-50));
  nuvem.depth=dinossauro.depth;
  dinossauro.depth=dinossauro.depth+1;
  nuvem.lifetime=width+10;
  Gnuvem.add(nuvem);
 }
}

function GERARcactus(){
  if(frameCount%60===0){
    cactus = createSprite(width+10,height-20 );
    cactus.velocityX=-(5 + pontinhos/100);
   var rand = Math.round(random(1,6));
   switch(rand){
     case 1 :cactus.addImage(cactus1);
     break;
     case 2 :cactus.addImage(cactus2);
     break;
     case 3 :cactus.addImage(cactus3);
     break;
     case 4 :cactus.addImage(cactus4);
     break;
     case 5 :cactus.addImage(cactus5);
     break;
     case 6 :cactus.addImage(cactus6);
     break;


   }
cactus.scale=0.5;
cactus.lifetime=width+10;
Gcactus.add(cactus);
}
}
  function rezetar(){
    modo = JOGAR;
    Gcactus.destroyEach();
    restart.visible=false;
    predeu.visible=false;
    dinossauro.changeAnimation("running");
    Gnuvem.destroyEach();
    pontinhos=0;

  }