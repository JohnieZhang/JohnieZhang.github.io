window.onload=function(){
    var spans=document.querySelectorAll(".item div span");
    var works=document.querySelectorAll(".works");
    
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