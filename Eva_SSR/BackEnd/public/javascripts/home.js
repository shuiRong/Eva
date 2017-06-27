(function() {
    var $ = function(arr) {
        return document.getElementsByClassName(arr)[0]
    }


    $('bg').style.height = `${document.documentElement.clientHeight}px`;

    window.onload = function() {
        window.onresize = function temp() {
            $('bg').style.height = `${document.documentElement.clientHeight}px`;
        };
    }

    // more 的hover样式
    $('more').addEventListener('mouseover', function() {
        $('more').style.background = 'white'

        let arr = document.getElementsByClassName('dot')
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.background = '#8492A6'
        }
    }, false)

    // more 的hover样式
    $('more').addEventListener('mouseleave', function() {
        $('more').style.background = 'transparent'

        let arr = document.getElementsByClassName('dot')
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.background = 'white'
        }
    }, false)

    $('more').addEventListener('click', function() {
        $('dialog').style.display = 'block'
        $('cover').style.display = 'block'
    }, false)

    $('cancel').addEventListener('click', function() {
        $('dialog').style.display = 'none'
        $('cover').style.display = 'none'
    }, false)

    $('cover').addEventListener('click', function() {
        $('dialog').style.display = 'none'
        $('cover').style.display = 'none'
    }, false)

    // －－－－－－－－－－－－移动端函数－－－－－－－－－－－

    // 隐藏链接页，通过点击空白处
    $('phone-dialog').addEventListener('click', function(e) {
        if (e.target.className === 'phone-dialog') {
            $('phone-dialog').style.display = 'none'
        }
    }, false)

    $('phone-header-icon').addEventListener('click', function() {
        $('phone-dialog').style.display = 'flex'
    }, false)
})()