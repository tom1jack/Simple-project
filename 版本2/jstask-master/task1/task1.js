/**
 * Created by 1 on 2017/2/13.
 */
var box0= new Array(9);
var wrapper;
    wrapper=document.getElementById("box-wrapper");
    box0=document.getElementsByClassName("box0");
var selectColorR;
var selectColorG;
var selectColorB;
var a;  a=1;
function reset(){for(var i=0;i<=8;i++) {box0[i].style.background = "orange";}}

function boxToColor() {
    reset();
        var selectBoxNumber1=Math.round(8*Math.random());
        var selectBoxNumber2=Math.round(8*Math.random());
        while(selectBoxNumber2==selectBoxNumber1){selectBoxNumber2=Math.round(8*Math.random());}
        var selectBoxNumber3=Math.round(8*Math.random());
        while(selectBoxNumber3==selectBoxNumber2||selectBoxNumber3==selectBoxNumber1)
            {selectBoxNumber3=Math.round(8*Math.random());}
            selectColorR=Math.round(256*Math.random());
            selectColorG=Math.round(256*Math.random());
            selectColorB=Math.round(256*Math.random());
        var selectColor1="rgb(" + selectColorR + ", " + selectColorG + ", " + selectColorB + ")";

            selectColorR=Math.round(256*Math.random());
            selectColorG=Math.round(256*Math.random());
            selectColorB=Math.round(256*Math.random());
        var selectColor2="rgb(" + selectColorR + ", " + selectColorG + ", " + selectColorB + ")";

            selectColorR=Math.round(256*Math.random());
            selectColorG=Math.round(256*Math.random());
            selectColorB=Math.round(256*Math.random());
        var selectColor3="rgb(" + selectColorR + ", " + selectColorG + ", " + selectColorB + ")";

        box0[selectBoxNumber1].style.background = selectColor1;
        box0[selectBoxNumber2].style.background = selectColor2;
        box0[selectBoxNumber3].style.background = selectColor3;
}

function begin() {

    if(a==1){boxToColor();a=0;id=window.setInterval(boxToColor,800);}
}

function stop() {
    a=1;
    clearInterval(id);
    reset()
}











