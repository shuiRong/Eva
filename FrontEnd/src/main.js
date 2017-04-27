// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueSource from 'vue-resource';
import ElementUI from 'element-ui';
import 'highlight.js/styles/googlecode.css';
import App from './App';
import router from './router';

const hljs = require('./highlight.js');

Vue.config.productionTip = false;
Vue.use(VueSource);
Vue.use(ElementUI);
Vue.use(hljs);

// 通过Vue的自定义指令来使用highlight.js;
// uses highlight.js by using custom directives(Vue's)
// Vue.directive('highlightjs', (el) => {
//     const blocks = el.querySelectorAll('pre code');
//     blocks.forEach((block) => {
//         hljs.highlightBlock(block);
//     });
// });


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App,
    },
});