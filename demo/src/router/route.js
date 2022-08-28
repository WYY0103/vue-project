import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Search from '@/pages/Search';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

export default [
    {
        path: "/home",
        component: Home,
        meta: { show: true }
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    },
    {
        // search要接收参数  路由进行占位
        path: "/search/:keyword?",
        component: Search,
        meta: { show: true },
        name: "search",
    },
    {
        path: "/register",
        component: Register,
        meta: { show: false }
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: { show: true },
    },
    {
        path: '/addcartsuccess',
        name:'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    }

]