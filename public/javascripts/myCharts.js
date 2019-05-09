$(function(){
    var myChart = echarts.init(document.getElementById('myCharts'));
    var num=[]
    var name=[]
    $.ajax({
        type:"post",
        url:"/manage/getData",
        async:false,
        success:function(data){
            for(var i=0;i<data.temp.length;i++){
                option.series[0].data.push(data.temp[i].count)
                option.xAxis.data.push(data.temp[i].content[0].className)
            }
        }
    })
    myChart.setOption(option);
})