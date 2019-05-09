$(function(){
    //页面标题
    $("title").text("HTML5前段开发技术论坛-系统管理员");
    /*管理员登录表单验证*/
    $("form.manageLogin button").on("click",function(){
        var $account=$(this).parents("form").find("input[name=account]");
        var $pwd=$(this).parents("form").find("input[name=pwd]");
        if($account.val()===""){
            $account.parent().next().text("* 账号不得为空");
            $account.focus();
            return false;
        }else{
            $account.parent().next().text("");
        }

        if($pwd.val()===""){
            $pwd.parent().next().text("* 密码不得为空");
            $pwd.focus();
            return false;
        }else{
            $pwd.parent().next().text("");
        }
    })

    /*发布帖子分类表单验证*/
    $("form.topicClass button").on("click",function(){
        var $topicClass=$(this).parents("form").find("input[name=topicClass]");
        var $topicClassDescription=$(this).parents("form").find("input[name=topicClassDescription]")
        if($topicClass.val()===""){
            $topicClass.parent().next().text("* 分类名称不得为空");
            $topicClass.focus();
            return false
        }else{
            $topicClass.parent().next().text("");
            var flag;
            $.ajax({
                type:"post",
                url:"checkArticleClass",
                async:false,
                data:{
                    articleClass:$topicClass.val()
                },
                success:function(data){
                   if(data.success==-1){
                       $topicClass.parent().next().text("* 分类名称已使用");
                       $topicClass.select()
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
    })

    /*分类修改表单验证*/
    $("form.topicClassEdit button").on("click",function(){
        var $topicClass=$(this).parents("form").find("input[name=topicClass]");
        var $topicClassDescription=$(this).parents("form").find("textarea[name=topicClassDescription]")
        if($topicClass.val()===""){
            $topicClass.parent().next().text("* 分类名称不得为空");
            $topicClass.focus();
            return false
        }else{
            $topicClass.parent().next().text("");
        }
    })
    /*删除分类名称模态框初始化*/
    $("#topicClassDelete").modal({
        backdrop:"static",
        show:false
    })
    var index;
    $("table form a").on("click",function(){
        index=$(this).parents("tr").index();
    })

    $(".modal[id*=Delete] button").on("click",function(){
        $("table").find("form").eq(index).submit()
    })
    /*修改密码表单验证*/
    $("form.adminPasswordModify button").on("click",function(){
        var $oldPwd=$(this).parents("form").find("input[name=oldPwd]")
        var $newPwd=$(this).parents("form").find("input[name=newPwd]")
        var $okPwd=$(this).parents("form").find("input[name=okPwd]")
        if($oldPwd.val()===""){
            $oldPwd.parent().next().text("* 旧密码不得为空");
            $oldPwd.focus();
            return false
        }else{
            $oldPwd.parent().next().text("");
            var flag;
            $.ajax({
                type:"post",
                url:"/manage/checkAdminPwd",
                async:false,
                data:{
                    oldPwd:$oldPwd.val()
                },
                success:function(data){
                    flag=data.success==1
                }
            })
            if(flag){
                $oldPwd.parent().next().text("* 旧密码输入有误");
                $oldPwd.select()
                return false
            }

        }

        if($newPwd.val()===""){
            $newPwd.parent().next().text("* 新密码不得为空")
            $newPwd.focus();
            return false
        }else{
            $newPwd.parent().next().text("");
        }

        if($okPwd.val()===""){
            $okPwd.parent().next().text('* 确认密码不得为空');
            $okPwd.focus()
            return false
        }else if($okPwd.val()!==$newPwd.val()){
            $okPwd.parent().next().text("* 确认密码与新密码不一致");
            $okPwd.focus()
            return false
        }
    })
})