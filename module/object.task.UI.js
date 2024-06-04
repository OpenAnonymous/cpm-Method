class Task{
    constructor(name,time,tag,ref,lnref,ltref,depenref,isFirst){
        this.name = name;
        this.time = time;
        this.dependencies = []
        this.tag = tag;
        this.ref = ref; 
        this.lnref = lnref;
        this.ltref = ltref;
        this.depenref = depenref;
        this.isFirst = isFirst;
    }

    create(){
        const nameelement = document.createElement(`${this.tag}`);
        const timeelement = document.createElement(`${this.tag}`);
        const depen = document.createElement('input');
        depen.setAttribute('type', 'text');
        depen.setAttribute('placeholder','before starting')
        depen.setAttribute('class','dependency');
        if(this.isFirst){
            depen.setAttribute('placeholder',"disabled");
            depen.setAttribute('disabled',true);
        }

        nameelement.innerHTML = this.name;
        timeelement.innerHTML = this.time;
        

        this.lnref.appendChild(nameelement)
        this.ltref.appendChild(timeelement)
        this.depenref.appendChild(depen)
    }
    delete(ref){
        
    }
}

export default Task;