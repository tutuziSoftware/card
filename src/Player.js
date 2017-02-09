(function(window){
  "use strict";

  if(window.nabiki === void 0){
    window.nabiki = {};
  }

  window.nabiki.Player = class{
    constructor(data){
        //TODO 全部仮。jsonに合わせて入れる事
        this.deck = [
            {
                "card":{
                    "name":()=>"義勇兵"
                },
                "number":4
            },
            {
                "card":{
                    "name":()=>"機械兵"
                },
                "number":4
            }
        ];

        this._hand = [];
    }

    get hand(){
        return Promise.resolve(this._hand);
    }

    doDrawStep(random){
        if(this.deck.length == 0){
            return Promise.resolve({"name":()=>"マナ妖精"});
        }

        if(this.deck[random].number){
            this._hand.push(Object.create(this.deck[random].card));
        }else{
            //number == 0なら削除
            this.data.splice(random, 1);
        }

        return Promise.resolve();
    }
  };
})(window);