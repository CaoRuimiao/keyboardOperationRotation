let leftBtn=document.querySelector('#left');
let rightBtn=document.querySelector('#right');
let imgsBox=document.querySelector('.imgs');
let imgSrcList=["4.jpg", "3.jpg", "2.jpg", "1.jpg"];
// 初始化
init();
function init(){
    createImg();
    drag();
    scroll();
}
function createImg(){
    imgSrcList.forEach(item=>{
        let img=document.createElement('img');
        img.src=`./imgs/${item}`;
        imgsBox.appendChild(img);
    });
}
let imgs=imgsBox.querySelectorAll('img');
let imgsWidth=imgsBox.offsetWidth;
let imgsHeight=imgsBox.offsetHeight;
function switchImg(l,v){
    let firstChild=imgsBox.firstElementChild;
    let lastChild=imgsBox.lastElementChild;
    if(l){
        mTween({
            el:lastChild,
            attr:{
                left:imgsWidth * l
            },
            cb(){
                let newFirstChid=imgsBox.insertBefore(lastChild,firstChild);
                css(newFirstChid,'left',0)
            }
        });
    }
    if(v){
        mTween({
            el:lastChild,
            attr:{
                top:imgsHeight * v
            },
            cb(){
                let newFirstChid=imgsBox.insertBefore(lastChild,firstChild);
                css(newFirstChid,'top',0)
            }
        });
    }
}
rightBtn.addEventListener('click',function(){
    switchImg(1,0);
});
leftBtn.addEventListener('click',function(){
    switchImg(-1,0);
});
// 键盘事件 左上右下
document.addEventListener('keydown',function(e){
    switch (e.keyCode){
        case 37:switchImg(-1,0);//向左
                break;
        case 38:switchImg(0,-1);//向上
                break;
        case 39:switchImg(1,0);//向右
                break;
        case 40:switchImg(0,1);//向下
                break;
        default:switchImg(-1,0);//向右
    }
});
// 拖拽
function drag(){
    let startMouse={};
    let nowPosition={};
    let dis={};
    let move=(e)=>{
        nowPosition.x=e.clientX;
        nowPosition.y=e.clientY;
        dis={
            x:nowPosition.x - startMouse.x,
            y:nowPosition.y - startMouse.y
        };
        if(Math.abs(dis.x) > Math.abs(dis.y)){
            // 左右拖动
            dis.x > 0 ? switchImg(1,0) : switchImg(-1,0)
        }else{
            // 上下拖动
            dis.y > 0 ? switchImg(0,1) : switchImg(0,-1);
        }
    }
    imgsBox.addEventListener('mousedown',function(e){
        startMouse.x=e.clientX;
        startMouse.y=e.clientY;
        imgsBox.addEventListener('mousemove',move,{
            once:true
        });
        imgsBox.addEventListener('mouseup',function(){
            imgsBox.removeEventListener('mousemove',move,{
                once:true
            });
        });
        e.preventDefault();
    });
}
// 鼠标滚轮操作
function scroll(){
    mouseScroll(imgsBox,function(){
        // console.log('上');
        switchImg(0,-1);
    },function(){
        // console.log('下');
        switchImg(0,1);
    });
}