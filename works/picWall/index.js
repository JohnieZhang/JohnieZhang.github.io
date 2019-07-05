'use strict'
/*
    1、css实现3d布局
    2、js实现图片的镜像效果
    3、开场动画。图片是逆时针旋转出来的，并且每张图片之间有时间差，所有需要定时器。每循环一次执行一次定时器，用setTimeout
    4、在开场动画结束后，才可以拖拽。拖拽对象是什么？可以进行拖拽的判断已经，拖拽的结果是什么？（图片旋转）
    5、解决第二次拖拽图片归位的问题
    5、模拟拖拽的效果。拖拽的幅度越大，时间越短，图片旋转的越快，最后慢慢停下来。怎样进行模拟，停下来的依据是什么，鼠标已经没有拖拽了而图片仍然在旋转（定时器）
        定时器写在哪：当鼠标抬起时，图片仍然在转动，所以要在鼠标抬起时加定时器
    6、当鼠标按下与抬起的事件间隔较长时，鼠标抬起时，图片不会旋转。时间间隔怎么表示，怎样控制图片的旋转。当那个事件发生时，才模拟拖拽
        当鼠标在运动时，就要计算出运动的距离，然后当鼠标抬起时，依据运动距离模拟拖拽情况
        



 */
window.onload=function(){
    // 
    var wrap=document.querySelector("#wrap");
    //旋转
    var divs=document.querySelectorAll("#wrap>div");
    // 添加背景图片
    var shadows=document.querySelectorAll("#wrap .shadow");
    var rotate=360/divs.length;
        // console.log(shadows)

    //生成背景图片。for循环使用let声明变量时，不需要自执行函数。推荐使用，定时器中接收到的i值为每一个值，而不是终值。而var定义的变量就是终值
    for(let i=0;i<divs.length;i++){
        shadows[i].style.background=`linear-gradient(#000 10%,rgba(0,0,0,0)), url("images/${i+1}.jpg")`;
        //刚开始时，实现动画。由于图片是从后往前出现的，并且每张图片之间有时间间隔，所有需要定时器。每循环一次执行一次定时器，用setTimeout
        
        setTimeout(() => {
            divs[i].style.transform=`rotateY(${i*rotate}deg) translateZ(400px)`;
            // console.log(i)
        }, (divs.length-i)*200);
    }
    
    /*使用var申明变量，需要用到自执行函数
    for(var i=0;i<divs.length;i++){
        shadows[i].style.background=`linear-gradient(#000 10%,rgba(0,0,0,0)), url("images/${i+1}.jpg")`;
        //刚开始时，实现动画。由于图片是从后往前出现的，并且每张图片之间有时间间隔，所有需要定时器。每循环一次执行一次定时器，用setTimeout
        (function(i){
            setTimeout(() => {
                divs[i].style.transform=`rotateY(${-i*36}deg) translateZ(400px)`;
                console.log(i)
            }, (divs.length-i)*200);
        })(i)
    }
    */
   //鼠标拖拽屏幕时，实现旋转。旋转的对象是谁？什么时候开始旋转。旋转对象wrap。最后一张图片过渡完之后开始旋转。由于是逆时针旋转的，所以最后一张图片是div[0]
   //但是要等开场动画结束后开能开始拖拽，怎样确定图片加载完？当最后一张图片过渡transition结束时，触发transitionend,所以用到addEventListener
   divs[0].addEventListener('transitionend',()=>{
    //    alert(1);
       drag();

   })
   function drag(){
        var curX=0;			//最初的圆环转的值
        var curY=0;         //最初的圆环转的值
        var timer;
       document.onmousedown=function(ev){
           //点击停下旋转
           clearInterval(timer);
        //鼠标落下去的初始位置
        var disX=ev.clientX;
        var disY=ev.clientY;
        /*
        * 上次停下来的坐标（为了第二次再拖动的时候能从上一次停的地方接着走）
        * 他的位置放在这里的原因是，每次鼠标按下的时候都要知道上次停的位置，所以只要按下就要让他的值取一次，放在外面的话只会取一次
        */
       //定义变量的位置
        var lastX=curX;
        var lastY=curY;

        //鼠标按下时，记录一个点。模拟拖拽
        var speedX=0;
        var speedY=0;
        //按下时记录一下时间撮
        var startTime=new Date().getTime();
        //鼠标移动时进行旋转
        document.onmousemove=function(ev){
            //鼠标抬起来后移动的距离。除以10是为了减小wrap旋转的角度
            //将上一次鼠标离开的位置加入到最新的位置中，更新第二次鼠标点击后的位置
            //注意：此处是赋值，而不是定义变量
                curX=lastX+(ev.clientX-disX)/10;
                curY=lastY+(disY-ev.clientY)/10;
            /*
                var curX=lastX+(ev.clientX-disX)/10;
                var curY=lastY+(disY-ev.clientY)/10;
                这样写是错误的，因为之前已经定义好了curX与curY
                var lastX=curX;
                var lastY=curY;
             */
            //鼠标抬起来后，图片要进行循转，这个时候控制父级wrap就可以实现所有图片的旋转。左右移动鼠标时，旋转y轴，上下移动时，旋转x轴，所以要将disX与disY互换位置
            // wrap.style.transform=`perspective(1000px) rotateX(${disX}deg) rotateY(${disY}deg)`;
            //这样设置时，稍微移动鼠标，旋转的角度就较大，旋转角度大的决定因素是disX与disY，所以要设法将其减小，通常做法就是除以一个数
            wrap.style.transform=`perspective(1000px) rotateX(${curY}deg) rotateY(${curX}deg)`;

            //但是现在新的问题又出现了，第一次点击鼠标并拖动后，第二次再点击鼠标进行拖动，图片会返回到初始位置，而不是第一次鼠标抬起后停留的位置
            //这个原因是我们没有记录鼠标拖动之后的位置

            //扔的距离是由鼠标滑动的距离决定的(也就是拖拽的距离)。获取拖拽的距离
            speedX=(ev.clientX-disX)/100;
            speedY=(disY-ev.clientY)/100;

        }
        document.onmouseup=function(){
            //鼠标抬起时，清除onmousemove事件，不然onmousemove事件在鼠标抬起时还会发生。事件的清除
            var endTime=new Date().getTime();
            document.onmousemove=null;
            if(endTime-startTime<300){
                timer=setInterval(()=>{
                    // 当前位置再向前移动一些
                    curX+=speedX;
                    curY+=speedY;
                    //添加摩擦，速度慢慢减下来
                    speedX*=0.95;
                    speedY*=0.95;

                    //停止条件
                    if(Math.abs(speedX)<0.1 && Math.abs(speedY)<0.1){
                        clearInterval(timer);
                    }
                    wrap.style.transform=`perspective(1000px) rotateX(${curY}deg) rotateY(${curX}deg)`;
                },16)
            }
        }
        //清楚浏览器的默认样式
        return false;
           
       
   }
   }
   



    
}