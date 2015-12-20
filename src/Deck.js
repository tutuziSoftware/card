(function(window){
    "use strict";

    if(window.nabiki === void 0){
        window.nabiki = {};
    }

    class Deck{
        constructor(cards){
            this._cards = cards;
        }

        draw(index, callback){
            return new Promise((resolve, reject)=>{
                if(this.length === 0){
                    reject(nabiki.DECK_OUT);
                    return;
                }

                if(this._cards[index] === void 0){
                    reject(nabiki.OUT_OF_BOUNDS);
                    return;
                }

                if(this._cards[index].length === 0){
                    reject(nabiki.OUT_OF_BOUNDS);
                    return;
                }

                this._cards[index].length -= 1;

                //memo: Deckクラス自身はCardによるnewを行わない。Deckクラス自身はCardクラスに依存しない。
                resolve(this._cards[index].card);
            });
        }

        get length(){
            return this._cards.reduce((count, card)=>{
                return count + card.length;
            }, 0);
        }
    };

    window.nabiki.Deck = Deck;
    window.nabiki.DECK_OUT = {};
    window.nabiki.OUT_OF_BOUNDS = {};
})(window);
