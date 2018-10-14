window.onload=function(){
    var container=document.getElementById('container');
    var preItem=document.querySelector('.preItem');
    var wonder=document.querySelector("#wonder");
    var preloader=document.querySelector('.preloader');
    var spans=document.querySelectorAll(".item div span");
    var works=document.querySelectorAll(".works");
    var documentH=document.documentElement.clientHeight || document.body.clientHeight;
    container.style.height=documentH+'px';
    preItem.style.height=documentH+'px';
    setTimeout(function(){
        preItem.style.display="none";
        wonder.style.opacity=1;
        container.style.display="block";
    },2000)
    for(let i=0;i<spans.length;i++){
        spans[i].index=i;
        spans[i].onclick=function(){
            if(works[this.index].style.display=="block"){
                works[i].style.display="none";
            }else{
                for(let i=0;i<spans.length;i++){
                    works[i].style.display="none";
                }
                works[this.index].style.display="block";
            }
        }
            
    }

}