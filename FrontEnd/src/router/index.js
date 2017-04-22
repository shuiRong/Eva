import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import LoginCom from '@/components/backend/LoginCom';
import BackEndBlogCom from '@/components/backend/BlogCom';
import NewBlogCom from '@/components/backend/NewBlogCom';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'RootRoute',
        component: App,
    }, {
        path: '/login',
        name: 'LoginRoute',
        component: LoginCom,
    }, {
        path: '/backend/blog/:id',
        name: 'BackEndBlogRoute',
        component: BackEndBlogCom,
    }, {
        path: '/new',
        name: 'NewBlogRoute',
        component: NewBlogCom,
    }],
});