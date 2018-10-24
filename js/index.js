var lbxqq=document.querySelector("div.lb>ul.lbxqq");
var lbxqq_width=parseInt(window.getComputedStyle(lbxqq).width);
lbxqq.style.marginLeft=-(lbxqq_width/2)+"px";
function lb(){
   var lbt=document.querySelector(".show");
   lbt.className=lbt.className.replace("show","");
   var lbOn=document.querySelector(".lbOn");
   lbOn.className="";
   if(lbt.nextElementSibling!=null){
    lbt.nextElementSibling.className+=" show";
    lbOn.nextElementSibling.className="lbOn";
   }else{
    lbt.parentNode.firstElementChild.className+=" show";
    lbOn.parentNode.firstElementChild.className="lbOn";
   }
}
var timer=setInterval(lb,1500);
var lbDiv=document.querySelector("section div.lb");
var lbBtns=document.querySelectorAll("div.lb>span.lbBtn");

lbDiv.onmouseenter=function(){
       clearInterval(timer);
       timer=null;
       for(var lbBtn of lbBtns){
         lbBtn.className=lbBtn.className.replace("none","");
         lbBtn.onclick=function(){
            var lbBtn=this;
            var lbt=document.querySelector(".show");
            lbt.className=lbt.className.replace("show","");
            var lbOn=document.querySelector(".lbOn");
            lbOn.className="";
            if(lbBtn.className.indexOf("lbBtnLeft")!=-1){
                if(lbt.previousElementSibling!=null){
                 lbt.previousElementSibling.className+=" show";
                 lbOn.previousElementSibling.className="lbOn";
                }else{
                 lbt.parentNode.lastElementChild.className+=" show";
                 lbOn.parentNode.lastElementChild.className="lbOn";
                }
            }else{
                if(lbt.nextElementSibling!=null){
                    lbt.nextElementSibling.className+=" show";
                    lbOn.nextElementSibling.className="lbOn";
                   }else{
                    lbt.parentNode.firstElementChild.className+=" show";
                    lbOn.parentNode.firstElementChild.className="lbOn";
                   }
            }
         }
       }
}
lbDiv.onmouseleave=function(){
        timer=setInterval(lb,1500);
        for(var lbBtn of lbBtns){
        lbBtn.className+=" none";
    }
 } 
var lbtqq=document.querySelector("div.lb>ul.lbxqq");
lbtqq.onclick=function(e){
      if(e.target.nodeName=="LI"){
          var li=e.target;
        var lbOn=document.querySelector(".lbOn");
        lbOn.className="";
        li.className="lbOn";
      var i=li.getAttribute("data-to");
var lbner=document.querySelector("div.lb>div.lbner");
var lbt=document.querySelector(".show");
   lbt.className=lbt.className.replace("show","");
lbner.children[i].className+=" show";
      }
}
//新闻列表js交互效果
var newsUl=$("section>div.Dynamic>div.Dynamic_filter>div.Dynamic_center>ul");
var newsRightImg=$("section>div.Dynamic>div.Dynamic_filter>div.Dynamic_center>ul>li>i");
newsUl.on("mouseenter","li",function(){
    $(this).addClass("newsLi").children("div").addClass("newsDiv").next().show();

})
newsUl.on("mouseleave","li",function(){
    $(this).removeClass("newsLi").children("div").removeClass("newsDiv").next().hide();
})
var $aside=$("aside");
var Stop=$(window).scrollTop();
if(Stop>=900){
    $aside.show(1000);
}else{
    $aside.hide(1000);
}
$(document).scroll(function(){
    if($(window).scrollTop()>=900){
        $aside.show(1000);
    }else{
        $aside.hide(1000);
    }
});
$("aside li:eq(2)").click(function(e){
    console.log(1);
    $(window).scrollTop(0);
});
var clock=function(){
    var now = new Date();
    var d=now.getDate()//日
    var w=now.getDay()//星期几
    var m=now.getMonth()+1//月
    var year=now.getFullYear()//年
    var hour=now.getHours()//时
    var minute=now.getMinutes()//分
    var second=now.getSeconds()//秒
    var y=`今天是${year}年${m}月${d}日`;
    var week=`星期${w}`;
    var day=`${hour}时${minute}分${second}秒`;
    document.getElementById("time").firstElementChild.innerHTML=y;
    document.getElementById("time").lastElementChild.innerHTML=day;
    document.getElementById("time").firstElementChild.nextElementSibling.innerHTML=week;
    if(hour>12){
        hour=hour-12
    }
    document.getElementById("shi").style.transform=`rotate(${parseInt(hour)/12*360-90}deg)`;  
    document.getElementById("fen").style.transform=`rotate(${parseInt(minute)/60*360-90}deg)`; 
    document.getElementById("miao").style.transform=`rotate(${parseInt(second)/60*360-90}deg)`;               
}
window.onload=clock();
setInterval(clock,1000);