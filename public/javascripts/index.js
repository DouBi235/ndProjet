$(function(){
	//页面标题
    $("title").text("HTML5前段开发技术论坛");

    /*登录模态框初始化*/
    $("#loginModal").on("shown.bs.modal",function(){
        $(this).find("input").eq(0).focus();
    });
    $("#loginModal").modal({
        backdrop:'static',
        show:false
    });
    /*登录表单验证*/
    $('#loginModal button').on("click",function(){
        var $account=$('#loginModal').find("input[name=account]");
        var $pwd=$('#loginModal').find("input[name=pwd]");
        var reg=/^1[34578]\d{9}$/
        if($account.val()===""){
            $('#loginModal').find(".help-block").text("* 登录账号不得为空");
            $account.focus();
            return false
        }else if($account.val().search(reg)){
            $('#loginModal').find(".help-block").html("* 请输入11位有效手机号码");
            $account.focus();
            return false;
        }else{
            $('#loginModal').find(".help-block").html("&nbsp;");
        }

        if($pwd.val()===""){
            $('#loginModal').find(".help-block").text("* 登录密码不得为空");
            $pwd.focus();
            return false
        }else{
            $('#loginModal').find(".help-block").html("&nbsp;");
        }
        $('#loginModal form').submit();
    })
    /*注册表单验证*/
    $("form.register button").on("click",function(){
        var $phone=$(this).parents('form').find("input[name=phone]");
        var $password=$(this).parents('form').find("input[name=password]");
        var $confirm=$(this).parents('form').find("input[name=confirm]");
        var reg=/^1[34578]\d{9}$/
        if($phone.val()===""){
            $phone.parents(".col-md-6").next().text("* 注册账号不得为空");
            $phone.focus();
            return false;
        }else if($phone.val().search(reg)==-1){
            $phone.parents(".col-md-6").next().text("* 请输入11位有效手机号码");
            $phone.focus();
            return false;
        }else{
            $phone.parents(".col-md-6").next().text("");
            var flag;
            $.ajax({
                type:"post",
                async:false,
                url:"/checkPhone",
                data:{
                    phone:$phone.val()
                },
                success:function(data){
                    if(data.success===-1){
                        $phone.parents(".col-md-6").next().text("* 该手机号码已被注册");
                        $phone.focus();
                        flag=true;
                        return false;
                    }else{
                        flag=false
                    }
                }
            })
            if(flag){
                return false
            }
        }

        if($password.val()===""){
            $password.parents(".col-md-6").next().text("* 注册密码不得为空");
            $password.focus();
            return false;
        }else{
            $password.parents(".col-md-6").next().text("");
        }

        if($confirm.val()===""){
            $confirm.parents(".col-md-6").next().text("* 确认密码不得为空");
            $confirm.focus();
            return false;
        }else if($confirm.val()!==$password.val()){
            $confirm.parents(".col-md-6").next().text("* 确认密码与注册密码不一致");
            $confirm.focus();
            return false
        }else{
            $confirm.parents(".col-md-6").next().text("");
        }
    })

    $("form.releaseTopic button").on("click",function(){
        var $topicClass=$(this).parents("form").find("select[name=topicClass]");
        var $topicTitle=$(this).parents("form").find("input[name=topicTitle]");
        var $topicContent=$(this).parents("form").find("textarea[name=topicContent]");
        if($topicClass.val()===null){
            $topicClass.parent().next().text("* 请选择帖子分类");
            $topicClass.focus();
            return false;
        }else{
            $topicClass.parent().next().text("");
        }

        if($topicTitle.val()===""){
            $topicTitle.parent().next().text("* 贴子标题不得为空");
            $topicTitle.focus();
            return false;
        }else{
            $topicTitle.parent().next().text("");
        }

        if($topicContent.val()===""){
            $topicContent.parent().next().text("* 贴子内容不得为空");
            $topicContent.focus();
            return false;
        }else{
            $topicContent.parent().next().text("");
        }
    })
});