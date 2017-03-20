/**
 * Created by 1 on 2017/2/25.
 */
var gamerString;
var gamer=[];
var gamerObj=[];
gamerString=localStorage.gamerListStorage;
gamer=gamerString.split(",");
var gamerAmount=gamer.length;//获取数组
//玩家状态工厂函数
function setGamer(number,identity,state,kmode,ktime) {
    var a={
        number : number,
        identity : identity,
        state : state,
        kmode: kmode,
        ktime: ktime
    };
    return a;
}//示例：gamerObj[1]=setGamer(1,gamer[1],"alive");
//示例：转换成json格式的字符串,并存储：localStorage.gamerObjStorage=json.stringify(gamerObj)

//遍历得到每个玩家详情,仅在列表页执行
if(localStorage.pageType=="list"){
    for(var i=0;i<gamerAmount;i++){
        gamerObj[i]=setGamer(i+1,gamer[i],"alive",null,null);
    }
    //转换为JSON格式并写入本地存储
    localStorage.gamerObjStorage=JSON.stringify(gamerObj);
    console.log("localStorage.gamerObjStorage");console.log(localStorage.gamerObjStorage);
}
    gamerObj=JSON.parse(localStorage.gamerObjStorage);//从本地获取玩家详细信息
    console.table(gamerObj);
console.log($("title"));
switch (localStorage.pageType){//定义页面标题,和按钮文本
    case "killerPage":
        $("title").append("杀手杀人");
        $("#vote-h-center").append("杀手杀人");
        $("#fbtn").append("确认");
        break;
    case "votePage":
        $("title").append("投票页");
        $("#vote-h-center").append("投票页");
        $("#fbtn").append("确认");
        break;
    default:
        $("title").append("玩家列表");
        $("#vote-h-center").append("玩家列表");
        $("#fbtn").append("开始游戏");
}


function creatGamerDom(i) {var i;//定义初始化卡牌的函数
    $(".m-select-box-group").append(
        "<div class='m-select-box'> " +
        "<div class='m-select-person-box'> " +
        "<p class='m-select-person-name'>" +
        gamer[i] +
        "</p> <p class='m-select-person-number'>" +
        (i+1)+
        "号" +
        "</p> " +
        "<div class='m-select-person-box-cover'></div>"+
        "</div> <div class='m-select-role-box'><!--hover-->" +
        "<img src='pic/killer.png'>" +
        "<img src='pic/detecter.png'>" +
        "<img src='pic/target.png'>" +
        "<img src='pic/docter.png'>" +
        "</div>" +
        "</div>"
    );
}
for(var i=0;i<gamerAmount;i++){creatGamerDom(i);}//初始化卡牌，写入页面
            //页面初始化完毕，可以进行样式的改变了。!!!!!!!!!!!
var gamerDom=$(".m-select-person-box");//获取玩家的html节点
//定义状态表现层样式函数
function resetDeadView() {
    for(var i=0;i<gamerAmount;i++){//遍历以初始化死亡玩家样式
        if(gamerObj[i].state=="dead"){
            $(gamerDom[i]).css({"border":"0.05rem solid #000"});
        }
        else{
            $(gamerDom[i]).css({"border":"0.05rem solid #fff"});
        }
    }
}
resetDeadView();



//定义初始化提示框的函数
function creatVoteTip() {//对投票的提示
    $(".m-tip-group-wrapper").append(
        "<div class='m-tips-box'>" +
        "<span class='m-tips-span'>发言讨论结束，大家请投票</span>" +
        " <img class='m-tips-audio--img' src='pic/audio.png'> </div> " +
        "<div class='m-intro-box'> <span class='m-intro-span'>点击得票最多人的头像</span> </div>"
    )
}
function creatKillerTip() {//对杀手的提示
    $(".m-tip-group-wrapper").append(
        "<div class='m-tips-box'>" +
        "<span class='m-tips-span'>杀手请睁眼，告诉法官你要杀的对象</span>" +
        " <img class='m-tips-audio--img' src='pic/audio.png'> </div> " +
        "<div class='m-intro-box'> <span class='m-intro-span'>点击下方玩家头像，对被狙击的玩家进行标记</span> </div>"
    )
}
//写入按页面类型写入提示
switch (localStorage.pageType){
    case "killerPage":creatKillerTip();break;
    case "votePage":creatVoteTip();break;
    case "list":break;
    default:alert("页面类型错误"+localStorage.pageType)
}
//基于页面类型，，遍历所有玩家，定义点击事件。

