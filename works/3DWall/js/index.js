var works=document.getElementById("works");
var lis=works.querySelectorAll('li');

var shadowBox=document.getElementById("shadowBox");
var showPic=document.getElementById("showPic");

var img=document.querySelector(".img");
var upImg=img.getElementsByTagName('img')[1];			//上面那张图
var downImg=img.getElementsByTagName('img')[0];			//下面那张图

shadowBox.style.height=document.querySelector("html").offsetHeight+'px';

for(let i=0;i<lis.length;i++){
	//lis[i].index=i;
	lis[i].onclick=function(){
		shadowBox.style.display=showPic.style.display='block';
		
		//tranisition不支持display改变，跟他有冲突
		setTimeout(function(){
			showPic.style.transform='scale(1)';
		});
		
		//upImg.src='work_images/work_'+this.index+'_big.jpg';
		upImg.src='work_images/work_'+i+'_big.jpg';
	};
}

//遮罩层点击的时候隐藏所有
shadowBox.onclick=function(){
	this.style.display='none';
	showPic.style.transform='scale(0)';
	showPic.style.display='none';
};
