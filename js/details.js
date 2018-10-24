$(function(){
     var vueList=new Vue({
    el:"#detail",
    data:{
        id:1,
        list:{},
        item:{},
        back:"",
        search:"",
    },
    created(){
        this.getId();
        this.getData();
    },
    methods:{
        getId(){
            if(parseInt(location.search.split("=")[1])){
            this.id=parseInt(location.search.split("=")[1])};
            this.back=sessionStorage.getItem("back");
            this.search=sessionStorage.getItem("search");
        },
        getData(){
            var id=this.id;
            $.ajax({
                type:"get",
                data:{id},
                url:`http://localhost:3000/detail/detail`,
             
            }).then(res=>{
                
                    this.list=res[0];
                    console.log(this.list);
            })
        },
        getCorrelation(){
            var id=this.id;
            var stitle=this.list.stitle;
            this.getTer(id,stitle);
        },getTer(id,stitle){
            $.ajax({
                type:"get",
                data:{id,stitle},
                url:"http://localhost:3000/detail/correlation"
            }).then(res=>{
                if(res.length>0){
                this.item=res;
                console.log(this.item);
                }else{
                    var id=this.id;
                    stitle=stitle.slice(0,stitle.length-1);
                    this.getTer(id,stitle);
                }
            })
        },shop_insert(){
            var value=$("section>div.detail_center>div.detail_content div.left input[type=text]").val();
           var uid= sessionStorage.getItem("d");
           var data={};
            data.uid=uid;
            data.nid=this.list.id;
            data.id="";
            data.num=value;
            data.price=this.list.price;
            data.img_url=this.list.lg_url;
            data.title=this.list.stitle;
            data.sum_price=this.list.price*value;
            data.numMax=this.list.snum;
            console.log(data);
            $.ajax({
                data:data,
                type:"post",
                url:"http://localhost:3000/detail/shopInsert",
                success: function(res) {
                   if(res=="suc"){
                    location.href="shop_cart.html";
                    }
                }
            })
        }
        ,shop_cart(){
            if(sessionStorage.getItem("nickname")==null){
                if(confirm("登录账号才能加入购物车")){
                    location.href="login.html?back="+location.href;
                }
            }else{
                this.shop_insert();
            }
        }
    },watch:{
        list(){
            this.getCorrelation();
        }
    }
})
/*放大镜*/
var $mercha=$("section>div.detail_center>div.detail_content div.merchandise div.zoomLensContainer");
var $merchas=$("section>div.detail_center>div.detail_content div.merchandise>div.merchandise_img");
var $zoomL=$("section>div.detail_center>div.detail_content div.merchandise div.zoomLens");
var $zoomC=$("section>div.detail_center>div.detail_content div.merchandise div.zoomContainer");
var lg=$("section>div.detail_center>div.detail_content div.merchandise img");
$mercha.hover(function(){
    $zoomL.toggle();
    $zoomC.toggle();
    var lgUrl=lg.attr("src");
    $zoomC.css("backgroundImage",`url(..${lgUrl})`);
})
$mercha.mousemove(function(e){
    var {offsetX,offsetY}=e;
    var left=offsetX-75;
    var top=offsetY-75;
    if(top<=0){
        top=0;
    }else if(top>=192){
        top=192;
    }
    if(left<=0){
        left=0;
    }else if(left>=189){
        left=189;
    }
    $zoomL.css({"top":`${top}px`,"left":`${left}px`});
    $zoomC.css("backgroundPosition",`${-left}px ${-top}px`);
});
/*商品详情页+-按钮*/
var inputs=$("div.in_block");
var input=$("div.in_block input[type=text]");
var judge= function (){
    var max=vueList.list.snum;
    if(input.val()==""){input.val(1);return}
    var n=parseInt(input.val());
    if(n>=max){
        input.val(max);
    }else if(n<=0){
        input.val(1);
    }
}
input.blur(judge);
input.keydown(function(e){
    if(e.keyCode==13){
        this.blur();
    }
})
inputs.click(function(e){
    var max=vueList.list.snum;
    var btn=$(e.target);
    if(btn[0].type=="button"){
        var value=parseInt(input.val());
    if(btn.val()=="+"){
       if(value<max){
           value++;};
    }else if(btn.val()=="-"){
        if(value>1){value--};
    }
    input.val(value);
}
})


});