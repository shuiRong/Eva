(function() {
    document.getElementsByClassName('bg')[0].style.height = `${document.documentElement.clientHeight}px`;

    window.onload = function() {
        window.onresize = function temp() {
            document.getElementsByClassName('bg')[0].style.height = `${document.documentElement.clientHeight}px`;
        };
    }

    // more 的hover样式
    document.getElementsByClassName('more')[0].addEventListener('mouseover', function() {
        document.getElementsByClassName('more')[0].style.background = 'white'

        let arr = document.getElementsByClassName('dot')
        for (let i in arr) {
            arr[i].style.background = '#8492A6'
        }
    }, false)

    // more 的hover样式
    document.getElementsByClassName('more')[0].addEventListener('mouseleave', function() {
        document.getElementsByClassName('more')[0].style.background = 'transparent'

        let arr = document.getElementsByClassName('dot')
        for (let i in arr) {
            arr[i].style.background = 'white'
        }
    }, false)

    document.getElementsByClassName('more')[0].addEventListener('click', function() {
        document.getElementsByClassName('dialog')[0].style.display = 'block'
        document.getElementsByClassName('cover')[0].style.display = 'block'
    }, false)

    document.getElementsByClassName('cancel')[0].addEventListener('click', function() {
        document.getElementsByClassName('dialog')[0].style.display = 'none'
        document.getElementsByClassName('cover')[0].style.display = 'none'
    }, false)

    document.getElementsByClassName('cover')[0].addEventListener('click', function() {
        document.getElementsByClassName('dialog')[0].style.display = 'none'
        document.getElementsByClassName('cover')[0].style.display = 'none'
    }, false)
})()