import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Search from '@/pages/Search';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/myOrder';
import TeamOrder from '@/pages/Center/teamOrder';

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
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        //二级路由配置的地方
        children: [
            //我的订单
            {
                path: 'myorder',
                component: MyOrder
            }
            ,
            {
                path: 'teamorder',
                component: TeamOrder
            }
            ,
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
]