for(var i=0;i<gamerAmount;i++){
    (function (i) {
        $(gamerDom[i]).on("click",function(){

            switch (localStorage.pageType){
                case "list" : break;
                case "killerPage" :
                    if(JSON.parse(localStorage.gamerObjStorage)[i].state=="alive") {
                        if (gamerObj[i].identity == "平民") {
                            gamerObj=JSON.parse(localStorage.gamerObjStorage);//重置/从本地获取玩家详细信息
                            resetDeadView();
                                gamerObj[i].state = "dead";
                                gamerObj[i].kmode = "kdead";
                                gamerObj[i].ktime = localStorage.dayNumberStorage;
                                $(gamerDom[i]).css({"border": "0.05rem solid #f00"});
                                break;
                        }
                        else {alert("杀手只能杀平民")}
                    }
                    break;
                case "votePage" :
                    if(JSON.parse(localStorage.gamerObjStorage)[i].state=="alive") {
                        gamerObj=JSON.parse(localStorage.gamerObjStorage);//重置/从本地获取玩家详细信息
                        resetDeadView();
                            gamerObj[i].state = "dead";
                            gamerObj[i].kmode = "vdead";
                            gamerObj[i].ktime = localStorage.dayNumberStorage;
                            $(gamerDom[i]).css({"border": "0.05rem solid #f00"});
                            break;
                    }
                    break;
                default:alert("页面类型错误"+localStorage.pageType)
            }
        })
    })(i)
}
//计算当前生存的  杀手和平民  的数量
var aliveKillerAmount=0;
var aliveCommonPeopleAmount=0;
function computAmount(){
    for(var i=0;i<gamerAmount;i++){
        if(gamerObj[i].state=="alive"){
            switch (gamerObj[i].identity){
                case "杀手" : aliveKillerAmount++;break;
                case "平民" : aliveCommonPeopleAmount++;
            }
        }
    }
}


function goTo() {//定义点击跳转事件
    localStorage.gamerObjStorage = JSON.stringify(gamerObj);//保存玩家状态
    //判断是否胜利
    computAmount();
    if (aliveKillerAmount == 0) {
        localStorage.winner = "commonPeople";//平民胜
        location.href = "shengliye.html";
    }
    else {
        if (aliveCommonPeopleAmount <= aliveKillerAmount) {
            localStorage.winner = "killer";//杀手胜
            location.href = "shengliye.html";
        }
        else {//未结束，
            switch (localStorage.pageType) {//改变页面类型
                case "list" :
                    localStorage.pageType = "killerPage";
                    localStorage.time="night";
                    break;
                case "killerPage" :
                    localStorage.pageType = "votePage";
                    localStorage.time="day";
                    break;
                case "votePage" :
                    localStorage.pageType = "killerPage";
                    localStorage.time="night";
                    localStorage.dayNumberStorage = parseInt(localStorage.dayNumberStorage) + 1;
                    break;
                default :
                    alert("页面类型错误")
            }
            location.href = "faGuanTaiBen.html";
            //跳转
        }
    }
}
$(".f-btn-small").on("click",goTo);//绑定事件,点击保存数据并跳转
































// gamerDom.on("click",function () {
//     console.log("1111")
//     $(this).attr("style","border:5px solid red")
// })
//
// $.each(gamerDom,function(index,item){
//     // console.log(index);
//     console.log(this);

    // this.on('click',function () {
    //     console.log(1)
    //
    // })
// console.log(".log，输出信息");
// console.error(".error,出错了的提示");
// console.warn(".warn,警告");
// console.debug(".debug和.log相同");
// console.info(".info和.log相同");
// console.log("下面是.table");
// console.table(gamerObj);
// console.log(".assert()方法，验证条件并输出");
// console.assert(gamer[3]==gamer[2],"玩家3和玩4身份不同！");
// console.log(gamer[3]);console.log(gamer[2]);
// console.log("计算一个操作消耗的时间");
// function foo(){
//     var x = 4.237;
//     var y = 0;
//     for (var i=0; i<100000000; i++) {
//         y = y + x*x;
//     }
//     return y;
// }
// console.time("id01");
// foo();
// console.timeEnd("id01");














//定义一个有限状态机，
//两种状态：生存，死亡，currentState
//对象：玩家数组的每个单位,singleGamer
//事件：被杀死/被投死/杀某人/投票给某人

// var singleGamer ={
//     currentState: "alive",//当前状态,
//     initialize: function(){//初始化,执行函数回掉
//         var self=this;
//         self.on("hover",self.transition);//绑定事件
//     },
//     transition: function(event){
//         switch(this.currentState){//switch选择执行
//             case "alive":
//                 this.currentState = "dead";
//                 beKilled;
//                 break;
//             case "dead":
//                 this.currentState = "alive";
//                 doSomething();
//                 break;
//             default:
//                 console.log()
//         }
//     }
// };
//
// if(singleGamer.currentState=="alive"){}
// if(singleGamer.currentState=="dead"){}



















