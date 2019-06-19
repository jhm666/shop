import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
import Home from './components/home.vue'
Vue.use(Router)

var router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path:'/home', component: Home }
  ]
})

router.beforeEach((to, from, next) => {
  if( to.path === '/login') return next()
  var token = window.sessionStorage.getItem('token')
  if(!token) return next('/login')
  next() 
})

export default router