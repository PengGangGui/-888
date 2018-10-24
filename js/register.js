var users=new Vue({
    el:"#register",
    data:{
        phone:"",
        nickname:"",
        email:"",
        pwd:"",
        upwd:"",
        isclause:false,
        isphone:false,isnickname:false,isemail:false,ispwd:false,isupwd:false
    },
    methods:{
        transfer(){/**注册 */
            if(!this.isclause){
                $(event.target).parent().prev().children(".hint").children().show()
            }else if(this.isclause){
                $(event.target).parent().prev().children(".hint").children().hide();
            }
            if(this.isphone&&this.isnickname&&this.isemail&&this.ispwd&&this.isupwd&&this.isclause){
            var phone=this.phone;
            var nickname=this.nickname;
            var email=this.email;
            var pwd=this.pwd;
            $.ajax({
                type:"post",
                data:{phone,nickname,email,pwd},
                url:"http://localhost:3000/users/register",
                success: function() {
                    alert("注册成功");
                    location.href="login.html";
                }
            })}},
        repetition(event){/**判断输入框中的值是否符合标准 */
           var name=event.target.name;
           var  value=event.target.value;
           var data={name:value};
           var inputWarn=$(event.target).prev();
           var istrue="";
            if(name=="phone"){/**电话 */
                var reg=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
              istrue=this.verify(reg,value);
           this.panduan(data,istrue,event,name);
        }
            if(name=="nickname"){/**昵称 */
                var reg=/^([\u4e00-\u9fa5]|[@]|[$]|[%]|[&]|[A-Za-z0-9]){2,12}$/;
            istrue= this.verify(reg,value);
            this.panduan(data,istrue,event,name);
            }
            if(name=="email"){/**邮箱 */
                var reg=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
              istrue=  this.verify(reg,value);
              this.panduan(data,istrue,event,name);
            }
            if(name=="pwd"){/**密码 */
                var reg=/^([A-Za-z0-9]|[@]|[%]){5,15}$/;
                this.ispwd=this.verify(reg,value);
                    if(value.length>5&&value.length<8){
                     $(event.target).prev().css("color","red");
                     this.ispwd=false;
                }
            }
            if(name=="upwd"){/**重复密码 */
              var reg=new RegExp(`^${this.pwd}$`);
              this.isupwd=this.verify(reg,value);
            }
        },
        panduan(data,istrue,event,name){
            if(istrue){/**判断是否已经被使用过 */
                data=JSON.stringify(data).replace("name",name);
                data=JSON.parse(data);
                console.log(data);
                 $.ajax({
                     type:"post",
                     data:data,
                     url:"http://localhost:3000/users/isRepetition"
                 
                    }).then(result=>{
                            if(result.code==0){
                                $(event.target).prev().css("color","red");
                                $(event.target).parent().next().next().children().show();
                                if($(event.target)[0].name=="phone"){
                                    this.isphone=false;
                                 }
                                 if($(event.target)[0].name=="nickname"){
                                     this.isnickname=false;
                                  }
                                  if($(event.target)[0].name=="email"){
                                     this.isemail=false;
                                  }
                            }else if(result.code==1){
                                $(event.target).parent().next().next().children().hide();
                                $(event.target).prev().css("color","green");
                                if($(event.target)[0].name=="phone"){
                                    this.isphone=true;
                                 }
                                 if($(event.target)[0].name=="nickname"){
                                     this.isnickname=true;
                                  }
                                  if($(event.target)[0].name=="email"){
                                     this.isemail=true;
                                  }
                            }
                    }
                        
                    )
                }
           },
        verify(reg,value){/*输入值是否符合标准 */
            if(!reg.test(value)){
                $(event.target).prev().css("color","red");
                $(event.target).parent().next().children().show();
                return false;
            }else{
                $(event.target).prev().css("color","green");
                $(event.target).parent().next().children().hide();
                return true;
            }
        },
        isreg(p){/**判断密码复杂程度 */
           var  reg=/^\d{5,15}$/;
            if(reg.test(p)){
                return 1;
            }
            reg=/^[A-Za-z0-9]{5,15}$/;
            if(reg.test(p)){
                return 2;
            }
            reg=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,15}$/;
            if(reg.test(p)){
                return 3;
            }
        },isMore(p,s){/**判断密码长度 */
            if(p.length>5&p.length<8){
              $("div.pwd").next().next().children().show();
            }
            else if(p.length>10){
                s.next().addClass("strength_verify");
            }else{s.next().removeClass("strength_verigy");
            $("div.pwd").next().next().children().hide();}
        },
        login(){
            location.href="login.html";
        }
    },watch:{
        pwd(p){/**监听密码复杂程度 */
            var reg=/^([A-Za-z0-9]|[@]|[%]){5,15}$/;
            var s=$("div.register>div.input>div.strength>div.strength_plain>span.strength_verify:last");
            var strength=$("div.register>div.input>div.strength>div.strength_plain>span:first-child");
            if(reg.test(p)){
              var i=this.isreg(p,strength,s);
              if(i==1){
                  strength.addClass("strength_verify");
                  this.isMore(p,s);
              }else if(i==2){
                strength.addClass("strength_verify").next().addClass("strength_verify");
                this.isMore(p,s);
              }else if(i==3){
                strength.addClass("strength_verify").next().addClass("strength_verify")
                .next().addClass("strength_verify");
                this.isMore(p,s);
              }
            }else{$("div.register>div.input>div.strength>div.strength_plain>span.strength_verify").removeClass("strength_verify");
        }
        }
    }
})


