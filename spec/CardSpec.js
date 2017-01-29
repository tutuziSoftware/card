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

describe("Card", ()=>{
    describe("クリーチャー", ()=>{
        it("半機", ()=>{
            var hanki = new nabiki.Card({
                "name":()=>"半機",
                "creature_type":()=>"機械",
                "flavor_text":()=>"彼の口は機械による利便性を説いた。しかし彼の無くした腕は痛みを訴えた。　ーーー機械神",
                "caption":()=>"アップキープ時、あなたは1点のライフを失う。アップキープ時、あなたはカードを1枚引く",
                "cost":()=>2,
                "power":()=>2,
                "toughness":()=>2,
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
            expect(hanki.cost()).toBe(2);
            expect(hanki.power()).toBe(2);
            expect(hanki.toughness()).toBe(2);
        });
    });


    describe("手札",()=>{
        var hands = new nabiki.Hands;

        it("手札の追加",()=>{
            expect(hands.length).toBe(0);
            field.hands.push(new nabiki.Card({name:"test"}));
            expect(hands.length).toBe(1);
            expect(hands[0]["name"]).toBe("test");
        });

        it("手札の削除");
    });


    describe("自分の場",()=>{
        var field = new nabiki.HalfField;

        it("ライフ", ()=>{
            expect(field.hp()).toBe(20);
            field.hp(-1);
            expect(field.hp()).toBe(19);
        });

        it("マナ");
    });


    describe("全体の場", ()=>{
        //Map？
        var field = new nabiki.Field;
        field.add("you_id", new nabiki.HalfField);
        field.add("enemy_id", new nabiki.HalfField);

        it("最初のドロー");
        it("先攻後攻判定(先攻後攻の乱数は引数で持つ)");
        it("");
    });
});
