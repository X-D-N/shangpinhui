// 路由懒加载
const Home = () =>
    import ('@/pages/Home');
const Search = () =>
    import ('@/pages/Search');
const Login = () =>
    import ("@/pages/Login");
const Register = () =>
    import ("@/pages/Register");
const Detail = () =>
    import ("@/pages/Detail");
const AddCartSuccess = () =>
    import ("@/pages/AddCartSuccess");
const ShopCart = () =>
    import ("@/pages/ShopCart");
const Trade = () =>
    import ("@/pages/Trade");
const Center = () =>
    import ("@/pages/Center");
const Pay = () =>
    import ("@/pages/Pay");
const PaySuccess = () =>
    import ("@/pages/PaySuccess");
const MyOrder = () =>
    import ("@/pages/Center/myOrder");
const GroupOrder = () =>
    import ("@/pages/Center/groupOrder");

// 暴露 routes
export default [{
        path: '/home',
        component: Home,
        meta: { show: true }
    }, {
        path: '/search/:keyword?',
        name: 'search',
        component: Search,
        meta: { show: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/detail/:skuId?',
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: {
            show: true
        }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: ShopCart,
        meta: {
            show: true
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        meta: {
            show: true
        },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面 必须从购物车来
            if (from.path == '/shopcart') {
                next()
            } else {
                //从其它路由组件来 停留在当前页面
                next(false); // 中断当前导航 重置到from对应的地址
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: PaySuccess,
        meta: {
            show: true
        }
    },
    {
        path: '/center',
        name: 'center',
        component: Center,
        meta: {
            show: true
        },
        // 二级路由
        children: [{
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }

        ]

    },
    {
        // 重定向 在项目跑起来的时候， 访问/ 立马定向到首页
        path: '*',
        redirect: '/home'
    }
];