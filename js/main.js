//import {sum} from "./js/EC6import.js";//it doen't work on Adobe CEP

window.onload = () =>{
    "use strict";
    /*
    it works under babel transpiles but themeManager won't work with import 
    console.log(sum(5));
    */
    const csInterface = new CSInterface();
    themeManager.init();
    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;

    
    //Node module works on Adobe CEP and It works with themeManager
    const EventButton = require(`${__dirname}/js/import/ButtonClass`);
    const makeBoxes = require(`${__dirname}/js/import/makeBoxes`);
    const preventDragEvent = require(`${__dirname}/js/import/preventDrag`);
    //if you use webpack, get rid of "/js" from module path 
    csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);
    

    const callColor = document.getElementById("callColor");
    const colorDataList = document.getElementById("colorDataList");

    preventDragEvent();

    class GetColorData extends EventButton{
        constructor(btn,jsx,list){
            super(btn,jsx);
            this.list = list;
        }

        async handleEvent(){
            /* 
            get fillColor data
            and write on CEP Panel
            */
            const colorObjects = JSON.parse(await this.callJsx());
            console.log(colorObjects);
            this.removeTree();//remove initial list
            colorObjects.forEach(object=>{
                if(object === null)return;
                const checkList = makeBoxes.makeCheckbox(this.list);
                const ul = document.createElement("ul");
                checkList.li.appendChild(ul);
                this._writeData(object,ul);
                this._setDataset(object,checkList.checkbox);
            });
            

        }

        _writeData(obj,elm){
            //write color data list
            Object.entries(obj).forEach(([value,key])=>{
                const li = document.createElement("li");
                li.textContent = `${key}  : ${value}`;
                elm.appendChild(li);
            });
        }

        _setDataset(obj,elm){
            //set dataset on checkbox
            Object.entries(obj).forEach(([value,key])=>{
                elm.dataset[key] = value;
            });
        }

        removeTree(){
            while(this.list.firstChild){
                this.list.removeChild(this.list.firstChild);
            }
        }
    }

    const callJsx = new GetColorData(callColor,"getColorData.jsx",colorDataList);
}
