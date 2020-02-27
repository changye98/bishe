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
    component:Login,
    meta:{
      title:"登录页面"
    }
  },
  {
    path: '/register',
    component: () => import('../views/user/Register'),
    meta:{
      title:"注册页面"
    }
  },
    {
        path: '/home',
        name: 'home',
        redirect: '/home/index',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '/home/index',
                name: 'index',
                component: () => import('../views/list/index.vue'),
                meta:{
                  title:"首页"
                }
            },
            {
                path: '/home/exam',
                name: 'exam',
                component: () => import('../views/list/exam.vue'),
                meta:{
                  title:"考试页面"
                }
            },
            {
                path: '/home/myGrade',
                name: 'myGrade',
                component: () => import('../views/list/myGrade.vue'),
                meta:{
                  title:"试卷查询"
                }
            },
            {
                path: '/home/question',
                name: 'question',
                component: () => import('../views/list/question.vue'),
                meta:{
                  title:"问题管理"
                }
            },
            {
                path: '/home/test_paper',
                name: 'test_paper',
                component: () => import('../views/list/test_paper.vue'),
                meta:{
                  title:"试卷管理"
                }
            },
        ]
    },
    {
    path: '/exam/:id',
    component: () => import('../views/list/examModules/ExamDetail'),
    meta:{
        title:"考试详情页面"
      }
     },
    {
      path: '/exam/record/:exam_id/:record_id',
      component: () => import(/* webpackChunkName: "fail" */ '../views/list/examModules/ExamRecordDetail'),
      meta:{
        title:"考试成绩详情页面"
      }
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
