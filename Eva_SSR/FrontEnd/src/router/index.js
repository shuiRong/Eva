import Vue from 'vue';
import Router from 'vue-router';
import LoginCom from '@/components/backend/LoginCom';
// import AuthCom from '@/components/backend/AuthCom';
// 路由懒加载
const BlogCom = resolve => require(['@/components/frontend/BlogCom'], resolve);
const NewBlogCom = resolve => require(['@/components/backend/NewBlogCom'], resolve);
const AuthCom = resolve => require(['@/components/backend/AuthCom'], resolve);
let HomeCom = ''

const routes = [{
    path: '/blog/:id',
    name: 'BlogRoute',
    component: BlogCom,
}, {
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

Vue.use(Router);

export default new Router({
    routes: 　routes,
});