/**
 * Created by 1 on 2017/2/22.
 */
//用jquery
var gamerString;
var gamer=[];
gamerString=localStorage.gamerListStorage;
gamer=gamerString.split(",");
var gamerAmount=gamer.length;//获取数组
function reset(){//重置卡牌卡背
    $("#checkIdentity").html("查看1号身份");
    $(".m-gamernumber").html(1);
    $(".m-cover-wrapper").css("display","block");//已
    $(".m-gamer-wrapper").css("display","none");//
}
reset();                                                   console.log(gamer.length);

$("#checkIdentity").bind("click",clickToChange);//绑定按钮

function whiteIdentity() {//将角色写入卡牌
    console.log(gamerNumber);
    if(gamer[gamerNumber-1]=="杀手"){
        $(".m-gamer-identify").html("角色：杀手");
        $(".m-gamer-tips").html("角色提示：积极发言分析，尽可能的伪装成水民，刀法也很重要哦");
    }
    else{
        $(".m-gamer-identify").html("角色：水民");
        $(".m-gamer-tips").html("角色提示：想办法猜出谁是杀手，同时不要暴露自己哦");
    }
}
var pageNumber=1;
                                                   console.log(typeof pageNumber);
var gamerNumber=1;
// alert($(".m-cover-wrapper").length);
function coverIdentity() {//展示卡背
    $(".m-cover-wrapper").css("display","block");
    $(".m-gamer-wrapper").css("display","none");
    $(".m-gamernumber").html(gamerNumber);
    $("#checkIdentity").html("查看"+gamerNumber+"号身份");
    pageNumber++;
}
function showIdentity() {//展示身份
    $(".m-gamernumber").html(gamerNumber);
    $(".m-cover-wrapper").css("display","none");
    $(".m-gamer-wrapper").css("display","block");
    whiteIdentity();
    $("#checkIdentity").html("隐藏身份");
    pageNumber++;
    gamerNumber++;
}
function lastCover() {//最后一次展示卡背
    $(".m-cover-wrapper").css("display","block");
    $(".m-gamer-wrapper").css("display","none");
    $(".m-gamernumber").html(gamerAmount);
    $("#checkIdentity").html("法官查看身份");
    pageNumber=37;
}
                                                    console.log(pageNumber);
var showNumber=1;
                                                    console.log(showNumber);
function clickToChange(){//点击事件/点击数？/最后？/奇偶数？/写入
    showNumber=pageNumber%2;
    if(pageNumber<=2*gamerAmount){
        if(pageNumber==2*gamerAmount){
            lastCover();
        }
        else{
            if(showNumber){showIdentity();
                                                    console.log(showNumber)
            }
            else{coverIdentity()}
        }
    }
    else{
        localStorage.pageType="list";
        localStorage.dayNumberStorage="1";
        location.href="TouPiaoYe.html"}
}
























