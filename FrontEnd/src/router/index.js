import Vue from 'vue';
import Router from 'vue-router';
// import App from '@/App';
import LoginCom from '@/components/backend/LoginCom';
import BlogCom from '@/components/frontend/BlogCom';
import NewBlogCom from '@/components/backend/NewBlogCom';
import HomeCom from '@/components/frontend/HomeCom';

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
    }],
});