    this.value=0,
    this.appertureWidth=.25,
    this.objectDistance=400,
    this.objectHeight=50,
    this.objectCircleRadius=10,
    this.invertedY1=0,
    this.invertedY2=0,
    this.invertedBottom1=0,
    this.invertedBottom2=0,
    this.textToDisplay="Hi! Change the aperture size.",
    this.box={width:200,height:150},
    this.size={width:450,height:190};

    var canvas = new fabric.Canvas('c',{hoverCursor:"pointer",
selection:!0,
backgroundColor:"#339933",
selectionBorderColor:"blue",
})
this.canvas.setWidth(this.size.width),
this.canvas.setHeight(this.size.height);
canvas.renderAll();

var Dispalybox=new fabric.Rect({
    left:20,top:20,fill:"black",width:this.box.width,height:this.box.height,selectable:!1,hasControls:!1,hasBorders:!1});
    this.canvas.add(Dispalybox);

var objectbody=new fabric.Line([
    this.objectDistance+20,(this.box.height-this.objectHeight)/2+20,this.objectDistance+20,(this.box.height+this.objectHeight)/2+20],
    {stroke:"red",strokeWidth:2,selectable:!1,evented:!1,fill:"red"});
    this.canvas.add(objectbody);

var objecthead=new fabric.Circle({
    radius:this.objectCircleRadius,left:this.objectDistance+20-this.objectCircleRadius,
    top:(this.box.height-this.objectHeight)/2+20-this.objectCircleRadius,stroke:"red",
    fill:"white",opacity:.4,selectable:!1,strokeWidth:2});
    this.canvas.add(objecthead);

var pinholeline=new fabric.Line([
    this.box.width+19,(this.box.height-this.appertureWidth)/2+20,this.box.width+19,
    (this.box.height+this.appertureWidth)/2+20],{stroke:"black",strokeWidth:4,selectable:!1,evented:!1,fill:"black"});
    this.canvas.add(pinholeline);

var pinhole=new fabric.Circle({
    radius:6,left:this.box.width+19-6,top:(this.box.height-this.appertureWidth)/2+20-6,
    stroke:"red",fill:"white",opacity:.9,selectable:!1,strokeWidth:1});
    this.canvas.add(pinhole);

var firstText=new fabric.Textbox(
    this.textToDisplay,{width:200,height:100,top:this.box.height-20,
    left:this.box.width+30,hasControls:!1,fontSize:16,fixedWidth:150,selectable:!1,fixedFontSize:16});
    this.canvas.add(firstText);

var apperatureword=new fabric.Text("Aperture",{
    left:this.box.width+20,top:(this.box.height-this.objectHeight)/2-5,fill:"#5607f2",fontSize:14});
    this.canvas.add(apperatureword);

var objectword=new fabric.Text("Object",{
    left:this.objectDistance+8,top:(this.box.height-this.objectHeight)/2-5,fill:"#5607f2",fontSize:14});
    this.canvas.add(objectword);
    
var screenword=new fabric.Text("Screen",{left:25,top:(this.box.height-this.objectHeight)/2-5,fill:"#5607f2",fontSize:14});
    this.canvas.add(screenword);

this.CalculateInvertedTop();

function OnIncreaseApperture()
{var Dispalybox=this.canvas.getObjects("text");
for(let pinholeline in Dispalybox)"black"!=Dispalybox[pinholeline].get("fill")&&this.canvas.remove(Dispalybox[pinholeline]);
var objectbody=this.canvas.getObjects("line");
for(let pinholeline in objectbody)"red"!=objectbody[pinholeline].get("fill")&&this.canvas.remove(objectbody[pinholeline]);
var objecthead=this.canvas.getObjects("circle");for(let pinholeline in objecthead)"red"!=objecthead[pinholeline].get("stroke")&&this.canvas.remove(objecthead[pinholeline]);
this.appertureWidth=this.appertureWidth+.25,this.CalculateInvertedTop(),this.DrawApperture(),
this.textToDisplay="Aperture size (in px): "+this.appertureWidth+" Trace the edges and the image.",this.DisplayMessage()}

