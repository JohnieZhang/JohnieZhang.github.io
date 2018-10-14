window.onload=function(){
    var moocBox=document.getElementById("moocBox");
    var con1=document.getElementById("con1");
    var con2=document.getElementById("con2");
    var timer=50;
    // 复制一份列表容器
    con2.innerHTML=con1.innerHTML;
    // moocBox.scrollTop=10;  moocBox下的ul向上移动10px,可以不写单位
    // scrollTop是作用与父元素的子元素，此处为ul向上滚动10px
    // setInterval("","")中的第一个参数可以是方法也可以是算数表达式.moocBox.scrollTop++就是算术表达式

    var myScoll=setInterval(scollUp,timer)
    
    //var scollUp=setInterval(scollUp(),timer)  var scollUp=setInterval('scollUp()',timer),不能加括号，也不能加引号
    function scollUp(){
        if(moocBox.scrollTop==con1.offsetHeight){
            moocBox.scrollTop=0;
        }else{
            moocBox.scrollTop++;
        }
    }

    // 鼠标悬浮时停止滚动
    // 鼠标划过 onmouseover     onmouseout鼠标离开
    //给父元素moocBox添加鼠标划过与离开事件
    moocBox.onmouseover=function(){
        clearInterval(myScoll);
    }
    moocBox.onmouseout=function(){
        myScoll=setInterval(scollUp,timer)
    }
}