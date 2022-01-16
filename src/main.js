const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
    {
        logo: 'A',
        url: 'https://www.acfun.cn',
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com/',
    }
]
const simplifyUrl = (url) => {
  return url.replace('https://','')
      .replace('http://','')
      .replace('www.','')
      .replace(/\/.*/,'')
}
const render = ()=>{
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node,index)=>{
        const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
            </li>
        `).insertBefore($lastLi);
        let ali = Array.from(document.querySelectorAll("li>.site")) ;
        ali[index].style.backgroundColor = randomColor(0.1)
        $li.on('click',(e)=>{
            window.open(node.url);
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation(); // 阻止冒泡
            hashMap.splice(index, 1);
            render();
        })
    })
}

render();
$('.addButton')
    .on('click', ()=>{
        let url = window.prompt('请问您要添加什么网址～');
        if (url.indexOf('http') !== 0){
            url = 'https://' + url;
        }
        console.log(url)
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            logoType: 'text',
            url: url
        });
        render();
    })
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
}

$(document).on('keypress', (e)=>{
    const {key} = e;
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url);
        }
    }
})

$('input').on('keypress',(e)=>{
    e.stopPropagation();
})
function randomColor(alpha){
    //判断有没有传入透明值，没有传入的话，随机生成0-1之间的小数
    //Math.random()只能生成0-1之间的小数，不包含0跟1，Math.random()*10，是1-10之间的整数，除以10再四舍五入，就有可能得到0或者1.
    alpha = alpha==undefined? (Math.random()*10/10).toFixed(1) : alpha;
    //将参数转化成数值
    alpha=Number(alpha);
    //如果传入的参数是非数值，则让透明度为1
    if(isNaN(alpha)) alpha=1;
    //颜色拼接
    let color = "rgba(";
    for(let i=0;i<3;i++){
        color+=parseInt(Math.random()*256)+",";
    }
    color+= alpha+")";
    return color;
}