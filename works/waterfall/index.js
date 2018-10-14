window.onload=function(){
    // 定义一个函数，当一打开页面以及拖动滚动条时执行
    waterfall("main","outer");
    var imgSrc=[{src:'10.jpg'},{src:'11.jpg'},{src:'12.jpg'},{src:'13.jpg'},{src:'14.jpg'},{src:'15.jpg'},{src:'16.jpg'},{src:'17.jpg'}];
    //滚动条滚动时window的scroll事件
    window.onscroll=function(){
        if(getStart()){
            //开始渲染，在哪渲染，怎样渲染。渲染就是创建相同的子元素，然后将其添加到父级
        var oParent=document.getElementById('main');
        for(let i=0;i<imgSrc.length;i++){
            //创建子元素
            var oOuter=document.createElement("div");
            var oInner=document.createElement('div');
            var oImg=document.createElement('img');
            //设置子元素的类名，主要是为了配合css样式
            oOuter.className="outer";
            oInner.className="inner";
            //添加子元素
            oParent.appendChild(oOuter);
            oOuter.appendChild(oInner);
            oInner.appendChild(oImg);
            //设置文件路径
            oImg.src="img/"+imgSrc[i].src;
        }
        //渲染完之后，调用waterfall函数
        waterfall('main',"outer");
        }
    }
}

function waterfall(id,clsName){
    //获取父级以及父级下的所有子级
    var oParent=document.getElementById(id);
    // var oChildren=getClassObj(parent,className);
    var oChildren=oParent.getElementsByClassName(clsName);
    // console.log(oParent,oChildren)
    //获取子级的宽度和页面的宽度，以此来求每行列数
    var oCHildW=oChildren[0].offsetWidth;
    var obodyW=document.documentElement.clientWidth;
    var cols=Math.floor(obodyW/oCHildW);
    // console.log(oCHildW,obodyW)
    //设置最外层父级的宽度
    var oParentW=cols*oCHildW;
    oParent.style.width=oParentW+'px';
    // console.log(oParentW)
    var arrH=[];

    for(let i=0;i<oChildren.length;i++){
        if(i<cols){
            //将第一排元素的高度写入数组arrH
            arrH.push(oChildren[i].offsetHeight)
        }else{
            //从第二排元素开始，其第一个元素需要设置绝对定位
            //求第一行中元素高度的最小值
            var minH=Math.min.apply(null,arrH);
            //求出最小值的下标
            var minHIndex=getIndex(arrH,minH);
            oChildren[i].style.position="absolute";
            oChildren[i].style.top=minH+'px';
            oChildren[i].style.left=oChildren[minHIndex].offsetLeft+'px';
            //第二行的第一张图片排练好后，改编该列元素的高度,改编当前索引数组的高度
            arrH[minHIndex]+=oChildren[i].offsetHeight;
        }
    }
}

//外部定义的函数可以在内部进行使用
function getIndex(arr,val){
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}

//判断什么时候开始渲染图片。当最后一张图片的中心距离顶部的距离小于滚动条滚动的距离时，开始渲染
function getStart(){
    var oParent=document.getElementById("main");
    var oChildren=oParent.getElementsByClassName("outer");
    var lastItemTop=oChildren[oChildren.length-1].offsetHeight+Math.floor(oChildren[oChildren.length-1].clientHeight);
    var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
    var documentH=document.documentElement.clientHeight
    return (lastItemTop<scrollTop+documentH)?true:false;
}
