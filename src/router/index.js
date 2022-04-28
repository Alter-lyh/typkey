import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import("@/components/index"),
      children:[
        {
          path: '',
          name: 'practice',
          component: () => import ('@/components/practice'),
        },
        {
          path: 'addchapter',
          name: 'addchapter',
          component: () => import ('@/components/addchapter'),
        },
        {
          path: 'addchapter/:id',
          name: 'addchapter',
          component: () => import ('@/components/addchapter'),
        },{
          path: 'wordchaptelist',
          name: 'wordchaptelist',
          component: () => import ('@/components/wordchaptelist'),
        },{
          path: 'importWord',
          name: 'importWord',
          component: () => import ('@/components/wordchaptelist/importWord'),
        },
        {
          path: 'sign',
          name: '登录/注册',
          component: () => import ('@/components/user/sign'),
        }
      ]
    }
  ]
})
