import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect:'/login'
  },{
    path:'/login',
    component:Login
  },
    {
        path: '/home',
        name: 'home',
        redirect: '/home/index',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        children: [
            {
                path: '/home/index',
                name: 'index',
                component: () => import('../views/list/index.vue'),
            },
            {
                path: '/home/exam',
                name: 'exam',
                component: () => import('../views/list/exam.vue'),
            },
            {
                path: '/home/myGrade',
                name: 'myGrade',
                component: () => import('../views/list/myGrade.vue'),
            },
            {
                path: '/home/question',
                name: 'question',
                component: () => import('../views/list/question.vue'),
            },
            {
                path: '/home/test_paper',
                name: 'test_paper',
                component: () => import('../views/list/test_paper.vue'),
            },
        ]
    },
    {
    path: '/exam/:id',
    component: () => import(/* webpackChunkName: "fail" */ '../views/list/examModules/ExamDetail')
     },
    {
        path: '/account',
        name: 'account',
        //redirect: '/account/setting',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '/account/setting',
                name: 'setting',
                redirect: '/account/setting/base_setting',
                component: () => import('../views/user/setting.vue'),
                children:[
                    {
                        path: '/account/setting/base_setting',
                        name: 'base_setting',
                        component: () => import('../views/user/baseSetting.vue'),
                    },
                    {
                        path: '/account/setting/personalize',
                        name: 'personalize',
                        component: () => import('../views/user/personalize.vue'),
                    }
                ]
            }

        ]
    },

  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
