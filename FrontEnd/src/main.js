// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import {
    Button,
    Dialog,
    Tag,
    Card,
    Icon,
    Message,
    Input,
    MessageBox,
    Upload,
} from 'element-ui';
import XHR from '@/assets/js/xhr';
import 'highlight.js/styles/googlecode.css';
import App from './App';
import router from './router';

const hljs = require('./highlight.js');

Vue.config.productionTip = false;
Vue.use(XHR);
Vue.use(hljs);
Vue.component(Button.name, Button);
Vue.component(Dialog.name, Dialog);
Vue.component(Tag.name, Tag);
Vue.component(Card.name, Card);
Vue.component(Icon.name, Icon);
Vue.component(Input.name, Input);
Vue.component(Upload.name, Upload);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App,
    },
});