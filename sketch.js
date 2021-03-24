var gameState = "PLAY"
var tower, towerImg
var climber, climberImg
var dorr, doorImg
var ghost, ghostImg

var doorGroup
var climberGroup

function preload() {
  
  towerImg = loadImage("tower.png")
  climberImg = loadImage("climber.png")
  doorImg = loadImage("door.png")
  ghostImg = loadImage("ghost-jumping.png") 
  
}

function setup() {
  
  createCanvas(600, 600)
  
  tower = createSprite(300, 300)
  tower.addImage(towerImg)
  
  ghost = createSprite(200, 200)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3
  
  doorGroup = new Group()
  climberGroup = new Group() 
  
}

function draw() {
  background(0)
 
  
  if (gameState === "PLAY") 
  {
    
    if (tower.y > 400) 
       {
      tower.y=300
       }
    
      tower.velocityY = 1
    
    if (keyDown("left_arrow")) 
      {
        ghost.x = ghost.x-3
      }
    if (keyDown("right_arrow"))
      {
        ghost.x = ghost.x+3
      }
    if (keyDown("space")) 
      {
        ghost.velocityY = -10
      }
    ghost.velocityY = ghost.velocityY+0.8
    
    if (ghost.isTouching(climberGroup) || ghost.y > 600) 
      {
        ghost.destroy() 
        gameState = "END"
      }
    
  }
  if (gameState === "END") {
    
    doorGroup.destroyEach()
    climberGroup.destroyEach() 
    tower.destroy() 
    textSize(30)
    fill("red") 
    text("Game Over", 200, 200) 
    
  }
  
  spawnDoors() 
  
  drawSprites() 
  
}

function spawnDoors() {
  
  if (frameCount % 200 === 0) {
    
    door = createSprite(200, -50)
    climber = createSprite(200, 10) 
    
    door.addImage(doorImg)
    climber.addImage(climberImg)
    
    door.velocityY = 1
    climber.velocityY = 1
    
    door.x = Math.round(random(100, 400)) 
    climber.x = door.x
    
    door.lifetime = 600
    climber.lifetime = 600
    
    ghost.depth = door.depth
    ghost.depth = ghost.depth+1
    
    doorGroup.add(door) 
    climberGroup.add(climber) 
    
  } 
  
}