function OnDecreaseApperture(){var Dispalybox=this.canvas.getObjects("text");
for(let pinholeline in Dispalybox)"black"!=Dispalybox[pinholeline].get("fill")&&this.canvas.remove(Dispalybox[pinholeline]);
var objectbody=this.canvas.getObjects("line");
for(let pinholeline in objectbody)"red"!=objectbody[pinholeline].get("fill")&&this.canvas.remove(objectbody[pinholeline]);
var objecthead=this.canvas.getObjects("circle");
for(let pinholeline in objecthead)"red"!=objecthead[pinholeline].get("stroke")&&this.canvas.remove(objecthead[pinholeline]);
this.appertureWidth>=.5&&(this.appertureWidth=this.appertureWidth-.25),this.CalculateInvertedTop(),this.DrawApperture(),
this.textToDisplay="Aperture size (in px): "+this.appertureWidth+" Trace the edges and the image.",this.DisplayMessage()}

function DrawApperture(){var Dispalybox=new fabric.Line([this.box.width+19,
    (this.box.height-this.appertureWidth)/2+20,this.box.width+19,
    (this.box.height+this.appertureWidth)/2+20],
{stroke:"black",strokeWidth:2,selectable:!0,evented:!0,fill:"black"});
this.canvas.add(Dispalybox)}

function DrawInvertedObject(){var Dispalybox,objectbody=this.canvas.getObjects("text");for(let objectword in objectbody)"black"!=objectbody[objectword].get("fill")&&objectbody[objectword].animate({left:800},
    {onChange:this.canvas.renderAll.bind(this.canvas)});Dispalybox=this.invertedY1-this.invertedY2;
    var objecthead=50+4*(this.invertedY1-this.invertedY2),pinholeline="HSL(0,100%,"+objecthead+"%)";for(let objectword=0;objectword<this.invertedY1-this.invertedY2;objectword+=5)
    {var pinhole=new fabric.Line([20,this.invertedY1-objectword,20,this.invertedY1-objectword],{stroke:pinholeline,strokeWidth:Dispalybox,selectable:!1,evented:!1,fill:pinholeline});
    this.canvas.add(pinhole),pinhole.animate({x2:20,y2:this.invertedY1-objectword-this.objectHeight},
        {onChange:this.canvas.renderAll.bind(this.canvas),duration:1e3})}
        var firstText="Try changing the aperture";objecthead>=80&&(firstText="What Changed?"),Dispalybox<1&&(firstText="Is the image quite faint?");
        var apperatureword=new fabric.Text(firstText,{left:this.box.width+40,top:this.box.height,fill:"white",fontSize:14});
this.canvas.add(apperatureword)}

function CalculateInvertedTop(){var Dispalybox=(this.box.height-this.objectHeight)/2+20,
objectbody=(this.box.height+this.objectHeight)/2+20,
objecthead=this.objectHeight,pinholeline=this.appertureWidth,pinhole=this.objectDistance,
firstText=this.objectDistance-this.box.width;
this.invertedY1=Dispalybox+(objecthead+pinholeline)/(2*firstText)*pinhole,
this.invertedY2=Dispalybox+(objecthead-pinholeline)/(2*firstText)*pinhole,
this.invertedBottom1=objectbody-(objecthead+pinholeline)/(2*firstText)*pinhole,
this.invertedBottom2=objectbody-(objecthead-pinholeline)/(2*firstText)*pinhole}


function DrawRayBoundry(){var Dispalybox=this.objectDistance+20,objectbody=(this.box.height-this.objectHeight)/2+20,
objecthead=(this.box.height+this.objectHeight)/2+20,pinholeline=new fabric.Line([Dispalybox,objectbody,Dispalybox,objectbody],
    {stroke:"orange",strokeWidth:0,selectable:!1,evented:!1,fill:"orange"}),
    pinhole=new fabric.Line([Dispalybox,objectbody,Dispalybox,objectbody],{stroke:"orange",strokeWidth:0,selectable:!1,evented:!1,fill:"orange"}),
    firstText=new fabric.Line([Dispalybox,objecthead,Dispalybox,objecthead],{stroke:"orange",strokeWidth:1,selectable:!1,evented:!1,fill:"orange"}),
    apperatureword=new fabric.Line([Dispalybox,objecthead,Dispalybox,objecthead],{stroke:"orange",strokeWidth:1,selectable:!1,evented:!1,fill:"orange"});
    new fabric.Text("Top1",{left:22,top:this.invertedY1,fill:"blue",fontSize:10}),
    new fabric.Text("Top2",{left:22,top:this.invertedY2-10,fill:"blue",fontSize:10}),
    this.canvas.add(pinholeline),pinholeline.animate({x2:20,y2:this.invertedY1,strokeWidth:.5},
        {onChange:this.canvas.renderAll.bind(this.canvas),duration:1e3}),
        this.canvas.add(pinhole),pinhole.animate({x2:20,y2:this.invertedY2,strokeWidth:.5},
            {onChange:this.canvas.renderAll.bind(this.canvas),duration:1e3}),
            this.canvas.add(firstText),firstText.animate({x2:20,y2:this.invertedBottom1,strokeWidth:.5},
                {onChange:this.canvas.renderAll.bind(this.canvas),duration:1e3}),this.canvas.add(apperatureword),
                apperatureword.animate({x2:20,y2:this.invertedBottom2,strokeWidth:.5},
                    {onChange:this.canvas.renderAll.bind(this.canvas),duration:1e3}),
this.textToDisplay="Will the image of the object be formed at the top?",this.DisplayMessage()}

