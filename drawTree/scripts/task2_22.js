function addEventHandler(element,type,handler){
  if(element.addEventListener){
    element.addEventListener(type,handler,false);
  }else if(element.attachEvent){
    element.attachEvent("on"+type,handler);
  }else {
    element["on"+type] = handler;
  }
}
var nodeArr=[];
//var nodeArr=[11,7,15,5,9,13,20,3,8,10,12,14,25];//将输入的节点转化成数组
function getInputNode(){
	var btn = document.getElementById("submit1");
	addEventHandler(btn,"click",Handler);
}
var Handler= function(){
  var text = document.getElementById("input-node").value;
  nodeArr = text.split(","); 
  console.log(nodeArr);
  draw();
};
//为数组的每个元素画一个树的节点
function convertImageToCanvas(){
  var canvas = document.getElementById("Btree");
   if(!canvas.getContext) return false;
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0);
  }
  img.src="../image/bg.png";
}
function draw(){
  var canvas = document.getElementById("Btree");
  if(!canvas.getContext) return false;
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle="green";
  ctx.beginPath();
  var ctx1 = ctx.arc(500,50,20,0,Math.PI*2,true);
  ctx.moveTo(500,70);
  ctx.lineTo(350,130);
  ctx.arc(350,150,20,Math.PI*1.5,-Math.PI*0.5,true);
  ctx.moveTo(350,170);
  ctx.lineTo(300,230);
  ctx.arc(300,250,20,Math.PI*1.5,-Math.PI*0.5,true);
  ctx.moveTo(300,270);
  ctx.lineTo(250,330);
  ctx.arc(250,350,20,Math.PI*1.5,-Math.PI*0.5,true);
  ctx.moveTo(350,170);
  ctx.lineTo(400,230);
  ctx.arc(400,250,20,Math.PI*1.5,-Math.PI*0.5,true);
  ctx.moveTo(400,270);
  ctx.lineTo(350,330);
  ctx.arc(350,350,20,Math.PI*1.5,-Math.PI*0.5,true);
  ctx.moveTo(400,270);
  ctx.lineTo(450,330);
  ctx.arc(450,350,20,Math.PI*1.5,-Math.PI*0.5,true);
  ctx.moveTo(500,70);
  ctx.lineTo(650,130);
  ctx.arc(650,150,20,Math.PI*1.5,-Math.PI*0.5,true);
  ctx.moveTo(650,170);
  ctx.lineTo(600,230);
  ctx.arc(600,250,20,Math.PI*1.5,-Math.PI*0.5,true);
  ctx.moveTo(600,270);
  ctx.lineTo(550,330);
  ctx.arc(550,350,20,Math.PI*1.5,-Math.PI*0.5,true);
  ctx.moveTo(600,270);
  ctx.lineTo(650,330);
  ctx.arc(650,350,20,Math.PI*1.5,-Math.PI*0.5,true);
  ctx.moveTo(650,170);
  ctx.lineTo(700,230);
  ctx.arc(700,250,20,Math.PI*1.5,-Math.PI*0.5,true);
  ctx.moveTo(700,270);
  ctx.lineTo(750,330);
  ctx.arc(750,350,20,Math.PI*1.5,-Math.PI*0.5,true);
  ctx.stroke();
  ctx.font="18px serif";
  ctx.fillText(nodeArr[0],492,52);
  ctx.fillText(nodeArr[1],345,152);
  ctx.fillText(nodeArr[2],642,152);
  ctx.fillText(nodeArr[3],295,252);
  ctx.fillText(nodeArr[4],395,252);
  ctx.fillText(nodeArr[5],592,252);
  ctx.fillText(nodeArr[6],692,252);
  ctx.fillText(nodeArr[7],245,352);
  ctx.fillText(nodeArr[8],345,352);
  ctx.fillText(nodeArr[9],442,352);
  ctx.fillText(nodeArr[10],542,352);
  ctx.fillText(nodeArr[11],642,352);
  ctx.fillText(nodeArr[12],742,352);
  console.log(typeof ctx1);
}

var canvasNode = document.getElementById("chart-wrap");
var node = document.createElement("canvas");
node.setAttribute("id", "Btree");
node.width = 1100;
node.height = 600;
canvasNode.appendChild(node);
window.onload=function(){
  getInputNode();
  convertImageToCanvas();
  
}
//树的结构
//11
//7 15
//5 9、 13 20 
//3、 8 10、 12 14、25