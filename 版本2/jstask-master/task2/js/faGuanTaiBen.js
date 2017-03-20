/**
 * Created by 1 on 2017/2/27.
 */
var gamerString=localStorage.gamerListStorage;
var gamer=gamerString.split(",");//获取数组
var gamerAmount=gamer.length;//获取数组长度
var gamerObj=JSON.parse(localStorage.gamerObjStorage);


$(".m-process-wrapper").append(
    "<div class='m-process-day'></div>" +
    "<div class='m-process-detail-wrapper'> " +
    "<div class='m-process-detail'>杀手杀人</div> " +
    "<div class='m-process-detail'>亡灵发表遗言</div> " +
    "<div class='m-process-detail'>玩家依次发言</div> " +
    "<div class='m-process-detail'>投票</div> </div>"
);

//第几天/写入文档
$(".m-process-day").html("第"+localStorage.dayNumberStorage+"天");

//点击事件/杀手杀人/投票杀人，页面跳转
var processList=$(".m-process-detail");
console.log(processList[0]);
function toKillerPage() {
    if(localStorage.time=="night"){
        localStorage.pageType="killerPage";
        location.href="TouPiaoYe.html";
    }
    else{alert("现在是白天")}
}
function toVotePage() {
    if(localStorage.time=="day"){
        localStorage.pageType="votePage";
        location.href="TouPiaoYe.html";
    }
    else{alert("现在是晚上")}
}
$(processList[0]).on("click",toKillerPage);
$(processList[3]).on("click" ,toVotePage);











/////////////////////*****************************///////////
//设置变量用于存放游戏进度到第几天，
// var progressDay = 1;

//定义每天的4个状态[toKill,lastWord,talk,vote]
// var stepOfDay = 1;

//定义每个玩家的死活状态
// var currentState="alive";

/////////////*****************************************////////////
// var singleState = {    //定义有限状态机，是个对象，两个方法.beKill将其杀死
//     initialize: function(){    //初始化，在调用的时候使用
//         var self=this;//什么被call，什么就是this,而非function本身，更不是singleState.
//         self.currentState="alive";//初始 状态alive
//             console.log(self.currentState);////
//         self.click(singleState.beKill);   //绑定点击事件/
//     },
//     beKill: function () {this.currentState="dead"}//
// };
//
//
//
//
//
// singleState.initialize.call($("#vote-h-center"));//

// cece=singleState.initialize.apply($("#vote-h-center"));
// console.log(cece);

//写入storage
// localStorage.progressDayStorage = progressDay;//第几天
// localStorage.stepOfDayStorage = stepOfDay;//第几步
// localStorage. //死活状态/用json/