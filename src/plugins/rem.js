
const baseSize = 50; //设计稿375，统一定义1rem=50px

// 设置rem 函数
function setRem() {
    //计算出 比例来 当前分辨率的宽%设计稿宽度
    const scale = window.screen.width / 375;
    // 根据不同屏幕尺寸给根元素设置font-size
    document.documentElement.style.fontSize =
        baseSize * Math.min(scale, 2) + "px";
}
window.onresize = () => {
    setRem();
};
setRem();