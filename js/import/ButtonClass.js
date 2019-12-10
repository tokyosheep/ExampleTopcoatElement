"use strict";
const csInterface = new CSInterface();
const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
/*
button event class
in my case I often use button event to connect jsx
*/
module.exports = class EventButton{
        constructor(btn,jsx){
            this.btn = btn;
            this.jsx = jsx;
            this.btn.addEventListener("click",this);
        }
        
        handleEvent(){}
        
        callJsx(){
            return new Promise((resolve,reject)=>{
                csInterface.evalScript(`$.evalFile("${extensionRoot}${this.jsx}")`,(o)=>{
                    if(!o||o=="false")reject(false);
                    resolve(o);
                });
            });
        }
}