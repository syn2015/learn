/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import MessageDetail from '../pages/MessageDetail.vue'

// 声明使用vue-router插件
/*
内部定义并注册了2个组件标签(router-link/router-view),
给组件对象添加了2个属性:
  1. $router: 路由器
  2. $route: 当前路由
 */
Vue.use(VueRouter)

//创建路由器的构造函数
export default new VueRouter ({
  // 注册应用中所有的路由
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/home/news', //path:'/news'这种写法不对，/代表根路由
          component: News
        },
        {
          path: 'message', //简化写法
          component: Message,
          children: [
            {
              path:'detail/:id',
              component: MessageDetail
            }
          ]
        },
        {
          path: '',       //子路由里面，配置默认显示
          redirect: '/home/news'
        }
      ]
    },
    {
      path: '/',
      redirect: '/about'
    }
  ]
})
