(function () {
    var pcinitflag = 0,mobileinitflag = 0,initPageflag = 0;;

    function escapeChar(val){
        var spcialchar = ['.','/','\\','&','*','?','(',')','+','=','$','!','|','^','{','}','>','<',':',"\""];

        function findstr(target){
            for(var j=0;j < spcialchar.length;j++){
                if(spcialchar[j] == target)
                    return true;
            }
            return false;
        }

        var string = "";
        for(var i=0;i<val.length;i++){

            if( findstr(val[i]) )
                string += "\\" + val[i];
            else
                string += val[i];
        }
        return string;
    }

    function checkUserStatus() {
        var token = Storage.get('sessionToken') || '';
        if (token && token != '') {
            window.location.href = '/create';
            return 1;
        }else{
            return 0;
        }
    }

    function goRegister(){

    }
    window.goRegister = goRegister;

    function initPageValidate() {

        $.validator.addMethod("phonenum",function(value,element,params){
            if(value=="")
                return true;

            var value = $.trim(value);
            // var phoneValidate = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(value);
            var mobileValidate = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/.test(value);
            // if(!phoneValidate && !mobileValidate){
            if(!mobileValidate){
                return false;
            }
            return true;
        });

        $("#login").validate({
            rules: {
                email: {
                    required: true,
                    minlength: 6,
                },
                passwd: {
                    required: true,
                    minlength: 8
                }
            },
            messages: {
                email: {
                    required: "必填",
                    minlength: "长度不足6位",
                    email: "Email格式不正确"
                },
                passwd: {
                    required: "必填",
                    minlength: "长度不足8位",
                }
            },
            highlight: function(element) {
                $(element).closest('.input-wrapper').removeClass('success').addClass('error');
            },
            errorPlacement: function(error, element) {
                element.next('.error-promote').append(error);
            },
            success: function(element) {
                element.closest('.input-wrapper').removeClass('error').addClass('success');
            },
            onkeyup: function(element, event) {

                if (event.which === 13)
                    $("#login").submit();

                if (event.which === 9 && this.elementValue(element) === "") {
                    return;


                } else if (element.name in this.submitted || element === this.lastElement) {
                    this.element(element);
                }

                this.checkForm();

            },
            submitHandler: function(form) {
                loginStepExcute();
            }
        });


        $("#register").validate({
            rules: {
                name:{
                    required: true,
                },
                telephone: {
                    required: true,
                    phonenum: "",
                }
            },
            messages: {
                name:{
                    required: "必填"
                },
                telephone: {
                    required: "必填",
                    phonenum: "电话号码格式不正确"
                }
            },
            highlight: function(element) {
                $(element).closest('.input-wrapper').removeClass('success').addClass('error');
            },
            errorPlacement: function(error, element) {
                element.next('.error-promote').append(error);
            },
            success: function(element) {
                element.closest('.input-wrapper').removeClass('error').addClass('success');
            },
            onkeyup: function(element, event) {

                if (event.which === 13)
                    $("#register").submit();

                if (event.which === 9 && this.elementValue(element) === "") {
                    return;


                } else if (element.name in this.submitted || element === this.lastElement) {
                    this.element(element);
                }

                this.checkForm();

            },
            submitHandler: function(form) {
                postStepExcute();
            }
        });
    }

    function postStepExcute(){

        function postCheck(data){
            $(".postBtn").hide().nextAll(".error-promote").text("");;
            $(".postBtn-loading").css("display","inline-block");

            $.ajax({
                url: "/1.0//account/apply",
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (user){
                    $(".model,.mask").fadeIn();
                    $(".postBtn-loading").text("申请成功");
                },
                error: function(response, textStatus, errorThrown){
                    var resp;

                    try{
                        resp = JSON.parse( response.responseText || "{}" );
                    }catch(e){
                        resp = {
                            errorMessage:response.responseText
                        };
                    }

                    switch(resp.errorCode){
                        default:$(".postBtn").nextAll(".error-promote").text(resp.errorMessage||"未知错误");break;
                    }
                    $(".postBtn-loading").hide();
                    $(".postBtn").css("display","inline-block");
                    // console.log(XMLHttpRequest,textStatus,errorThrown)
                }
            })
        }

        var types = [];

        $(".typeSelector .checked").each(function(index,item){
            types.push($(item).next().text())
        });

        types = JSON.stringify(types);

        var utmstring = ""
        var query = window.location.search.substring(1);
        var params = query.split('&');
        for (var i=0; i < params.length; i++) {
            var pos = params[i].indexOf('=');
            if (pos > 0) {
                var key = params[i].substring(0,pos);
                var value = params[i].substring(pos+1);
                if(key == "utm_source" ){
                    utmstring = decodeURI(value);
                    break;
                }
            }
        }

        var data = {
            name: $("[name=name]").val(),
            phone: $("[name=telephone]").val(),
            productType: types,
            utm:utmstring
        };

        postCheck(data);
    }


    function loginStepExcute(){

        function saveRemeberUserInfo(loginId){
            if ($("#remember").hasClass('checked')) {
                Storage.set('rememberUser', 1);
                Storage.set('loginId', loginId);
            }else{
                Storage.set('rememberUser',"");
                Storage.set('loginId',"");
            }
        }

        function loginCheck(data){

            $(".loginBtn").hide().nextAll(".error-promote").text("");;
            $(".loginBtn-loading").css("display","inline-block");

            $.ajax({
                url: "/1.0/users/login",
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (user){

                    saveRemeberUserInfo($("#email").val());
                    //保存sessionToken useId username
                    Storage.set("sessionToken",user.sessionToken);
                    Storage.set("APIKey",user.apiKey);
                    Storage.set("userId",user.id);
                    Storage.set("email",user.email);

                    Storage.set("username",user.username);
                    Storage.set("orgType",user.orgType||'App');

                    // C.set('User.AppId', user.appId);
                    Storage.set('appId', user.appId);

                    if(user.timezone){
                        Storage.set("timezone",user.timezone);
                    }
                    // if(user.language){
                    //     Storage.set("language",user.language);
                    // }
                    var lastUrl = Storage.get("lastUrl");
                    if (lastUrl) {
                        lastUrl = lastUrl.url || "";
                    }
                    if (lastUrl && (lastUrl != "") && (lastUrl != "/") && (lastUrl != "/login") && (lastUrl != "/login.html") && (!/login#/.test(lastUrl)) && (!/login.html#/.test(lastUrl))) {
                        window.location.href = lastUrl;
                    } else {
                        window.location.href = '/create';
                    }

                },
                error: function(response, textStatus, errorThrown){

                    var resp;

                    try{
                        resp = JSON.parse( response.responseText || "{}" );
                    }catch(e){
                        resp = {
                            errorMessage:response.responseText
                        };
                    }

                    switch(resp.errorCode){
                        case 211:$(".loginBtn").nextAll(".error-promote").text("无此用户");break;
                        case 215:$(".loginBtn").nextAll(".error-promote").text(resp.errorMessage);break;
                        default:$(".loginBtn").nextAll(".error-promote").text(resp.errorMessage||"未知错误");break;
                    }
                    $(".loginBtn-loading").hide();
                    $(".loginBtn").css("display","inline-block");
                    // console.log(XMLHttpRequest,textStatus,errorThrown)
                }
            })
        }

        var data = {
            email: $("[name=email]").val(),
            password: $("[name=passwd]").val()
        };
        loginCheck(data);
    }

    function initPage(){
        if(initPageflag)
            return ;


        var rememberUser = Storage.get('rememberUser');
        var loginId = Storage.get('email');

        if (!!+rememberUser) {
            $("#remember").addClass('checked').removeClass("unchecked");
            $("[name=email]").val(loginId);
        } else {
            $("#remember").removeClass('checked').addClass('unchecked');
        }
        initPageValidate();

        initPageflag = 1;
    }

    if(checkUserStatus()==1){
        return ;
    }

    function initPC(){
        if(pcinitflag)
            return ;

        initPage();

        $("body").css("visibility","visible");

        if(window.location.hash == "#register"){
            $("#login").hide();
            $("#register").css("display","inline-block");
        }else{
            $("#login").css("display","inline-block");
            $("#register").hide();        
        }

        window.onhashchange = function(){
            if(window.location.hash=="#register"){
                $("#login").hide();
                $("#register").css("display","inline-block");
                document.title = "注册——真旺云应用平台";
            }
            else{
                $("#login").css("display","inline-block");
                $("#register").hide();
                document.title = "登陆——真旺云应用平台"
            }
        }

        pcinitflag = 1;
    }

    function initMobile(){
        if(mobileinitflag)
            return ;

        initPage();

        $("body").css("visibility","visible");
        mobileinitflag = 1;
    }

    $(function () {
        'use strict';

        $(".checkbox-inline").click(function(e){
            $(e.currentTarget).find(".icon").toggleClass("checked unchecked");
        });

        $(".loginBtn").click(function(){
            $("#login").submit();
        });
        
        $(".postBtn").click(function(){
            $("#register").submit();
        });

        $(window).resize(function(){
            if($(this).width() < windowbreakpoint ){
                initMobile();
                $("#login").hide();
                $("#register").css("display","inline-block");
                document.title = "注册——真旺云应用平台";
            }else{
                initPC();
                window.onhashchange();
            }
        })

        $(window).resize();
        //login logic
    });
})();