function FillRayBoundry(){var Dispalybox=this.objectDistance+20,
    objectbody=(this.box.height-this.objectHeight)/2+20,
    objecthead=(this.box.height+this.objectHeight)/2+20;
    for(let firstText=0;firstText<this.invertedY1-this.invertedY2;firstText++)
    {var pinholeline=new fabric.Line([Dispalybox,objectbody,Dispalybox,objectbody],{stroke:"orange",strokeWidth:0,selectable:!1,evented:!1,fill:"orange"});
    this.canvas.add(pinholeline),pinholeline.animate({x2:20,y2:this.invertedY1-firstText,strokeWidth:.5},
        {onChange:this.canvas.renderAll.bind(this.canvas),duration:2e3})}
        for(let firstText=0;firstText<this.invertedBottom2-this.invertedBottom1;firstText++)
        {var pinhole=new fabric.Line([Dispalybox,objecthead,Dispalybox,objecthead],{stroke:"orange",strokeWidth:0,selectable:!1,evented:!1,fill:"orange"});
        this.canvas.add(pinhole),pinhole.animate({x2:20,y2:this.invertedBottom2-firstText,strokeWidth:.5},
            {onChange:this.canvas.renderAll.bind(this.canvas),duration:2e3})}
            new fabric.Text("Top1",{left:22,top:this.invertedY1,fill:"blue",fontSize:10}),
            new fabric.Text("Top2",{left:22,top:this.invertedY2-10,fill:"blue",fontSize:10}),
            new fabric.Text("Bottom2",{left:22,top:this.invertedBottom2,fill:"blue",fontSize:10}),
            new fabric.Text("Bottom1",{left:22,top:this.invertedBottom1-10,fill:"blue",fontSize:10})}

function DrawImage(){var Dispalybox=1;this.invertedY1-this.invertedY2<1&&(Dispalybox=.5),
    this.invertedY1-this.invertedY2==1&&(Dispalybox=.8);
    for(let pinholeline=0;pinholeline<this.invertedY1-this.invertedY2;pinholeline+=1)
    {var objectbody=new fabric.Line([20,this.invertedY1-pinholeline,20,this.invertedBottom2-pinholeline],
        {stroke:"orange",strokeWidth:Dispalybox,selectable:!1,evented:!1,fill:"orange",opacity:.4}),
        objecthead=new fabric.Circle({radius:this.objectCircleRadius,left:20-this.objectCircleRadius,
            top:this.invertedY1-pinholeline-this.objectCircleRadius,stroke:"orange",fill:"white",opacity:.3,strokeWidth:Dispalybox});
        this.canvas.add(objectbody),this.canvas.add(objecthead)}
        this.textToDisplay="Will the image change if you change the aperture?",this.DisplayMessage()}

function DisplayMessage(){
    this.canvas.getObjects("textbox")[0].set("text",this.textToDisplay)}

function updateSlider(t){
    
console.log("got into slider: ",t),
this.appertureWidth=t;
var objectbody=this.canvas.getObjects("text");for(let pinhole in objectbody)"black"!=objectbody[pinhole].get("fill")&&this.canvas.remove(objectbody[pinhole]);
var objecthead=this.canvas.getObjects("line");for(let pinhole in objecthead)"red"!=objecthead[pinhole].get("fill")&&this.canvas.remove(objecthead[pinhole]);
var pinholeline=this.canvas.getObjects("circle");for(let pinhole in pinholeline)"red"!=pinholeline[pinhole].get("stroke")&&this.canvas.remove(pinholeline[pinhole]);
this.CalculateInvertedTop(),
this.DrawApperture(),
this.textToDisplay="Aperture size (in px): "+this.appertureWidth+" Check the Ray Diagram.",
this.DisplayMessage()}

function myFunction(val) {
    document.getElementById("demo").innerHTML = val;
    updateSlider(val*1);
}
