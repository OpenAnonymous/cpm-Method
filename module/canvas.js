import SimpleTask from "./object.logic.Task.js";

const wrapitem = document.getElementsByClassName('wrap-item')[0];

// Canvas setup
const canvas = document.getElementsByTagName('canvas')[0];
canvas.height = 550 
canvas.width = 800
const ctx = canvas.getContext('2d');    

function resetcanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}
resetcanvas();
 
function randomLightColor() {
    var red = Math.floor(Math.random() * 128) + 128;
    var green = Math.floor(Math.random() * 128) + 128;
    var blue = Math.floor(Math.random() * 128) + 128;

    var rgbColor = "rgb(" + red + "," + green + "," + blue + ")";
    return rgbColor;
}


class TaskCanvas extends SimpleTask {
    constructor(name,text, time, dependencies = [], x, y,canvas) {
        super(name, time, dependencies);
        this.x = x;
        this.y = y;
        this.canvas = canvas;     
        this.text = text; 
        this.ctx = canvas.getContext("2d");
        this.r = 25
    }
    setDepen(depen){
        this.dependencies = depen
    }

    drawNode() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = randomLightColor();
        this.ctx.lineWidth = 3;
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        this.ctx.stroke();
        
        this.ctx.font = "28px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = randomLightColor();
        this.ctx.fillText(this.text,this.x , this.y)
        this.ctx.closePath();   
    }

    drawLine(tx,ty){
        this.ctx.lineWidth = 3
        this.ctx.strokeStyle = randomLightColor();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(tx,ty);
        this.ctx.stroke();

        const angle = Math.atan2(ty - this.y, tx - this.x);
        const arrowSize = 10;
        this.ctx.fillStyle = randomLightColor();
        this.ctx.beginPath();
        this.ctx.moveTo(tx - arrowSize * Math.cos(angle - Math.PI / 6), ty - arrowSize * Math.sin(angle - Math.PI / 6));
        this.ctx.lineTo(tx, ty);
        this.ctx.lineTo(tx - arrowSize * Math.cos(angle + Math.PI / 6), ty - arrowSize * Math.sin(angle + Math.PI / 6));
        this.ctx.closePath();
        this.ctx.fill();
    }

}

function randomPosition(number, length, canvas) {
    const positions = [];

    for (let i = 0; i < number; i++) {
        let position = { x: 0, y: 0 };
        do {
            position.x = Math.floor(40+ Math.random() * (canvas.width - 80)); // Tạo ngẫu nhiên x
            position.y = Math.floor(40+ Math.random() * (canvas.height - 80)); // Tạo ngẫu nhiên y
        } while (positions.some(pos => Math.abs(pos.x - position.x) < length && Math.abs(pos.y - position.y) < length));

        positions.push(position);
    }
    return positions;
}

export default function drawNetwork(tasks) {
    resetcanvas();
    const nodelist = [];
    const positions = randomPosition(tasks.length, 20, canvas);
    console.log(positions);
    tasks.forEach((task,index) => {
        const {x,y} = positions[index];   
        const node = new TaskCanvas(task.name,index+1,task.time,[],x,y,canvas)
        node.drawNode();
        nodelist.push(node);
    });

    
    tasks.map((task,index) =>{
        let newdepen = [];
        if(task.dependencies.length > 0){
            task.dependencies.map((dependency)=>{
                nodelist.map((node)=>{
                    if(dependency.name === node.name){
                        newdepen.push(node);
                        nodelist[index].setDepen(newdepen);
                    }
                })
                
            })
        }
    })

    nodelist.forEach((node)=>{
        if(node.dependencies.length > 0){
            node.dependencies.forEach((depen)=>{
                depen.drawLine(node.x,node.y)
            })
        }
    })
    
}

