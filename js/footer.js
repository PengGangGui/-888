$(function(){
    $.ajax({
        url:"http://localhost:3000/footer.html",
        type:"get"
    }).then(res=>{
        $("#footer").html(res);
    })
})