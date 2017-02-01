(function(window){
    "use strict";

    if(window.nabiki === void 0){
        window.nabiki = {};
    }

    window.nabiki.History = class{
        constructor(data){
            if(this.data !== void 0 && this.data instanceof "Array"){
                this.data = data;
            }else{
                this.data = [];
            }
        }

        push(state){
            this.data.push(state);
        }

        get count(){
            return Promise.resolve(this.data.length);
        }

        get(index){
            if(this.data[index] !== void 0){
                return Promise.resolve(this.data[index]);
            }else{
                return Promise.reject();
            }
        }
    };
})(window);