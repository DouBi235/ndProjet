$(function(){
    //页面标题
    $("title").text("HTML5前段开发技术论坛-用户中心")
    /**/
    $("#exit").modal({
        backdrop:"static"
    });

    /*修改个人信息表单验证*/
    $('form.modifyInfo button').on("click",function(){
        var $nick=$(this).parents("form").find("input[name=nick]");
        var $age=$(this).parents('form').find("input[name=age]")
        var $address=$(this).parents('form').find("input[name=address]")
        var $QQ=$(this).parents('form').find("input[name=QQ]")
        var $email=$(this).parents('form').find("input[name=email]")

        if($nick.val()===""){
            $nick.parent().next().text("* 账号昵称不得为空");
            $nick.focus();
            return false
        }else{
            $nick.parent().next().text("");
        }

        if($age.val()===""){
            $age.parent().next().text("* 年龄不得为空");
            $age.focus();
            return false
        }else{
            $age.parent().next().text("");
        }

        if($address.val()===""){
            $address.parent().next().text("* 住址不得为空");
            $address.focus();
            return false
        }else{
            $address.parent().next().text("");
        }

        if($QQ.val()===""){
            $QQ.parent().next().text("* QQ不得为空");
            $QQ.focus();
            return false
        }else{
            $QQ.parent().next().text("");
        }

        if($email.val()===""){
            $email.parent().next().text("* 电子邮箱不得为空");
            $email.focus();
            return false
        }else{
            $email.parent().next().text("");
        }
    })
    /*修改登录密码表单验证*/
    $("form.passwordModify button").on("click",function(){
        var $olePwd=$(this).parents("form").find("input[name=oldPwd]");
        var $newPwd=$(this).parents("form").find("input[name=newPwd]")
        var $okPwd=$(this).parents("form").find("input[name=okPwd]")
        if($olePwd.val()===""){
            $olePwd.parent().next().text("* 旧密码不得为空");
            $olePwd.focus();
            return false
        }else{
            $olePwd.parent().next().text("");
            var flag;
            $.ajax({
                type:"post",
                async:false,
                url:"/users/checkOldPwd",
                data:{
                    oldPwd:$olePwd.val()
                },
                success:function(data){
                    if(data.success==1){
                        $olePwd.parent().next().text("* 旧密码输入有误");
                        flag=true
                    }else{
                        flag=false
                    }
                }
            })
            if(flag){
                return false
            }
        }
        if($newPwd.val()===""){
            $newPwd.parent().next().text("* 新密码不得为空");
            $newPwd.focus()
            return false
        }else{
            $newPwd.parent().next().text("");
        }

        if($okPwd.val()===""){
            $okPwd.parent().next().text("* 确认密码不得为空")
            $okPwd.focus()
            return false
        }else if($okPwd.val()!==$newPwd.val()){
            $okPwd.parent().next().text('* 确认密码与新密码不一致')
            $okPwd.select();
            return false
        }else{
            $okPwd.parent().next().text('')
        }
    })

    /*上传头像*/
    $("form.uploadPhoto input[type=file]").on("input",function(){
        $(this).parent("form").submit()
    })
})