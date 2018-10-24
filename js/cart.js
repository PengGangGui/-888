new Vue({
    el:"#shop_cart",
    data:{
        uid:"",
        list:{},
        sum:0
    },created() {
      this.getUid();  
     if(this.uid==null){
        alert("请登录后在进入购物车");
        location.href="login.html?back="+location.href;}else{
            this.cart();
        }
    },
    updated(){
        this.qx();
    },
    methods:{
        cart(){
            var uid=this.uid;
            $.ajax({
                data:{uid},
                type:"get",
                url:"http://localhost:3000/cart/carts"
            }).then(result=>{
                console.log(result);
                if(result.code==1){
                this.list=result.msg;
                }
                if(this.list.length==0){
                   if(confirm("购物车为空,前往商品列表购买商品")){
                       location.href="list.html"
                   }
                }
            })
        },getUid(){
            this.uid=sessionStorage.getItem("d");
        },inputValue(event,i){
    if(event.target.type=="button"){
        var btn=event.target;    
        if(btn.value=="+"){
            var max=parseInt(this.list[i].numMax);
            if(btn.previousElementSibling.value<max){
            this.list[i].num=parseInt(this.list[i].num)+1;
            this.jgbh(i)
            }
        }else if(btn.value=="-"){
            if(btn.nextElementSibling.value>1){
            this.list[i].num--;
            this.jgbh(i);
            }
        }
    }
    },valueBlur(event,i){
        var relValue=event.target;
       var  maxValue=this.list[i].numMax;
       if(parseInt(relValue.value)<1||isNaN(parseInt(relValue.value))){
            this.list[i].num=1;
            this.jgbh(i);
       }else if(parseInt(relValue.value)>maxValue){
           this.list[i].num=maxValue;
           this.jgbh(i);
       }
    },isChecked(){
        var $qx=$("div.shop_annotation input")[0].checked;
        for(var i=0;i<this.list.length;i++){
            this.list[i].isCheck=$qx;
            this.isCheck(i);
        }            
    },qx(){
        if($("div.product_shop>div>div>input:checked").length==$("div.product_shop>div>div>input").length){
            $("div.shop_annotation input").prop("checked",true);
        }else{
            $("div.shop_annotation input").prop("checked",false);
        }
    },jgbh(i){
        var data={};
        data.num=parseInt(this.list[i].num);
        data.sum_price=this.list[i].price*data.num;
        data.nid=this.list[i].nid;
        data.uid=this.uid;
        $.ajax({
            data:data,
            type:"get",
            url:"http://localhost:3000/cart/cartPrice",
        })
    },delate(i){
        if(confirm("是否删除")){
           this.delete(i);
           alert("删除成功");
        }
    },delete(i){
        var data={};
        data.uid=this.uid;
        data.nid=this.list[i].nid;
        $.ajax({
            data:data,
            type:"post",
            url:"http://localhost:3000/cart/cartDelete"
        })
        this.list.splice(i,1);
    },isCheck(i){
        var data={};
        data.uid=this.uid;
        data.nid=this.list[i].nid;
        data.isCheck=this.list[i].isCheck;
        $.ajax({
            data:data,
            type:"post",
            url:"http://localhost:3000/cart/cartCheck"
        })
    },shopSubmit(){
        for(var i=0;i<this.list.length;i++){
            if(this.list[i].isCheck==1||this.list[i].isCheck==true){
                this.subMit(i);
                this.delete(i);
                i--;
            }
        }
        if(this.list.length==0){
            location.href="index.html";
        }
    },subMit(i){
        var date={};
            date.uid=this.list[i].uid;
            date.nid=this.list[i].nid;
            date.id="";
            date.num=this.list[i].num;
            date.price=this.list[i].price;
            date.title=this.list[i].title;
            date.sum_price=this.list[i].price*this.list[i].num;
            date.numMax=this.list[i].numMax;
        $.ajax({
            data:date,
            url:"http://localhost:3000/cart/cartBuy"
        })
    }
    },
    watch:{
        list: {
            handler(newVal, oldVal) {
              //console.log(newVal);
            },
            deep: true
          }
    },
    computed:{
        qbjg(){
            var sum=0;
            for(var i=0;i<this.list.length;i++){
                if(this.list[i].isCheck==1|this.list[i].isCheck==true){
                    sum+=this.list[i].price*this.list[i].num;
                }
            }
            this.sum=sum;
            return sum;
        }
    }
})