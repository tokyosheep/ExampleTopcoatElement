(function(){
    var selects = app.activeDocument.selection;
    var colorList = [];
    for(var i=0;i<selects.length;i++){
        colorList[i] = getColor(selects[i]);
    }
    return JSON.stringify(colorList);

    function getColor(item){
        if(!item.filled)return null;
        var obj = {};
        for(var key in item.fillColor){
            try{
                obj[key] = item.fillColor[key];
            }catch(e){
                return null;
            }
        }
        return obj;
    }
})();