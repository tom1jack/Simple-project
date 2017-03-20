// /**
//  * Created by 1 on 2017/3/12.
//  */
// function de() {
//     var text=$('#text').val();
//     var password=$('#password').val();
//     $.ajax({
//         url:'/a/login',
//         type:'post',
//         data:{
//             name:text,
//             pwd:password
//         },
//         dataType:'json',
//         success:function ccode(code,message) {
//             var str = JSON.parse(code);
//             console.log(str);
//         }
//     })
// }
//注释调了原来jq的代码。
// $("#submit").on("click",submit);//绑定按钮和函数，原生

var userObj=new XMLHttpRequest();//构造函数实例化对象



//验证格式--正则表达式
function submit() {//原生
    var account=$("#account").val();//获取账号
    var password=$("#password").val();//获取密码
    userObj.open("POST","/carrots-admin-ajax/a/login/",true);
    userObj.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=utf-8");
    userObj.send("name="+account+"&pwd="+password);
}

$("#submit").on("click",jqsubmit);//jq
function jqsubmit() {
    var account=$("#account").val();//获取账号
    var password=$("#password").val();//获取密码
    if(testAccount()){
        $.ajax(
            {
                url : "/carrots-admin-ajax/a/login/",
                type : "post",
                data :{
                    name : account,
                    pwd : password
                },
                timeout : 2000,
                success : function (data, textStatus) {
                    console.log(data);
                    console.log(textStatus);
                    testData(data);
                },
                error : function (XMLHttpRequest,textStatus,thrownError) {
                    console.error(textStatus);console.info(XMLHttpRequest);console.error(thrownError);
                    return false;
                    // thrownError 只有当异常发生时才会被传递 this;
                }
            }

        )

    }
    else{console.error("未通过本地验证")}
}

//简单的验证
// $("#account").on("focus", $("#tip").html(""));
$("#account").on("blur", testAccount);
// $("#password").on("focus",$("#tip").html(""));
$("#password").on("blur", testAccount);
function testAccount(){//本地验证
    var account=$("#account").val();
    var password=$("#password").val();
    if(account.length==0){
        $("#tip").html("--用户名为空--");return false;
    }
    else {
        if(password.length==0){
        $("#tip").html("--密码为空--");return false;
        }
        else{$("#tip").html("");return true;}
    }
}
function testData(data) {
    console.log(data);
    var dataObj=JSON.parse(data);console.log(dataObj);
    if(dataObj.message!="success"){$("#tip").html(dataObj.message)}
    else {location.href="http://dev.admin.carrots.ptteng.com"}
}










