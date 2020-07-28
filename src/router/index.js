import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'forms',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormList.vue')
  },
  {
    path: '/forms/:form_id',
    name: 'form',
    component: () => import(/* webpackChunkName: "about" */ '../views/Form.vue')
  },
  {
    path: '/forms/:form_id/dashboard',
    name: 'form_dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormDashboard.vue')
  },
  {
    path: '/forms/:form_id/builder',
    name: 'form_builder',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormBuilder.vue')
  },
  {
    path: '/success',
    name: 'success',
    component: () => import(/* webpackChunkName: "about" */ '../views/Success.vue')
  },
  {
    path: '/create_form',
    name: 'create_form',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
