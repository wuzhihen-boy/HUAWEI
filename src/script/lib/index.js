let baseUrl = "http://localhost/HUAWEI"; // 基础路径 必须是绝对路径

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function() {
            // let shop = cookie.get('shop'); //   获取cookie数据
            // shop = JSON.parse(shop);
            // // console.log(shop)
            // let num1=0;
            // for(let i=0;i<shop.length;i++){
            //     // console.log(shop[i])
            //     num1 +=parseInt(shop[i].num)
            // }
            // $('#header-cart-total').html(num1);
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getall.php`,
                dataType: "json",
                success: function(res) {
                    // console.log(res);
                    let temp = '';
                    res.forEach(elm => {
                        // console.log(elm.pic);
                        // let pic = JSON.parse(elm.pic);
                        // console.log(pic);
                        temp += `<li class="grid-items ">
                        <a class="thumb" href="${baseUrl}/src/render.html?sid=${elm.sid}">
                            <p class="grid-img">
                                <img src="${elm.img}" />
                            </p>
                            <div class="grid-title">${elm.title}</div>
                            <p class="grid-desc">${elm.desc_i}</p>
                            <p class="grid-price">${elm.price}</p>
                            <p class="grid-tips">
                                <em class="thumb"><span class="color01" style="background-color:#68BEFF">&#x65b0;&#x54c1;</span></em>
                            </p>
                        </a>
                    </li>`
                    });

                    $('.grid-list').html(temp);
                }
            });


            // 主页爬楼梯         
            $('body').on('mousewheel', function() {
                console.log($(window).scrollTop())
                    // console.log($(window).scrollTop()==400)
                if ($(window).scrollTop() >= 800) {
                    $('.palt').fadeIn(600)
                    $('.palt').addClass('show')
                } else {
                    $('.palt').fadeOut(600)
                    $('.palt').removeClass('show')
                }
            })

            console.log($("#" + $(this).attr('title')))
            $('.palt>li>a').on('click', function() {
                let top = $("#" + $(this).attr('title')).offset().top;
                console.log(top)
                $('html,body').animate({
                    scrollTop: top
                }, 600);
            })

            $(window).on('scroll', function() {
                // 当前文档距离顶部的高度
                let top = $(document).scrollTop();
                let i = 0;
                if (top >= 3254) {
                    i = 4;
                } else if (top >= 2880) {
                    i = 3;
                } else if (top >= 2506) {
                    i = 2;
                } else if (top >= 2032) {
                    i = 1;
                }

                $('.palt>li>a').removeClass('active');
                $('.palt>li>a:eq(' + i + ')').addClass('active');
            });

            //定时器返回值
            var time = null;
            //记录当前位子
            var nexImg = 0;
            //用于获取轮播图图片个数
            var imgLength = $(".c-banner .banner ul li").length;
            //当时动态数据的时候使用,上面那个删除
            // var imgLength =0;
            //设置底部第一个按钮样式
            $(".c-banner .jumpBtn ul li[jumpImg=" + nexImg + "]").css("background-color", "#fff");

            //页面加载
            $(document).ready(function() {
                // dynamicData();
                //启动定时器,设置时间为3秒一次
                time = setInterval(intervalImg, 3000);
            });

            //点击上一张
            $(".preImg").click(function() {
                //清楚定时器
                clearInterval(time);
                var nowImg = nexImg;
                nexImg = nexImg - 1;
                console.log(nexImg);
                if (nexImg < 0) {
                    nexImg = imgLength - 1;
                }
                //底部按钮样式设置
                $(".c-banner .jumpBtn ul li").css("background-color", "none");
                $(".c-banner .jumpBtn ul li[jumpImg=" + nexImg + "]").css("background-color", "#fff");

                //将当前图片试用绝对定位,下一张图片试用相对定位
                $(".c-banner .banner ul img").eq(nowImg).css("position", "absolute");
                $(".c-banner .banner ul img").eq(nexImg).css("position", "relative");

                //轮播淡入淡出
                $(".c-banner .banner ul li").eq(nexImg).css("display", "block");
                $(".c-banner .banner ul li").eq(nexImg).stop().animate({
                    "opacity": 1
                }, 1000);
                $(".c-banner .banner ul li").eq(nowImg).stop().animate({
                    "opacity": 0
                }, 1000, function() {
                    $(".c-banner ul li").eq(nowImg).css("display", "none");
                });

                //启动定时器,设置时间为3秒一次
                time = setInterval(intervalImg, 3000);
            })

            //点击下一张
            $(".nexImg").click(function() {
                clearInterval(time);
                intervalImg();
                time = setInterval(intervalImg, 3000);
            })

            //轮播图
            function intervalImg() {
                if (nexImg < imgLength - 1) {
                    nexImg++;
                } else {
                    nexImg = 0;
                }

                //将当前图片试用绝对定位,下一张图片试用相对定位
                $(".c-banner .banner ul img").eq(nexImg - 1).css("position", "absolute");
                $(".c-banner .banner ul img").eq(nexImg).css("position", "relative");

                $(".c-banner .banner ul li").eq(nexImg).css("display", "block");
                $(".c-banner .banner ul li").eq(nexImg).stop().animate({
                    "opacity": 1
                }, 1000);
                $(".c-banner .banner ul li").eq(nexImg - 1).stop().animate({
                    "opacity": 0
                }, 1000, function() {
                    $(".c-banner .banner ul li").eq(nexImg - 1).css("display", "none");
                });
                $(".c-banner .jumpBtn ul li").css("background-color", "rgba(255,255,255,0.01)");
                $(".c-banner .jumpBtn ul li[jumpImg=" + nexImg + "]").css("background-color", "#fff");
            }

            //轮播图底下按钮
            //动态数据加载的试用应放在请求成功后执行该代码,否则按钮无法使用
            $(".c-banner .jumpBtn ul li").each(function() {
                //为每个按钮定义点击事件
                $(this).click(function() {
                    clearInterval(time);
                    $(".c-banner .jumpBtn ul li").css("background-color", "rgba(255,255,255,0.01)");
                    jumpImg = $(this).attr("jumpImg");
                    if (jumpImg != nexImg) {
                        var after = $(".c-banner .banner ul li").eq(jumpImg);
                        var befor = $(".c-banner .banner ul li").eq(nexImg);

                        //将当前图片试用绝对定位,下一张图片试用相对定位
                        $(".c-banner .banner ul img").eq(nexImg).css("position", "absolute");
                        $(".c-banner .banner ul img").eq(jumpImg).css("position", "relative");

                        after.css("display", "block");
                        after.stop().animate({
                            "opacity": 1
                        }, 1000);
                        befor.stop().animate({
                            "opacity": 0
                        }, 1000, function() {
                            befor.css("display", "none");
                        });
                        nexImg = jumpImg;
                    }
                    $(this).css("background-color", "#fff");
                    time = setInterval(intervalImg, 3000);
                });
            });
        }
    }
});