var mysql=require('mysql');
var conn= mysql.createConnection({
    host:'192.168.86.27',
    port:3306,
    user:'ts1',
    password:'111111',
    database:'livecasino_pref'
});

conn.connect();
let accu=new Map();
var query=conn.query('select cards from rounds where dealer_table_id=1001 and cards is not null');
query.on('result',function(row){
    count(split(row.cards),accu);
}).on('end',function(){
    for(let e of accu.entries()){
        console.log(e[0]+","+e[1]);
    }
    conn.end();
})

function* split(cards){
    const cs= cards.split('#');
    yield* toCard(cs[0]);
    yield* toCard(cs[1]);
}

function* toCard(cards){
    let cs= cards
    while(cs.length>1){
        yield cs.substring(0,2);
        cs=cs.substring(2,cs.length);
    }
}

function count(cards, accu){
    for(let c of cards){
        let v= accu.get(c)
        if(!v){
            v=1;
        }else {
            v=v+1;
        }
        accu.set(c,v);
    }
    return accu
}