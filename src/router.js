import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
import Home from './components/home.vue'
import Welcome from './components/welcome.vue'
import Users from './components/users.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Rights from './components/rights/rights.vue'
import Roles from './components/rights/roles.vue'

Vue.use(Router)

var router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') return next()
  var token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router