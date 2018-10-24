$(function(){
    $.ajax({
        url:"http://localhost:3000/header.html",
        type:"get"
    })
    .then(res=>{
        $("#header").html(res);  
        var input=$(".nav_center>div.right>input");
        var jump=function(){
            if(input.val().trim()!=""){
                location.href="http://localhost:3000/list.html?kw="+input.val();
                }
        };
         input.keyup(function(e){
            if(e.keyCode==13){
               jump();
            }
        }).next().click(function(){
           jump();
        });
        $("div.header_right>ul>li:last-child>img").click(function(){
            var nickname=sessionStorage.getItem("nickname");
           if(nickname==null){
            location.href="login.html?back="+location.href;
        }else{
            $("div.header_login").toggle().children().children("li:first-child").html(nickname);
        }
        }).parent().prev("li").children("img").click(function(){  
            open("shop_cart.html","_blank");
           })
        $("div.header_login").children().on("click","li.login_clear",function(){
            sessionStorage.removeItem('nickname');
            sessionStorage.removeItem("d");
            $.ajax({
                type:"get",
                url:"http://localhost:3000/users/deLogin"
            })
            $("div.header_login").hide();
        });
       function isLogin(){
            $.ajax({
                type:"get",
                url:"http://localhost:3000/users/isLogin"
            }).then(result=>{
                console.log(result);
                if(result.code==0){
                }else if(result.code==1){
                    sessionStorage.setItem("nickname", result.uname);
                    sessionStorage.setItem("d", result.sid);
                }
            })
        }
        isLogin();
        scrollTo(0,0);
    });
})

