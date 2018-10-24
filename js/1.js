setInterval(function(){
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
    console.log(parseInt(hour)/12*360);
    document.getElementById("shi").style.transform=`rotate(${parseInt(hour)/12*360-90}deg)`;  
    document.getElementById("fen").style.transform=`rotate(${parseInt(minute)/60*360-90}deg)`; 
    document.getElementById("miao").style.transform=`rotate(${parseInt(second)/60*360-90}deg)`;               
},1000)



