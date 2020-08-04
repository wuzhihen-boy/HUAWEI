;
! function() {
    //1.渲染首页列表
    //后端提供接口
    //前端获取接口数据，进行渲染。

    //2.图片懒加载(lazyload)
    //图片进入可视区才加载(通过图片的top值和可视区的高度进行比较)

    const goodslist = $('.goodslist');
    //http://localhost:8088/JS2004/Day%2027_cart/php/taobaodata.php
    $.ajax({
        url: 'http://127.0.0.1/HUAWEI/php/taobaodada.php',
        dataType: 'json'
    }).done(function(data) {
        let strhtml = '<ul>';
        $.each(data, function(index, value) {
            strhtml += `
            <li class="grid-items ">
            <a class="thumb" href="/src/html/product.html?id=${value.sid}">
                <p class="grid-img">
                    <img src="http://localhost/HUAWEI/src/${value.pic}" />
                </p>
                <div class="grid-title">${value.title}</div>
                <p class="grid-desc">${value.title2}</p>
                <p class="grid-price">&yen;${value.price}</p>
                <p class="grid-tips">
                    <em class="thumb"><span class="color01" style="background-color:#68BEFF">&#x65b0;&#x54c1;</span></em>
                </p>
            </a>
        </li>
                `;
        });
        strhtml += '</ul>';
        goodslist.html(strhtml);

        //添加图片懒加载
        //1.设置类名lazy
        //2.图片路径绑定在  data-original=""
        //3.设置图片宽高。
        //4.渲染图片
        //5.{effect: "fadeIn"}:淡入效果
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    });

}();