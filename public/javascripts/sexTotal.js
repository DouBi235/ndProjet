$(function(){
    /*查询男女比例*/
    $.ajax({
        type:"get",
        url:"/manage/sexTotal",
        success:function(data){
            var sum=data.success[0].renshu+data.success[1].renshu
            var boy=parseInt(data.success[0].renshu/sum*100*10+0.5)/10
            var gril=parseInt(data.success[1].renshu/sum*100*10+0.5)/10
            $(".progress .progress-bar-info").css("width",gril + "%")
            $(".progress .progress-bar-success").css("width",boy + "%")
            $(".progress .boy").text(boy)
            $(".progress .gril").text(gril)
        }
    })
})