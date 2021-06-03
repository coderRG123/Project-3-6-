//Create variables here
var dog, happyDog, Milk;
var database;
var foodS, foodstock;
var foodObj;
var FeedTime, lastFed;
function preload(){
  dog=loadImage("Dog.png");
  happyDog=loadImage("happydog.png");

}

function setup() {
 
	createCanvas(500, 500);
  lastFed=hour()
  

  database=firebase.database();
  d=createSprite(250, 300, 20, 20);
  d.scale=(0.1);
  d.addImage(dog);


food=new Food(80, 100);

feed=createButton("Feed the Dog");
feed.position(620, 60);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(720, 60);
addFood.mousePressed(addFoods);




   
  foodstock=database.ref('Food')
  foodstock.on("value", readStock);

  
}


function draw() {  
  background(46, 139, 87);
  food.display();
  drawSprites();
  
  textSize(20);
  fill("black");
  stroke("black");
  text("food remaining="+ foodS, 200, 250);
  //add styles here






FeedTime=database.ref('FeedTime');
FeedTime.on("value", function(data){
lastFed=data.val();
});



fill(255, 255, 254);
textSize(15);
if(lastFed>=12){
  text("last Fed :"+ lastFed%12 + "PM", 100,30);
} else if(lastFed==0){
  text("Last Fed : 12Pm", 100, 30);
}else{
  text("last Fed : "+lastFed + "AM", 100, 30);
}
    

  
}

function readStock(data){
  foodS=data.val();
  food.foodStock=foodS
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
d.addImage(happyDog);

foodS-=1;
if(foodS<1){
  foodS=0;
}
//food.updateFoodStock(food.getFoodStock()-1);
database.ref('/').update({
  Food:foodS
  
 
})
}


function addFoods(){
 
  foodS++;
  if(foodS>19){
    foodS=20;
  }
  database.ref('/').update({
Food:foodS

  })
}

function getFoodStock(data){ 
  foodS = data.val(); foodObj.foodStock = foodS; console.log(foodS); 
}