/**
 * サーバとの伝達に関する考察
 *
 * 1.バフ・デバフを考慮しなければならない。
 * 　値は動的に変わる。手札の時点から元のオブジェクトのコピーでありたい。
 * 　
 *
 * 2.サーバへ値を送信しなければならない。
 * 　サーバ側でも同じ値を持っていて、不正値のチェックはしないといけない
 */

describe("Card単体", ()=>{
    describe("クリーチャー", ()=>{
        it("半機", ()=>{
            var hanki = new nabiki.Card({
                "name":()=>"半機",
                "creature_type":()=>"機械",
                "flavor_text":()=>"彼の口は機械による利便性を説いた。しかし彼の無くした腕は痛みを訴えた。　ーーー機械神",
                "caption":()=>"アップキープ時、あなたは1点のライフを失う。アップキープ時、あなたはカードを1枚引く",
                "costs":(fetch)=>fetch(2),
                "power":(fetch)=>fetch(2),
                "toughness":(fetch)=>fetch(2),
                "do_upkeep":(field, you_id, enemy_id)=>{
                    //アップキープ時に、あなたは1点のライフを失う
                    field[you_id].hp(-1);

                    //アップキープ時に、あなたはカードを1枚引く
                    field[you_id].hands.draw();
                }
            });

            expect(hanki.name()).toBe("半機");
            expect(hanki.creature_type()).toBe("機械");
            expect(hanki.flavor_text()).toBe("彼の口は機械による利便性を説いた。しかし彼の無くした腕は痛みを訴えた。　ーーー機械神");
            expect(hanki.caption()).toBe("アップキープ時、あなたは1点のライフを失う。アップキープ時、あなたはカードを1枚引く");
            hanki.costs(function(fetch){
                expect(fetch).toBe(2);
            });
            hanki.power(function(fetch){
                expect(fetch).toBe(2);
            });
            hanki.toughness(function(fetch){
                expect(fetch).toBe(2);
            });
        });
    });


    describe("手札単体",()=>{
        var hands = new nabiki.Hands;

        it("手札の追加",(done)=>{
            hands.count.then(function(fetch){
                expect(fetch).toBe(0);
            });
            hands.push(new nabiki.Card({name:()=>"test"}));
            hands.count.then(function(fetch){
                expect(fetch).toBe(1);
            });
            hands.get(0).then(function(card){
                expect(card.name()).toBe("test");
                done();
            });
        });

        it("存在しない手札を選択", (done)=>{
            hands.get(1).catch(()=>{
                expect(true).toBeTruthy();
                done();
            });
        });

        it("手札上限。10枚まで、11枚目は無視する", (done)=>{
            for(var i = 0 ; i != 8 ; i++){
                hands.push(new nabiki.Card({name:()=>"add"}));
            }
            hands.push(new nabiki.Card({name:()=>"hand10"}));
            hands.count.then((count)=>{
                expect(count).toBe(10);
            });
            hands.push(new nabiki.Card({name:()=>"hand11"}));
            hands.count.then((count)=>{
                expect(count).toBe(10);
            });
            hands.get(9).then((card)=>{
                expect(card.name()).toBe("hand10");
                done();
            });
        });

        it("手札の削除", (done)=>{
            hands.remove(0).then(()=>{
                hands.count.then((fetch)=>{
                    expect(fetch).toBe(9);
                });
                hands.get(0).then((card)=>{
                    expect(card.name()).toBe("add");
                    done();
                });
            });
        });
    });


    /*
     * Fieldクラスはクリーチャーなどの置き場。Handsと大体同じ
     * 操作系は操作クラスに任せる。
     */
    describe("自分の場",()=>{
        it("Fieldの存在確認", ()=>{
            expect(nabiki.Field).not.toBeUndefined();
        });

        var field = new nabiki.Field;

        it("クリーチャー追加",(done)=>{
            field.count.then((count)=>{
                expect(count).toBe(0);
                field.add(0, new nabiki.Card({name:()=>"creature1"}));
                field.count.then((count)=>{
                    expect(count).toBe(1);

                    //3番目に追加すると……？
                    field.add(3, new nabiki.Card({name:()=>"creature2"}));
                    field.count.then((count)=>{
                        expect(count).toBe(2);

                        field.get(0).then((card)=>{
                            expect(card.name()).toBe("creature1");

                            field.get(1).then((card)=>{
                                expect(card.name()).toBe("creature2");

                                field.get(2).catch(()=>{
                                    expect(true).toBeTruthy();
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });

        it("クリーチャー追加上限",(done)=>{
            "use strict";
            for(var i = 2 ; i != 5 ; i++){(function(){
                field.add(0, new nabiki.Card({name:()=>"creature"+i}));
            })();}

            field.count.then((count)=>{
                expect(count).toBe(5);
                expect(field.isPlay).toBeTruthy();
                field.add(0, new nabiki.Card({name:()=>"creature6"}));

                field.count.then((count)=>{
                    //最大値
                    expect(count).toBe(6);
                    expect(field.isPlay).toBeFalsy();

                    //最大値で追加しても何も起こらない
                    var is = field.add(0, new nabiki.Card({name:()=>"creature"}));
                    expect(is).toBeFalsy();
                    done();
                });
            });
        });

        it("クリーチャー削除",(done)=>{
            field.get(0).then((card)=>{
                expect(card.name()).toBe("creature6");

                field.remove(0).then(()=>{
                    field.get(0).then((card)=>{
                        expect(card.name()).toBe("creature5");
                        done();
                    });
                });
            });
        });
    });

    describe("ヒストリー。墓地は存在しない代わりに、操作記録が残る",()=>{
        it("Fieldの存在確認", ()=>{
            expect(nabiki.History).not.toBeUndefined();
        });

        var history = new nabiki.History;

        it("操作内容のpush",(done)=>{
            history.count.then((count)=>{
                expect(count).toBe(0);
                history.push(new nabiki.Card({name:()=>"creature"}));
                history.count.then((count)=>{
                    expect(count).toBe(1);
                    history.get(0).then((card)=>{
                        expect(card.name()).toBe("creature");
                        history.get(1).catch(()=>{
                            expect(true).toBeTruthy();
                            done();
                        });
                    });
                });
            });
        });
    });

    describe("操作クラス",()=>{

    });

    describe("全体の場", ()=>{
        it("最初のドロー");
        it("先攻後攻判定(先攻後攻の乱数は引数で持つ)");
        it("");
    });
});
