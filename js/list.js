var li=new Vue({
    el:"#list",
    data:{
      list:{},
        pno:1,
        value:1,
        pageCount:0,
        kws:"",
        il:12
        },
    created(){
        this.kw();
        this.page();
        this.pag();
    },
    methods:{
        pag(){
            this.pno=this.value;
            var pno=this.pno-1;
            var kws=this.kws;
            var pageCount=this.pageCount;
        if(kws==""){
            $.ajax({
                type:"get",
                data:{pno},
                url:`http://localhost:3000/list/list`
                }).then(result=>{
                    this.list=result.msg;
                    $("section>div.list_center>div.list_title span.shop_label").html(">所有商品");
                    sessionStorage.setItem("search",">所有商品");

        })
        }else{
            $.ajax({
                type:"get",
                data:{kws},
                url:`http://localhost:3000/list/lists`
                }).then(result=>{
                    var by=result.msg;
                    var il=this.il;
                    this.pageCount=result.pageC;
                  this.list=by.slice(il-12,il);
                  $("section>div.list_center>div.list_title span.shop_label").html(">名字包含"+"  "+this.kws+"  "+"的商品");
                  sessionStorage.setItem("search",">名字包含"+"  "+this.kws+"  "+"的商品");
        })
        }
       scrollTo(0,100);
    },
        page(){
            var kws=this.kws;
            if(this.kws==""){
          $.ajax({
              type:'get',
              url:"http://localhost:3000/list/lista"
            }).then(result=>{
                this.pageCount=result.msg;
            })
        }},
        cl_pag(a){
            this.value=a;
            this.pag();
        },but(e){
            var button=e.target;
            if(button.innerHTML=="上一页"){
                this.value=this.pno-1;
                if(this.value<=0){this.value=1}
                this.pag();
            }
            else if(button.innerHTML=="下一页"){
                this.value=this.value+1;
                if(this.value>this.pageCount){this.value=this.pageCount}
                this.pag();
            }
        },kw(){
            sessionStorage.setItem("back",location.href);
            if(location.search.indexOf("kw=")!=-1){
                var kw=decodeURI(location.search.split("=")[1]);
                sessionStorage.setItem("back",location.href);
                this.kws=kw;
            }
        }
    },watch:{
        value(){
            var pageCount=this.pageCount;
            var value=this.value;
            if(value!=""){
            if(value<=0){this.value=1}else if(value>pageCount){this.value=pageCount};
            }
        },pno(){
            this.il=this.pno*12;
        }
    }
})
