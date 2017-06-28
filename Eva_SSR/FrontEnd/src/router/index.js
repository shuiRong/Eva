import Vue from 'vue';
import Router from 'vue-router';
import LoginCom from '@/components/backend/LoginCom';

// 路由懒加载
const BlogCom = resolve => require(['@/components/frontend/BlogCom'], resolve);
const NewBlogCom = resolve => require(['@/components/backend/NewBlogCom'], resolve);
const AuthCom = resolve => require(['@/components/backend/AuthCom'], resolve);
let HomeCom = ''
const MobileBlogCom = resolve => require(['@/components/frontend/MobileBlogCom'], resolve);


const routes = [{
    path: '/new/:id',
    name: 'NewBlogRoute',
    component: NewBlogCom,
}, {
    path: '/auth',
    name: 'AuthRoute',
    component: AuthCom,
}]

// dev环境时需要加上home路由（方便debug），prod环境不需要．
if (process.env.NODE_ENV == 'development') {
    HomeCom = resolve => require(['@/components/frontend/HomeCom'], resolve);
    routes.unshift({
        path: '/',
        name: 'HomeRoute',
        component: HomeCom,
    })
}

//　如果终端是手机的话，路由到博客对应手机组件.否则路由到正常PC端组件
if (device.mobile()) {
    routes.unshift({
        path: '/blog/:id',
        name: 'MobileBlogRoute',
        component: MobileBlogCom,
    })
} else {
    routes.unshift({
        path: '/blog/:id',
        name: 'BlogRoute',
        component: BlogCom,
    })
}

Vue.use(Router);

export default new Router({
    routes: 　routes,
});