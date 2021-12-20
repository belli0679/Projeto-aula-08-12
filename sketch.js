//A histórinha do jogo é a seguinte:
//Stacy estava precisando de um descanso e foi para o mato/campo, 
//e lá ela queria se exercitar e viu os lindos bixinhos descansando e pensou: 
//"Por que não pular esses lindos bichanos?"

var cowgirl, cowgirlCorrendo, cowgirlbateu, checkpoint, trexpulandoSom;

var grama, gramafotinha;

var chaoinvisivel;

var ceu;

var nuvem, nuvemImg, grupodenuvens;

var galinhaobs1, galinhaobs2, galinhaobs3, vacaobs1, vacaobs2, vacaobs3, grupodeobs; 

var placar;

var restart = 0;

var jogando = 1;

var gameover, gameoverimage, gameoverSom;

var resetar, resetarimage;

var estado = jogando;

function preload(){

    cowgirlCorrendo = loadAnimation("cowgirl1.png", "cowgirl2.png", "cowgirl3.png");
    
    cowgirlbateu = loadAnimation("cowgirl_die.png");

    gramafotinha = loadImage("grama.png");

    ceu = loadImage("ceu.png");

    nuvemImg = loadImage("nuvem.png");

    resetarimage = loadImage("tryAgain.png");

    gameoverimage = loadImage("gameoverImage.png");

    galinhaobs1 = loadImage("galinha1.png");
    galinhaobs2 = loadImage("galinha2.png");
    galinhaobs3 = loadImage("galinha3.png");
    vacaobs1 = loadImage("vaca1.png");
    vacaobs2 = loadImage("vaca2.png");
    vacaobs3 = loadImage("vaca3.png");

    checkpoint = loadSound("checkPoint.mp3");

    trexpulandoSom = loadSound("jump.mp3");

    gameoverSom = loadSound("die.mp3");

}

function setup(){

    createCanvas(windowWidth,windowHeight);

    console.log (windowWidth, windowHeight);

    cowgirl = createSprite(160,670,20,50);
    cowgirl.addAnimation("correndo", cowgirlCorrendo);
    cowgirl.addAnimation("bateu", cowgirlbateu);
    cowgirl.scale = 1;

    borda = createEdgeSprites();

    grama = createSprite(200, 390, width, 20);
    grama.addImage ("tudo", gramafotinha);
    grama.x = grama.width/50;
    grama.scale = 1;

    chaoinvisivel = createSprite(200, 720, 400, 10);
    chaoinvisivel.visible = false;

    gameover = createSprite(windowWidth/2, windowHeight/2-300);
    gameover.addImage(gameoverimage);
    gameover.scale = 2;

    resetar = createSprite( windowWidth/2, windowHeight/2-100);
    resetar.addImage(resetarimage);
    resetar.scale = 1;

    grupodenuvens = new Group();
    grupodeobs = new Group();

    placar = 0;

    cowgirl.setCollider("rectangle", 0, 0, 30, 120);
    //cowgirl.debug = true;

}

function draw(){

    console.log (mouseY);

    background(ceu);
    //console.log(frameCount);

    
    text("Placar: "+ placar, windowWidth - 180, 50);

    if(estado === jogando){
        
        placar = placar + Math.round(frameRate()/60);
        if(placar > 0 && placar % 100 === 0){
            checkpoint.play();

        }

        gameover.visible = false;
        resetar.visible = false;

        grama.velocityX = -(2 + placar/100);
            
        if(grama.x < 0){
            grama.x = grama.width/2;
        }

        if(keyDown("space") && cowgirl.y >= 640){
            cowgirl.velocityY = -12;
            trexpulandoSom.play();

        }

        cowgirl.velocityY = cowgirl.velocityY + 1;

        nuvens();

        GalinhaseVacas();

        if(grupodeobs.isTouching (cowgirl)){

            gameover.visible = true;
            resetar.visible = true;
            estado = restart;
            gameoverSom.play();

        }

    } else if (estado === restart){

        grupodeobs.setVelocityXEach (0);

        grupodenuvens.setVelocityXEach (0);

        grama.velocityX = 0;

        cowgirl.changeAnimation("bateu", cowgirlbateu);

        grupodeobs.setLifetimeEach(-1);

        grupodenuvens.setLifetimeEach(-1);

        cowgirl.velocityY = 0;
        
        if(mousePressedOver(resetar)){
            reset();
        }

    }

    //console.log(cowgirl.y);
    //console.log(mouseX);
    //console.log(mouseY);

    //impede que o trex caixa
    cowgirl.collide(chaoinvisivel);

    //desenha todos os sprites
    drawSprites();

}

function reset(){
    
    estado = jogando;

    gameover.visible = false;
    resetar.visible = false;

    grupodeobs.destroyEach();
    grupodenuvens.destroyEach();

    cowgirl.changeAnimation("correndo", cowgirlCorrendo);

    placar = 0;

}

function nuvens(){

    if(frameCount % 60 === 0){

        nuvem = createSprite (1980, 700, 40, 10);
        nuvem.addImage(nuvemImg);
        
        nuvem.y = Math.round(random (20, 620));
        nuvem.velocityX = -3;
        
        nuvem.depth = cowgirl.depth;

        cowgirl.depth = cowgirl.depth + 1;

        grupodenuvens.add(nuvem);

        nuvem.lifetime = 380;
        
    }

}

function GalinhaseVacas(){

    if(frameCount % 70 === 0){

        galinhaVacaObs = createSprite (1980, 720, 10, 40);
        galinhaVacaObs.velocityX = -(6 + placar/100);

        var um = Math.round(random(1, 6));

        switch(um){
            
            case 1: galinhaVacaObs.addImage(galinhaobs1);
            break;
            case 2: galinhaVacaObs.addImage(galinhaobs2);
            break;
            case 3: galinhaVacaObs.addImage(galinhaobs3);
            break;
            case 4: galinhaVacaObs.addImage(vacaobs1);
            break;
            case 5: galinhaVacaObs.addImage(vacaobs2);
            break;
            case 6: galinhaVacaObs.addImage(vacaobs3);
            default: break;
        }

        galinhaVacaObs.scale = 1;

        grupodeobs.add(galinhaVacaObs);

        galinhaVacaObs.lifetime = 380;

    }



}

