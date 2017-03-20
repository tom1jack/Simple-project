/**
 * Created by 1 on 2017/3/10.
 */
var gamerObj=JSON.parse(localStorage.gamerObjStorage);
var winner=localStorage.winner;
var gamerAmount=gamerObj.length;
//写胜利玩家
function writeWinner(){
    if(winner=="killer"){$("#winnerDom").html("杀手胜利")}
    else{$("#winnerDom").html("平民胜利")}
}
writeWinner();//谁胜利，写入
//计算角色玩家数量
var killerAmount=0;
var commonPeopleAmount=0;
for(var i=0;i<gamerAmount;i++){
    if(gamerObj[i].identity=="杀手"){killerAmount++}
    else{commonPeopleAmount++}
}


function writeAmount() {
    $("#killerAmountDom").html(killerAmount);
    $("#commonPeopleAmountDom").html(commonPeopleAmount);
}
writeAmount();
function createList(n,a,b){
    $("#main").append(
        "<div class='m-detail-box'>" +
        "<span class='m-detail-h3'>" +
        "第"+
        n
        +"天" +
        "</span>" +
        "<span class='m-detail-time'>0小时7分</span>" +
        "<p>晚上：" +
        (parseInt(a)+1) +
        "号被杀手杀死，" +
        (parseInt(a)+1) +
        "号是" +
        (gamerObj[a].identity) +
        "</p>" +
        "<p>白天：" +
        (parseInt(b)+1) +
        "号被全民投票投死，" +
        (parseInt(b)+1) +
        "号是" +
        (gamerObj[b].identity) +
        "</p>" +
        "</div>"
    );
}
function nNightDie(n){//筛选第n天死亡的玩家,并返回值，a为晚上死，b为白天死
    for(var i=0;i<gamerAmount;i++){var a;
        if(gamerObj[i].ktime==n && gamerObj[i].kmode=="kdead"){a=i}
    }
    return a;
}
function nDayDie(n){//白天投票死
    for(var i=0;i<gamerAmount;i++){var b;
        if(gamerObj[i].ktime==n && gamerObj[i].kmode=="vdead"){b=i}
    }
    return b;

}

for(var n=1;n<=parseInt(localStorage.dayNumberStorage);n++){//写列表
    createList(n,nNightDie(n),nDayDie(n));
}




































