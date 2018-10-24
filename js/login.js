var logindd=new Vue({
    el:"#login",
    data:{
            name:"",
            value:"",
            pwd:"",
            login:false,
            data:{},
            url_back:""
        
    },created() {
        this.back();
    },
    methods:{
        islogin(event){
           var btn= event.target.value;
            var pwd=this.pwd;
            if(this.name=="phone"){
            var data={phone:this.value};
            }else if(this.name=="email"){
            data={email:this.value}
            }
            if(btn=="登录"&&pwd!=""){
                data.pwd=pwd;
            }
            $.ajax({
                data:data,
                type:"post",
                url:"http://localhost:3000/users/login",
                dataType:'json'
            }).then(
                result=>{
                    if(btn!="登录"&&pwd==""){
                    if(result.code==1){
                        $("#username1").children().hide();
                    }
                    else if(result.code==0){
                            $("#username1").children().show();
                            
                    }
                }else{
                    if(result.code==1){
                        $("#pwd").children().hide();
                        alert("登录成功");
                        if(this.url_back==undefined){
                        location.href="index.html";
                        }else{
                            location.href=this.url_back;
                        }
                    }
                    else if(result.code==0){
                        $("#pwd").children().show();
                    }
                   
                }
            
            }
            )
        },back(){
          var back= location.href.split("back=")[1];
          if(location.href.split("back=").length>=3){
              this.url_back="index.html";
          }else{
          this.url_back=back;
          }
        }
        ,property(event){
            var value=event.target.value;
            var reg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            if(reg.test(value)){
               this.name="email";
               $("#username2").children().hide();
            }else{
            reg=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
            if(reg.test(value)){
                this.name="phone";
                $("#username2").children().hide();
            }else{
                $("#username2").children().show();
            }
            }
            this.islogin(event);
        },
        register(){
            location.href="register.html";
        }
    }
})