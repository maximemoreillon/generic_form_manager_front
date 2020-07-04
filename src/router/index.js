import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'form_list',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormList.vue')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import(/* webpackChunkName: "about" */ '../views/Form.vue')
  },
  {
    path: '/form_dashboard',
    name: 'form_dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormDashboard.vue')
  },
  {
    path: '/form_builder',
    name: 'form_builder',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormBuilder.vue')
  },
  {
    path: '/success',
    name: 'success',
    component: () => import(/* webpackChunkName: "about" */ '../views/Success.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
