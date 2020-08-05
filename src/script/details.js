;
! function() {
    //1.获取地址栏sid
    let sid = location.search.substring(1).split('=')[1]; //获取地址栏sid
    //2.将sid传给后端。
    //3.获取后端返回的对应的数据进行渲染。
    $.ajax({
        type: 'get',
        url: 'http://localhost:8088/JS2004/Day%2027_cart/php/getsid.php',
        data: {
            sid: sid
        },
        dataType: 'json' //设置返回的数据类型是json
    }).done(function(data) { //异步
        $('#spic img').attr('src', data.url);
        $('.loadtitle').html(data.title);
        $('.loadpcp').html(data.price);
        $('#bpic').attr('src', data.url);
        let listurl = data.piclisturl;
        let picarr = listurl.split(','); //转换成数组
        console.log(picarr);
        let strhtml = '';
        $.each(picarr, function(index, value) {
            strhtml += `<li><img src="${value}"></li>`;
        });
        $('#list ul').html(strhtml);
        checklen(); //如果这里能够获取长度，这里调用函数。
    });



    //3.购物车操作 - cookie
    //3.1.cookie里面存储商品的sid和商品的数量
    //3.2.利用两个数组分别存储sid和数量。先将sid和数量放入数组，然后存储cookie

    let arrsid = []; //存储商品的sid
    let arrnum = []; //商品的数量

    //3.3.如何确定商品的提交次数，第一次添加商品，创建购物车列表，从第二次开始只需要商品的数量进行累加。
    //商品如果是从第二次开始添加，cookie中应该存在商品的编号sid。利用存在的cookie进行判断，必须先获取cookie。
    //一开始约定好cookie里面存储sid和数量的key值。
    //cookiesid   cookienum key值分别表示存储cookie的编号和数量。

    //3.4提前获取cookie值，将其转换成数组。
    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }


    $('.p-btn a').on('click', function() {
        cookietoarray(); //每次点击，重新获取cookie,转换成数组
        //先判断当前的商品是第一次存储，还是第二次或者多次存在。
        if ($.inArray(sid, arrsid) === -1) {
            arrsid.push(sid); //将当前商品的sid添加到数组中
            arrnum.push($('#count').val()); //将当前商品的数量添加到数组中
            //存储cookie
            $.cookie('cookiesid', arrsid, {
                expires: 7,
                path: '/'
            });
            $.cookie('cookienum', arrnum, {
                expires: 7,
                path: '/'
            });
        } else {
            //第二次或者多次无需创建商品列表，商品的编号不会发生变化。
            //对应的商品的数量进行累加。
            //随时获取当前商品的sid，通过sid的位置获取数量。
            arrnum[$.inArray(sid, arrsid)] = parseInt(arrnum[$.inArray(sid, arrsid)]) + parseInt($('#count').val()); //获取sid对应的数量+新加的值，再赋值给对应的位置

            //重新添加cookie
            $.cookie('cookienum', arrnum, {
                expires: 7,
                path: '/'
            });
        }
        alert('按钮被触发了');
    });

    function checklen() {
        if ($('#list ul li').length < 6) {
            $('#right').css('color', '#fff');
        }
    }

    class Scale {
        constructor() {
            this.wrap = $('.wrap');
            this.spic = $('#spic');
            this.bpic = $('#bpic');
            this.sf = $('#sf');
            this.bf = $('#bf');
            this.picul = $('#list ul');
            this.picli = $('#list ul li');
            this.leftarrow = $('#left');
            this.rightarrow = $('#right');
            this.len = 0;
        }
        init() {

                this.spic.hover(() => {
                    $('#sf,#bf').css('visibility', 'visible');
                    //1.设置sf的尺寸
                    this.sf.width(this.spic.width() * this.bf.width() / this.bpic.width());
                    this.sf.height(this.spic.height() * this.bf.height() / this.bpic.height());
                    //2.比例
                    this.bili = this.bpic.width() / this.spic.width();
                    //3.鼠标移动
                    this.spic.on('mousemove', (ev) => {
                        let $left = ev.pageX - this.wrap.offset().left - this.sf.width() / 2;
                        let $top = ev.pageY - this.wrap.offset().top - this.sf.height() / 2;

                        if ($left <= 0) {
                            $left = 0;
                        } else if ($left >= this.spic.width() - this.sf.width()) {
                            $left = this.spic.width() - this.sf.width();
                        }
                        if ($top <= 0) {
                            $top = 0;
                        } else if ($top >= this.spic.height() - this.sf.height()) {
                            $top = this.spic.height() - this.sf.height();
                        }
                        this.sf.css({
                            left: $left,
                            top: $top
                        });

                        this.bpic.css({
                            left: -this.bili * $left,
                            top: -this.bili * $top
                        });
                    });
                }, () => {
                    $('#sf,#bf').css('visibility', 'hidden');
                });

                this.picchange();
                this.arrowmove();
            }
            //4.点击小图，图片切换 - 事件委托
        picchange() {
            let _this = this;
            this.picul.on('click', 'li', function() { //li是被委托的元素，触发事件的选择器元素的后代
                //$(this):当前委托的元素
                let $url = $(this).find('img').attr('src'); //存储当前li里面图片的路径
                _this.spic.find('img').attr('src', $url);
                _this.bpic.attr('src', $url);
            });
        }

        //左右箭头控制小图运动
        arrowmove() {
            let $num = 6;
            this.rightarrow.on('click', () => {
                let $len = $('#list ul li').length; //10
                let $liwidth = $('#list ul li').eq(0).outerWidth(true);
                if ($len > $num) {
                    $num++;
                    this.leftarrow.css('color', '#333');
                    if ($num === $len) {
                        this.rightarrow.css('color', '#fff');
                    }
                    this.picul.animate({ //每次一张
                        left: -$liwidth * ($num - 6)
                    });
                }
            });


            this.leftarrow.on('click', () => {
                let $len = $('#list ul li').length; //10
                let $liwidth = $('#list ul li').eq(0).outerWidth(true); //
                if ($num > 6) {
                    $num--;
                    this.rightarrow.css('color', '#333');
                    if ($num === 6) {
                        this.leftarrow.css('color', '#fff');
                    }
                    this.picul.animate({ //每次一张
                        left: -$liwidth * ($num - 6)
                    });
                }
            });
        }
    }

    new Scale().init();

}();