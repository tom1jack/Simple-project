/**
 * Created by 1 on 2017/2/15.
 */
function Rem() {
    var docEl = document.documentElement,
        oSize = docEl.clientWidth / 6.4;

    if (oSize > 100) {
        oSize = 100; // 限制rem值 640 / 6.4 =100
    }

    docEl.style.fontSize = oSize + 'px';
}
window.addEventListener('resize', Rem, false);
Rem();
//以上使自适应缩放的代码。
