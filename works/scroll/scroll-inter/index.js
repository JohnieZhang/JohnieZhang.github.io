window.onload=function(){
    var moocBox = document.getElementById("moocBox");
    var con1 = document.getElementById("con1");
    // 注意：document.getElementById("con1")获取的只是ul,要想获取到li，还要在父级后加children
    var oHeight=con1.children[0].offsetHeight;
    // console.log(con1.offsetHeight)
    // 克隆一个ul列表
    // con2.innerHTML=con1.innerHTML;
    moocBox.innerHTML+=moocBox.innerHTML;
    // 获取li的高度
    // var lis=con1.querySelectorAll("li a");
    // console.log(lis[1])
    // var oHeight=lis[0].offsetHeight;
    console.log(oHeight)
    var timer = 50;
    var moveUp;
    moocBox.scrollTop=0;
    
    function start(){
        moocBox.scrollTop++;
        // 定义一个定时器，让其每隔一段时间滚动执行一次
        moveUp=setInterval(scrollUp,timer);
    }
    function scrollUp(){
        // moocBox.scrollTop++;  刚开始为0，所以不会滚动
        if(moocBox.scrollTop % oHeight == 0){
            //当滚动一个li的高度就停止一会。清除定时器
            clearInterval(moveUp)
            //隔两秒之后有又开始运动
            setTimeout(start,500)
        }else{
            moocBox.scrollTop++;
            if(moocBox.scrollTop==moocBox.scrollHeight/2){
                moocBox.scrollTop=0;


                //scrollTop与scrollHeight的区别
            }
        }
    }


    
    
    //首先停留两秒之后再开始运动，自执行
    setTimeout(start,1000);
}
    