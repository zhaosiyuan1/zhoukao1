$(function() {
    // 请求导航数据
    $.ajax({
        url: '/api/list',
        dataType: "json",
        success: function(data) {
            var navhtml = '';
            data.data.nav.forEach(function(file) {
                navhtml += `<dl>
                                <dt>
                                    <img src="${file.img}" alt="">
                                </dt>
                                <dd>
                                    <h6>${file.title1}</h6>
                                    <span>${file.tag}</span>
                                </dd>
                            </dl>`
            });
            $('.nav').html(navhtml);
            var listhtml = '';
            data.data.sublist.forEach(function(val) {
                listhtml += ` <li>
                                <img src="${val.img}" alt="">
                                <span>${val.title}</span>
                            </li>`
            });
            $('.sublist ul').html(listhtml);
        },
        error: function(err) {
            console.warn(err);
        }
    });
    // 点击底部进行样式的切换
    $('.footer ul').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
})