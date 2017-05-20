import Vue from 'vue';
import Router from 'vue-router';
import LoginCom from '@/components/backend/LoginCom';
// import AuthCom from '@/components/backend/AuthCom';
// 路由懒加载
const BlogCom = resolve => require(['@/components/frontend/BlogCom'], resolve);
const HomeCom = resolve => require(['@/components/frontend/HomeCom'], resolve);
const NewBlogCom = resolve => require(['@/components/backend/NewBlogCom'], resolve);
const AuthCom = resolve => require(['@/components/backend/AuthCom'], resolve);


Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'HomeRoute',
        component: HomeCom,
    }, {
        path: '/login',
        name: 'LoginRoute',
        component: LoginCom,
    }, {
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
    }],
});